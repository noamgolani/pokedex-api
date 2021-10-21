const pokemonRouter = require("./routes/pokemonRouter");
const userRouter = require("./routes/userRouter");
const { userHandler } = require("./middleware/userHandler");
const { errorHandler } = require("./middleware/errorHandler");
const express = require("express");
const app = express();

const port = 3000;

app.use(express.json());

app.use("/pokemon", userHandler, pokemonRouter);
app.use("/user", userRouter);
app.use(errorHandler);

app.listen(port, function () {
  console.log(`Listening on: http://localhost:${port}`);
});
