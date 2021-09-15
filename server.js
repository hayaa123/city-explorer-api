"use strict";
const express = require("express");

const app = express();
const cors = require("cors");
app.use(cors());
require("dotenv").config();
const weatherData = require("./data/weather.json");
const axios=require("axios");

const PORT = process.env.PORT;

const weatherHandle = require('./controller/Weather.controller')
const movieHandeller = require('./controller/Movie.Controller')

app.get("/weather",weatherHandle);
app.get("/movie", movieHandeller);


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

