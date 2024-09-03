const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");

const youtubeData = require("./data/youtubeData");

dotenv.config();

const PORT = process.env.PORT || 9000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(helmet());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("CODECIAN SERVER API");
});

app.set("json spaces", 2);

app.get("/api/youtube-video-data", (req, res) => {
  try {
    res.json(youtubeData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
