import React, { useState, useRef, useEffect } from "react";
import Editor from "@monaco-editor/react";
import CodeChecker from "../js/codeChecker";

export default function CodeEditor() {
  const htmlEditorRef = useRef(null);
  const cssEditorRef = useRef(null);
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [preview, setPreview] = useState("");
  const [codeChecker, setCodeChecker] = useState(null);
  const [isEvaluating, setIsEvaluating] = useState(false);

  useEffect(() => {
    async function initializeCodeChecker() {
      try {
        const checker = new CodeChecker();
        await new Promise((resolve) => {
          const checkInitialization = setInterval(() => {
            if (checker.model) {
              clearInterval(checkInitialization);
              resolve();
            }
          }, 100);
        });
        setCodeChecker(checker);
        console.log("CodeChecker initialized");
      } catch (error) {
        console.error("Failed to initialize CodeChecker:", error);
      }
    }

    initializeCodeChecker();
  }, []);

  const handleHtmlChange = (newValue) => {
    setHtml(newValue);
    updatePreview();
  };

  const handleCssChange = (newValue) => {
    setCss(newValue);
    updatePreview();
  };

  const updatePreview = () => {
    const previewHtml = `
      <html>
        <head>
          <style>${css}</style>
        </head>
        <body>${html}</body>
      </html>
    `;
    setPreview(previewHtml);
  };

  const evaluateCode = async (code) => {
    if (!codeChecker) {
      console.error("CodeChecker not initialized yet");
      return null;
    }
    try {
      const evaluatedScore = await codeChecker.evaluate(code);
      const clampedScore = Math.min(
        Math.max(evaluatedScore, codeChecker.minScore),
        codeChecker.maxScore
      );
      return clampedScore;
    } catch (error) {
      console.error("Error evaluating code:", error);
      return null;
    }
  };

  const handleRunCode = async () => {
    if (isEvaluating) return;
    setIsEvaluating(true);
    const code = html + css;
    try {
      const score = await evaluateCode(code); // Call evaluateCode here
      if (score !== null) {
        alert(`Your code score is: ${parseInt(score * 100) / 100}`);
      } else {
        alert("Unable to evaluate code at this time. Please try again later.");
      }
    } catch (error) {
      console.error("Error running code:", error);
      alert("An error occurred while evaluating your code. Please try again.");
    } finally {
      setIsEvaluating(false);
    }
  };
  return (
    <div className="w-full h-screen grid place-items-center bg-zinc-900">
      <div className="w-full max-w-screen-xl mx-auto p-3 bg-zinc-800 border border-zinc-700  h-[95vh] grid grid-cols-2 gap-2">
        <div className="h-full">
          <Editor
            height="50%"
            width="100%"
            defaultLanguage="html"
            value={html}
            theme="vs-dark"
            options={{
              wordWrap: "on",
              minimap: { enabled: false },
              showUnused: false,
              folding: false,
              lineNumbersMinChars: 3,
              fontSize: 15,
              scrollBeyondLastLine: false,
              fontFamily: "'JetBrains Mono', monospace",
              automaticLayout: true,
            }}
            onChange={handleHtmlChange}
            onMount={(editor, monaco) => {
              htmlEditorRef.current = editor;
            }}
          />
          <Editor
            height="50%"
            width="100%"
            defaultLanguage="css"
            value={css}
            theme="vs-dark"
            options={{
              wordWrap: "on",
              minimap: { enabled: false },
              showUnused: false,
              folding: false,
              lineNumbersMinChars: 3,
              fontSize: 15,
              scrollBeyondLastLine: false,
              fontFamily: "'JetBrains Mono', monospace",
              automaticLayout: true,
            }}
            onChange={handleCssChange}
            onMount={(editor, monaco) => {
              cssEditorRef.current = editor;
            }}
          />
        </div>
        <div className="relative h-full bg-white  p-2 overflow-hidden">
          <iframe
            srcDoc={preview}
            frameBorder="0"
            width="100%"
            height="100%"
            title="Preview"
          />
          <button
            onClick={handleRunCode}
            className="absolute top-2 right-2 bg-emerald-500 text-white text-xs font-bold py-3 px-4"
            disabled={!codeChecker || isEvaluating}
          >
            {!codeChecker
              ? "Initializing..."
              : isEvaluating
              ? "Evaluating..."
              : "View Score"}
          </button>
        </div>
      </div>
    </div>
  );
}
