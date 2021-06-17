# Digital Pokedex - backend

This is the back end for the Digital Pokedex web app developed for the Ubiqua Coding Challenge.

The app was developed using Express.js running on Node.js.

Front end repository can be found [here](https://github.com/apovedam/pokedex-frontend).

## Server.js

The main project file that queries the pokemon API to fetch 10 randomly generated pokemon.

These are served on the `/poke` route.

To make the requests asynchronously, it generates a list of Axios promises and uses Promise.all to await them all at once.

Listens on port 4000 as well as `process.env.PORT` for Heroku compatibility.
