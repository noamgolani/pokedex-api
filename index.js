const pokemonRouter = require("./routes/pokemonRouter");
const express = require("express");
const app = express();

const port = 3000;

app.use("/pokemon", pokemonRouter);

app.listen(port, function () {
  console.log(`Listening on: http://localhost:${port}`);
});
