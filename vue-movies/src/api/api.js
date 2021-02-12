import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

const defaultArgs = {
  language: "es",
  api_key: process.env.VUE_APP_MOVIEDB_API_KEY,
};

const mdb = {
  searchMovies: function({ query, year }) {
    let params = { ...defaultArgs };
    if (query) {
      params.query = query;
    }
    if (year) {
      params.primary_release_year = year;
    }

    return instance
      .get("search/movie", { params })
      .then((response) => {
        return response.data.results;
      })
      .catch((error) => {
        console.log(error);
      });
  },

  asyncSearchMovies: async (query) => {
    try {
      const response = await instance.get("/search/movie", {
        params: {
          ...defaultArgs,
          query: query,
        },
      });
      return response.data.results;
    } catch (error) {
      console.log(error);
    }
  },

  getMovieDetails: (movieID) => {
    return instance
      .get(`/movie/${movieID}`, { params: defaultArgs })
      .then((response) => response.data)
      .catch((error) => console.log(error));
  },

  asyncGetMovieDetails: async (movieID) => {
    try {
      const response = await instance.get(`/movie/${movieID}`, {
        params: defaultArgs,
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },

  // utils
  getImagePath: (path) => {
    return `https://image.tmdb.org/t/p/w342/${path}`;
  },
};

export default mdb;
