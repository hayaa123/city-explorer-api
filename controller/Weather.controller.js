'use strict';
const Forecast = require('../modules/Weathe')
const axios = require('axios')

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

  module.exports = weatherHandle;