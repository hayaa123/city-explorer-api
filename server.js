'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const weather = require('./controller/Weather.controller');
const app = express();
app.use(cors())
const movieHandeller = require('./controller/Movie.Controller');

app.get('/weather', weatherHandler);
app.get("/movie", movieHandeller);



function weatherHandler(request, response) {

  let lat =Number(request.query.lat);
  let lon  = Number(request.query.lon);
  weather(lat, lon)
  .then(summaries => response.send(summaries))
  .catch((error) => {
    console.error(error);
    response.status(200).send('Sorry. Something went wrong!')
  });
}  

app.listen(process.env.PORT, () => console.log(`Server up on ${process.env.PORT}`));
