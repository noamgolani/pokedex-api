const pokemonRouter = require("./routes/pokemonRouter");
const userRouter = require("./routes/userRouter");
const { userHandler } = require("./middleware/userHandler");
const { errorHandler } = require("./middleware/errorHandler");
const path = require("path");
const fs = require("fs");

const cors = require("cors");
const express = require("express");
const app = express();

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/pokemon", userHandler, pokemonRouter);
app.use("/user", userRouter);
app.get("/", function (req, res) {
  console.log(fs.readdirSync(path.resolve("./front")));
  res.sendFile(path.resolve("./front/dist/index.html"));
});
app.use("/", express.static(path.resolve("./front/dist")));

app.use(errorHandler);

app.listen(port, function () {
  console.log(`Listening on: http://localhost:${port}`);
});
