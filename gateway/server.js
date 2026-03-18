const express = require("express");
const app = express();

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Default route
app.get("/", (req, res) => {
  res.send("Gateway is running 🚀");
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
