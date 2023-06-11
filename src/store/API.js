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

      try {
        const response = await fetch(
          `https://tmdb-backend.herokuapp.com/api/trending?media_type=${media_type}&time_window=${time_window}`
        );
        const json = await response.json();

        return json;
      } catch {
        // Error with API - try again after timeout
        await setTimeout(2000);

        location.reload();
      }
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

    async getPopularMoviesAPI(page = 1) {
      const response = await fetch(
        `https://tmdb-backend.herokuapp.com/api/movie/popular?page=${page}`
      );
      const json = await response.json();
      return json;
    },

    async getUpcomingMoviesAPI(page = 1) {
      const response = await fetch(
        `https://tmdb-backend.herokuapp.com/api/movie/upcoming?page=${page}`
      );
      const json = await response.json();
      return json;
    },

    async getLatestMovieAPI() {
      const response = await fetch(
        `https://tmdb-backend.herokuapp.com/api/movie/latest`
      );
      const json = await response.json();
      return json;
    },

    async getTopRatedMoviesAPI(page = 1) {
      const response = await fetch(
        `https://tmdb-backend.herokuapp.com/api/movie/toprated?page=${page}`
      );
      const json = await response.json();
      return json;
    },

    async getPopularTVShowsAPI(page = 1) {
      const response = await fetch(
        `https://tmdb-backend.herokuapp.com/api/tv/popular?page=${page}`
      );
      const json = await response.json();
      return json;
    },

    async getTVDetailsAPI(tv_id) {
      if (!tv_id) return;

      const response = await fetch(
        `https://tmdb-backend.herokuapp.com/api/tv/details?tv_id=${tv_id}`
      );
      const json = await response.json();

      return json;
    },

    async getTVRecommendationsAPI(tv_id) {
      if (!tv_id) return;

      const response = await fetch(
        `https://tmdb-backend.herokuapp.com/api/tv/recommendations?tv_id=${tv_id}`
      );
      const json = await response.json();

      return json;
    },

    async getTVCredits(tv_id) {
      if (!tv_id) return;

      const response = await fetch(
        `https://tmdb-backend.herokuapp.com/api/tv/credits?tv_id=${tv_id}`
      );
      const json = await response.json();

      return json;
    },

    async getTVReviews(tv_id) {
      if (!tv_id) return;

      const response = await fetch(
        `https://tmdb-backend.herokuapp.com/api/tv/review?tv_id=${tv_id}`
      );
      const json = await response.json();

      return json;
    },

    async getMovieReviews(movie_id) {
      if (!movie_id) return;

      const response = await fetch(
        `https://tmdb-backend.herokuapp.com/api/movie/review?movie_id=${movie_id}`
      );
      const json = await response.json();

      return json;
    },

    async getMovieGenres() {
      const response = await fetch(
        `https://tmdb-backend.herokuapp.com/api/genre/movies`
      );
      const json = await response.json();

      return json;
    },

    async getTVGenres() {
      const response = await fetch(
        `https://tmdb-backend.herokuapp.com/api/genre/tv`
      );
      const json = await response.json();

      return json;
    },

    async getMovieDiscover(
      sort_by,
      page,
      vote_average,
      vote_sort,
      with_genres
    ) {
      const response = await fetch(
        `https://tmdb-backend.herokuapp.com/api/movie/discover?sort_by=${sort_by}&page=${page}&vote_average=${vote_average}&vote_sort=${vote_sort}&with_genres=${with_genres}`
      );

      const json = await response.json();

      return json;
    },

    async getTVDiscover(
      sort_by,
      page,
      vote_average,
      vote_sort = "gte",
      with_genres
    ) {
      const response = await fetch(
        `https://tmdb-backend.herokuapp.com/api/tv/discover?sort_by=${sort_by}&page=${page}&vote_average=${vote_average}&vote_sort=${vote_sort}&with_genres=${with_genres}`
      );

      const json = await response.json();

      return json;
    },

    async getSearchResults(query, page = 1) {
      const type = "multi";

      const response = await fetch(
        `https://tmdb-backend.herokuapp.com/api/search/${type}?query=${query}&page=${page}`
      );

      const json = await response.json();

      return json;
    },
  },
});
