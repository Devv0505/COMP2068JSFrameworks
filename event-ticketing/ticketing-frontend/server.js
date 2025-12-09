const express = require("express");
const path = require("path");

const app = express();
const distFolder = path.join(__dirname, "dist/ticketing-frontend/browser");

app.use(express.static(distFolder));

app.get("*", (req, res) => {
  res.sendFile(path.join(distFolder, "index.html"));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("Frontend running on port", PORT);
});
