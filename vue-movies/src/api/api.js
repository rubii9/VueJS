import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

const mdb = {
  defaultArgs: {
    language: "es",
    api_key: process.env.VUE_APP_MOVIEDB_API_KEY,
  },
  searchMovies: function(query) {
    return instance
      .get("/search/movie", {
        params: { ...this.defaultArgs, query: query },
      })
      .then((response) => {
        return response.data.results;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  getMovieDetails: function(movieId) {
    return instance
      .get(`/movie/${movieId}`, {
        params: { ...this.defaultArgs, movie_id: movieId },
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};

export default mdb;
