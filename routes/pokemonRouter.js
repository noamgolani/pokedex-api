const Pokedex = require("pokedex-promise-v2");
const express = require("express");
const router = express.Router();
const p = new Pokedex();

router.get("/get/:id", async (req, res) => {
  const { id } = req.params;

  const pokemonData = parsePokemon(await p.getPokemonByName(id));

  res.send(pokemonData);
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
