import { defineStore } from "pinia";

// Images
//https://image.tmdb.org/t/p/w154/naQZcMJf8MlvSWtO6HhOZFbmPKQ.jpg
// https://developers.themoviedb.org/3/configuration/get-api-configuration

export const useAPIStore = defineStore("API", {
  state: () => ({}),
  getters: {},
  actions: {
    async getTrendingAPI(media_type = "all", time_window = "day") {
      /*
      Retrieves the trending content for the specified parameters

      PARAMETERS:
      media_type: all | movie | tv | person
      time_window: day | week
      */

      // const results = fetch(
      //   "https://tmdb-backend.herokuapp.com/api/trending?media_type=movie&time_window=day",
      //   {
      //     method: "GET",
      //   }
      // )
      //   .then((res) => {
      //     res.json();
      //   })
      //   .then((data) => console.log(data))
      //   .catch((err) => console.error(err));

      // Async-await
      const response = await fetch(
        `https://tmdb-backend.herokuapp.com/api/trending?media_type=${media_type}&time_window=${time_window}`
      );
      const json = await response.json();
      return json;
    },

    async getMovieCreditsAPI(movie_id) {
      if (!movie_id) return;

      const response = await fetch(
        `https://tmdb-backend.herokuapp.com/api/movie/credits?movie_id=${movie_id}`
      );
      const json = await response.json();

      return json;
    },

    async getMovieRecommendationsAPI(movie_id) {
      if (!movie_id) return;

      const response = await fetch(
        `https://tmdb-backend.herokuapp.com/api/movie/recommendations?movie_id=${movie_id}`
      );
      const json = await response.json();
      return json;
    },

    async getMovieDetailsAPI(movie_id) {
      if (!movie_id) return;

      const response = await fetch(
        `https://tmdb-backend.herokuapp.com/api/movie/details?movie_id=${movie_id}`
      );
      const json = await response.json();
      return json;
    },
  },
});
