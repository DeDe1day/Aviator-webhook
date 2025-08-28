// index.js
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

// Store logs in memory (resets if you restart Replit)
let logs = [];

// Middleware
app.use(bodyParser.json());

// Webhook endpoint (POST)
app.post("/webhook", (req, res) => {
  const data = req.body;
  console.log("📩 New Prediction Received:", data);

  // Save to logs
  logs.push({
    time: new Date().toISOString(),
    data: data
  });

  res.json({ status: "ok", received: true });
});

// Logs endpoint (GET)
app.get("/logs", (req, res) => {
  res.json(logs);
});

// Default route
app.get("/", (req, res) => {
  res.send("✅ Aviator Webhook API is running. POST to /webhook, view at /logs.");
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Webhook server running at http://localhost:${PORT}`);
});
