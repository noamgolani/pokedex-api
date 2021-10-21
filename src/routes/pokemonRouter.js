const Pokedex = require("pokedex-promise-v2");
const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();
const p = new Pokedex();

router.get("/get/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    if (!+id || +id <= 0)
      throw { status: 400, message: "id must be of type number" };
    const pokemonData = parsePokemon(await p.getPokemonByName(id));
    res.send(pokemonData);
  } catch (err) {
    if (err.isAxiosError) next({ status: 404, message: "Pokemon not found" });
    else next(err);
  }
});

router.get("/query", async (req, res) => {
  const { query } = req.body;
  // TODO add check and error handling

  const pokemonData = parsePokemon(await p.getPokemonByName(query));

  res.send(pokemonData);
});

router.put("/catch/:id", (req, res) => {
  const { id } = req.params;
  const pokemon = req.body;

  if (Object.entries(pokemon).length === 0)
    throw { status: 400, message: "Must provide pokemon data (JSON)" };

  const { username } = req;

  const filePath = path.resolve(path.join("./users", username, `${id}.json`));
  if (fs.existsSync(filePath))
    throw { status: 403, message: "Already caught that pokemon" };

  fs.writeFileSync(filePath, JSON.stringify(pokemon));
  res.send("Success");
});

router.delete("/release/:id", (req, res) => {
  const { id } = req.params;
  const { username } = req;

  const filePath = path.resolve(path.join("./users", username, `${id}.json`));
  if (!fs.existsSync(filePath))
    throw {
      status: 403,
      message: "You cant release a pokemon you dont have...",
    };

  fs.rmSync(filePath);
  res.send("Success");
});

router.get("/", (req, res) => {
  const { username } = req;

  const userPath = path.resolve(path.join("./users", username));

  const pokemonsDir = fs.readdirSync(userPath);

  const pokemons = pokemonsDir.map((filename) => filename.replace(".json", ""));

  res.send(pokemons);
});

module.exports = router;

function parsePokemon(poke) {
  return {
    name: poke.name,
    height: poke.height,
    weight: poke.weight,
    types: poke.types.map(({ type }) => type),
    front_pic: poke.sprites.front_pic,
    back_pic: poke.sprites.back_pic,
    abilities: poke.abilities.map(({ ability }) => ability),
  };
}