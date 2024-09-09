import * as tf from "@tensorflow/tfjs";

const trainingData = [
  {
    instruction: "make an alert button that when clicked shows Hello",
    code: "<button onclick='alert(\"Hello\")'>Click me</button>",
    score: 5,
  },
  {
    instruction: "create a div with blue background",
    code: "<div style='background-color: blue;'>Blue box</div>",
    score: 4,
  },
  // Add more instruction-code pairs with scores
];

class CodeChecker {
  constructor() {
    this.model = null;
    this.tokenizer = this.createTokenizer();
    this.initializeModel();
    this.train();
  }

  createTokenizer() {
    const tokens = new Set();
    trainingData.forEach((item) => {
      [item.instruction, item.code].forEach((text) => {
        text
          .toLowerCase()
          .split(/(<|>|\/|\s+)/)
          .forEach((token) => {
            if (token.trim() !== "") tokens.add(token);
          });
      });
    });
    return Object.fromEntries(
      [...tokens].map((token, index) => [token, index + 1])
    );
  }

  preprocess(text) {
    const tokens = text
      .toLowerCase()
      .split(/(<|>|\/|\s+)/)
      .filter((token) => token.trim() !== "");
    const result = new Array(100).fill(0);
    for (let i = 0; i < Math.min(tokens.length, 100); i++) {
      result[i] = this.tokenizer[tokens[i]] || 0;
    }
    return result;
  }

  async initializeModel() {
    await tf.ready();

    this.model = tf.sequential();
    this.model.add(
      tf.layers.embedding({
        inputDim: Object.keys(this.tokenizer).length + 1,
        outputDim: 32,
        inputLength: 100,
      })
    );
    this.model.add(tf.layers.globalAveragePooling1d());
    this.model.add(tf.layers.dense({ units: 16, activation: "relu" }));
    this.model.add(tf.layers.dense({ units: 1 }));

    this.model.compile({
      optimizer: "adam",
      loss: "meanSquaredError",
    });

    console.log("Model initialized successfully");
  }

  async train() {
    if (!this.model) {
      console.error(
        "Model not initialized. Please wait for initialization to complete."
      );
      return;
    }

    const inputData = trainingData.map(({ instruction, code }) => [
      ...this.preprocess(instruction),
      ...this.preprocess(code),
    ]);
    const outputData = trainingData.map(({ score }) => score);

    const inputTensor = tf.tensor2d(inputData, [inputData.length, 200]); // Adjust input shape if necessary
    const outputTensor = tf.tensor2d(outputData, [outputData.length, 1]);

    await this.model.fit(inputTensor, outputTensor, {
      epochs: 100,
      callbacks: {
        onEpochEnd: (epoch, logs) => {
          console.log(`Epoch ${epoch}: loss = ${logs.loss}`);
        },
      },
    });

    console.log("Training completed");
  }

  async evaluate(instruction, code) {
    if (!this.model) {
      console.error(
        "Model not initialized. Please wait for initialization to complete."
      );
      return null;
    }

    const processedInput = [
      ...this.preprocess(instruction),
      ...this.preprocess(code),
    ];
    const inputTensor = tf.tensor2d([processedInput], [1, 200]); // Adjust input shape if necessary
    const output = this.model.predict(inputTensor);
    const predictedScore = output.dataSync()[0];

    // Ensure scores are within a valid range
    return Math.max(1, predictedScore);
  }
}

export default CodeChecker;
