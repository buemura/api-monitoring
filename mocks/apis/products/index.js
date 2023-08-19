const express = require("express");

const app = express();

app.get("/health", (_request, response) => {
  response.send("ok");
});

app.listen(9002, () => console.log("Products API running..."));
