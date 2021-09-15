'use srtict';
const axios = require('axios')
const TopMov = require('../modules/Movie')

let MovieHandeler = async (req, res) => {
    let region = req.query.country_code.toUpperCase();
    let movieUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.MOVIE_API_KEY}&region=${region}`;
    let axiosRes = await axios.get(movieUrl);
    let topMovies = axiosRes.data;
    let cleanData = topMovies.results.map((item) => {
      return new TopMov(item.original_title, item.overview);
    });
    res.json(cleanData);
  }
  module.exports = MovieHandeler;