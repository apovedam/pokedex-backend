const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = 4000;
const pokeRoutes = express.Router();

const axios = require("axios");

// Function to get [amount] number of random pokemon
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

// Async function to get [amount] pokemon at once using Promise.all
const getPokesAsync = async (amount) => {
  try {
    const promises = [];
    for (let index = 0; index < amount; index++) {
      const currPromise = axios.get(
        "https://pokeapi.co/api/v2/pokemon/" + Math.floor(Math.random() * 899)
      );
      promises.push(currPromise);
    }

    const res = await Promise.all(promises);
    const data = res.map((res) => res.data);
    return data;
  } catch {
    throw Error("Promise failed");
  }
};

app.use(cors());
app.use(bodyParser.json());

// GET Route for 10 random pokemon
pokeRoutes.route("/").get(async (req, res, next) => {
  try {
    const pokes = await getPokesAsync(10);
    res.json(pokes);
  } catch (e) {
    next(e);
  }
});

app.use("/poke", pokeRoutes);

app.listen(process.env.PORT || PORT, function () {
  console.log("Server is running on Port: " + PORT);
});
