import { createServer } from "node:http";

const server = createServer(function (req, res) {
  if (req.url === "/health") {
    res.writeHead(200);
    res.end("ok");
  }
});

server.listen(9002, () => {
  console.log(`Product API is running on http://localhost:9002`);
});
