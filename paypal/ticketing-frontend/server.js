const express = require("express");
const path = require("path");
const app = express();

const distPath = path.join(__dirname, "dist/ticketing-frontend/browser");

// Serve static files
app.use(express.static(distPath));

// Angular SPA fallback (Express 5 compatible)
app.get("/*", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

// Start server
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Frontend running on port ${port}`));
