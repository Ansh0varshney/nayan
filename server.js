const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3001;

http.createServer((req, res) => {
  let filePath = "";
  if (req.url === "/" || req.url === "/index.html") {
    filePath = path.join(__dirname, "rishta_landing.html");
  } else {
    // Serve static files (images, css, js, etc.)
    filePath = path.join(__dirname, req.url);
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end("Not Found");
    } else {
      // Set content type based on file extension
      let ext = path.extname(filePath).toLowerCase();
      let contentType = "text/html";
      if (ext === ".png") contentType = "image/png";
      else if (ext === ".jpg" || ext === ".jpeg") contentType = "image/jpeg";
      else if (ext === ".css") contentType = "text/css";
      else if (ext === ".js") contentType = "application/javascript";
      else if (ext === ".gif") contentType = "image/gif";
      res.writeHead(200, { "Content-Type": contentType });
      res.end(data);
    }
  });
}).listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
