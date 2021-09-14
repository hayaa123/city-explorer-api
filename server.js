"use strict";
const express = require("express");

const app = express();
const cors = require("cors");
app.use(cors());
require("dotenv").config();
const weatherData = require("./data/weather.json");
const axios=require("axios");

const PORT = process.env.PORT;
// app.get("/", (req, res) => {
//   res.status(200).send("Hello world");
// });

class Forecast {
  constructor(date, description) {
    this.date = date;
    this.description = description;
  }
} 

let weatherHandle = async (req,res) => {
  let lattitude = Number(req.query.lat);
  let longittude = Number(req.query.lon);
  console.log(lattitude)
  let url=`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lattitude}&lon=${longittude}&key=${process.env.WATEHER_API_KEY}`;
  let axiosRes = await axios.get(url);
  console.log(axiosRes);
  let weatherInformation = axiosRes.data;
  // console.log(weatherInformation)
  let cleanData = weatherInformation.data.map(item => {
    return new Forecast(item.datetime, item.weather.description);
  })
  res.json(cleanData);
}

app.get("/weather",weatherHandle);


class topMov {
  constructor(name, description) {
    this.name = name;
    this.description = description;
  }
}
app.get("/movie", async (req, res) => {
  let region = req.query.country_code.toUpperCase();
  let movieUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.MOVIE_API_KEY}&region=${region}`;
  let axiosRes = await axios.get(movieUrl);
  let topMovies = axiosRes.data;
  let cleanData = topMovies.results.map((item) => {
    return new topMov(item.original_title, item.overview);
  });
  res.json(cleanData);
});




app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});



// (req, res) => {
//   let lattitude = Number(req.query.lat);
//   let longittude = Number(req.query.lon);
//   let name = req.query.q.toLocaleLowerCase();
//   let location = [];
//   location = weatherData.find(
//     (item) =>
//       item.lat === lattitude &&
//       item.city_name.toLocaleLowerCase() === name &&
//       item.lon === longittude
//   );

//   }
//   if (location) {
//     let dayWeather = location.data.map((item) => {
//       return new Forecast(item.valid_date, item.weather.description);
//     });
//     console.log(name);

//     res.json(dayWeather);
//   } else {
//     res.status(500).json("server abc error");
//   }
// }