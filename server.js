const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = 4000;
const pokeRoutes = express.Router();

const axios = require("axios");

// GET Route for 10 random pokemon
pokeRoutes.route("/").get(async (req, res, next) => {
  console.log("poke call");
  console.log();
  try {
    const p = await getPokes(10);
    console.log(p);
    res.json(p);
  } catch (e) {
    next(e);
  }
});

// Async function to get [amount] number of random pokemon
const getPokes = async (amount) => {
  var pokeArray = [];
  for (let index = 0; index < amount; index++) {
    const val = await axios.get(
      "https://pokeapi.co/api/v2/pokemon/" + Math.floor(Math.random() * 899)
    );
    pokeArray.push(val.data);
  }
  return pokeArray;
};

app.use(cors());
app.use(bodyParser.json());

app.use("/poke", pokeRoutes);

app.listen(PORT, function () {
  console.log("Server is running on Port: " + PORT);
});
