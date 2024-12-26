import { defineStore } from "pinia";

export const useAPIStore = defineStore("API", {
  state: () => ({
    APIStatus: {
      results: [],
      lastUpdated: "",
    },
  }),
  getters: {},
  persist: true,
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
        return response.json();
      } catch {
        // Server is idling, fallback to second URL
        const response = await fetch(
          `https://tmdb-backend.autoidleapp.com/api/trending?media_type=${media_type}&time_window=${time_window}`
        );
        return response.json();
      }
    },

    async getMovieCreditsAPI(movie_id) {
      if (!movie_id) return;

      const response = await fetch(
        `https://tmdb-backend.herokuapp.com/api/movie/credits?movie_id=${movie_id}`
      );
      return response.json();
    },

    async getMovieRecommendationsAPI(movie_id) {
      if (!movie_id) return;

      const response = await fetch(
        `https://tmdb-backend.herokuapp.com/api/movie/recommendations?movie_id=${movie_id}`
      );
      return response.json();
    },

    async getMovieDetailsAPI(movie_id) {
      if (!movie_id) return;

      const response = await fetch(
        `https://tmdb-backend.herokuapp.com/api/movie/details?movie_id=${movie_id}`
      );
      return response.json();
    },

    async getPopularMoviesAPI(page = 1) {
      try {
        const response = await fetch(
          `https://tmdb-backend.herokuapp.com/api/movie/popular?page=${page}`
        );
        return await response.json();
      } catch {
        const response = await fetch(
          `https://tmdb-backend.autoidleapp.com/api/movie/popular?page=${page}`
        );
        return response.json();
      }
    },

    async getUpcomingMoviesAPI(page = 1) {
      try {
        const response = await fetch(
          `https://tmdb-backend.herokuapp.com/api/movie/upcoming?page=${page}`
        );
        return response.json();
      } catch {
        const response = await fetch(
          `https://tmdb-backend.autoidleapp.com/api/movie/upcoming?page=${page}`
        );
        return response.json();
      }
    },

    async getLatestMovieAPI() {
      try {
        const response = await fetch(
          `https://tmdb-backend.herokuapp.com/api/movie/latest`
        );
        return response.json();
      } catch {
        const response = await fetch(
          `https://tmdb-backend.autoidleapp.com/api/movie/latest`
        );
        return response.json();
      }
    },

    async getTopRatedMoviesAPI(page = 1) {
      try {
        const response = await fetch(
          `https://tmdb-backend.herokuapp.com/api/movie/toprated?page=${page}`
        );
        return response.json();
      } catch {
        const response = await fetch(
          `https://tmdb-backend.autoidleapp.com/api/movie/toprated?page=${page}`
        );
        return response.json();
      }
    },

    async getTopRatedTVAPI(page = 1) {
      try {
        const response = await fetch(
          `https://tmdb-backend.herokuapp.com/api/tv/toprated?page=${page}`
        );
        return response.json();
      } catch {
        const response = await fetch(
          `https://tmdb-backend.autoidleapp.com/api/tv/toprated?page=${page}`
        );
        return response.json();
      }
    },

    async getNowPlayingMoviesAPI(page) {
      try {
        const response = await fetch(
          `https://tmdb-backend.herokuapp.com/api/movie/nowplaying?page=${page}`
        );
        return response.json();
      } catch {
        const response = await fetch(
          `https://tmdb-backend.autoidleapp.com/api/movie/nowplaying?page=${page}`
        );
        return response.json();
      }
    },

    async getPopularTVShowsAPI(page = 1) {
      try {
        const response = await fetch(
          `https://tmdb-backend.herokuapp.com/api/tv/popular?page=${page}`
        );
        return response.json();
      } catch {
        const response = await fetch(
          `https://tmdb-backend.autoidleapp.com/api/tv/popular?page=${page}`
        );
        return response.json();
      }
    },

    async getTVDetailsAPI(tv_id) {
      if (!tv_id) return;

      const response = await fetch(
        `https://tmdb-backend.herokuapp.com/api/tv/details?tv_id=${tv_id}`
      );
      return response.json();
    },

    async getTVRecommendationsAPI(tv_id) {
      if (!tv_id) return;

      const response = await fetch(
        `https://tmdb-backend.herokuapp.com/api/tv/recommendations?tv_id=${tv_id}`
      );
      return response.json();
    },

    async getTVCredits(tv_id) {
      if (!tv_id) return;

      const response = await fetch(
        `https://tmdb-backend.herokuapp.com/api/tv/credits?tv_id=${tv_id}`
      );
      return response.json();
    },

    async getTVSeasonDetails(tv_id, season_number) {
      const response = await fetch(
        `https://tmdb-backend.herokuapp.com/api/tv/season/details?tv_id=${tv_id}&season_number=${season_number}`
      );
      return response.json();
    },

    async getMovieGenres() {
      const response = await fetch(
        `https://tmdb-backend.herokuapp.com/api/movie/genre`
      );
      return response.json();
    },

    async getTVGenres() {
      const response = await fetch(
        `https://tmdb-backend.herokuapp.com/api/tv/genre`
      );
      return response.json();
    },

    async getMovieDiscover(
      sort_by,
      page,
      vote_average,
      vote_sort,
      with_genres
    ) {
      const response = await fetch(
        `https://tmdb-backend.herokuapp.com/api/discover/movie?sort_by=${sort_by}&page=${page}&vote_average=${vote_average}&vote_sort=${vote_sort}&with_genres=${with_genres}`
      );

      return response.json();
    },

    async getTVDiscover(
      sort_by,
      page,
      vote_average,
      vote_sort = "gte",
      with_genres
    ) {
      const response = await fetch(
        `https://tmdb-backend.herokuapp.com/api/discover/tv?sort_by=${sort_by}&page=${page}&vote_average=${vote_average}&vote_sort=${vote_sort}&with_genres=${with_genres}`
      );

      return response.json();
    },

    async getSearchResults(query, type, page = 1) {
      // Type : multi | movie | tv

      const response = await fetch(
        `https://tmdb-backend.herokuapp.com/api/search/${type}?query=${query}&page=${page}`
      );

      return response.json();
    },

    async getMovieVideos(movie_id) {
      const response = await fetch(
        `https://tmdb-backend.autoidleapp.com/api/movie/videos?movie_id=${movie_id}`
      );

      return response.json();
    },

    async getTVVideos(tv_id) {
      const response = await fetch(
        `https://tmdb-backend.autoidleapp.com/api/tv/videos?tv_id=${tv_id}`
      );

      return response.json();
    },

    async getReviews(type, id) {
      // Get reviews based on id
      // Type can be either movie | tv

      if (!id) return;

      const response = await fetch(
        `https://tmdb-backend.autoidleapp.com/api/${type}/review?tv_id=${id}&movie_id=${id}`
      );

      return response.json();
    },

    async getCollections(id) {
      // Gather collections for a tv/movie show

      if (!id) return;

      const response = await fetch(
        `https://tmdb-backend.autoidleapp.com/api/search/collections?id=${id}`
      );

      return response.json();
    },

    async getAPIStatus() {
      const response = await fetch(
        "https://tmdb-backend.autoidleapp.com/api/health"
      );

      this.APIStatus = {
        results: response.json(),
        lastUpdated: new Date().toLocaleString(),
      };
    },
  },
});
