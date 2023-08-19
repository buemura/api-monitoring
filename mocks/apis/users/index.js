const express = require("express");

const app = express();

app.get("/health", (_request, response) => {
  response.send("ok");
});

app.listen(9001, () => console.log("User API running..."));
