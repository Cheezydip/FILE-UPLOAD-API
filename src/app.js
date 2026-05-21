const express = require("express");
const cors = require("cors");
const filesRouter = require("./routes/files");
const { notFoundHandler, errorHandler } = require("./middleware/errorHandler");

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(",") : true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/files", filesRouter);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
