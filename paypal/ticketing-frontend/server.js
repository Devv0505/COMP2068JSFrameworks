const express = require("express");
const path = require("path");

const app = express();

// Correct Angular 17 build output path
const distPath = path.join(__dirname, "dist/ticketing-frontend/browser");

// Serve static files
app.use(express.static(distPath));

// SPA fallback (working for Express 5)
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

// Start server
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Frontend running on port ${port}`));
