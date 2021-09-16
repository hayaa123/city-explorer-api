'use srtict';
const axios = require('axios')
const TopMov = require('../modules/Movie')
const cache = require('../')

let MovieHandeler = async (req, res) => {
    let region = req.query.country_code.toUpperCase();
    let currentDay = new Date().getDay()
    let key = `mov-${region}`
    // console.log('currentDate:',currentDate.getDay())
    // console.log('Cache:',Cache)
    if(cache[key] && cache[key].day === currentDay){
      res.status(200).json(cache[key].data)
    }else{
      let movieUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.MOVIE_API_KEY}&region=${region}`;
      let axiosRes = await axios.get(movieUrl);
      let topMovies = axiosRes.data;
      cache[key] = {}
      cache[key].day = currentDay
      cache[key].data = topMovies.results.map((item) => {
        return new TopMov(item.original_title, item.overview);
      });
      res.json(cache[key].data);
    }
  }
  module.exports = MovieHandeler;