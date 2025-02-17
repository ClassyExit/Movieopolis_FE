import { defineStore } from "pinia";

export const useAPIStore = defineStore("API", {
  state: () => ({}),
  getters: {},
  persist: true,
  actions: {
    async fetchAPI(urls, retries = 2) {
      for (let url of urls) {
        for (let attempt = 0; attempt <= retries; attempt++) {
          try {
            const response = await fetch(url);
            if (response.ok) {
              return await response.json();
            } else {
              console.error(`Fetch error: ${response.status} on ${url}`);
            }
          } catch (error) {
            console.error(
              `Fetch failed for URL: ${url} (Attempt: ${attempt + 1})`,
              error
            );
          }
        }
      }
      throw new Error("All fetch attempts failed.");
    },

    // DONE
    async getTrendingAPI(media_type = "all", time_window = "day") {
      /*
      Retrieves the trending content for the specified parameters

      PARAMETERS:
      media_type: all | movie | tv | person
      time_window: day | week
      */

      const urls = [
        `https://tmdb-backend.herokuapp.com/api/trending?media_type=${media_type}&time_window=${time_window}`,
        `https://tmdb-backend.autoidleapp.com/api/trending?media_type=${media_type}&time_window=${time_window}`,
      ];

      try {
        const data = await this.fetchAPI(urls);
        return data;
      } catch (error) {
        console.error("Failed to get content:", error);
        return null; // Return null for now, handle error later
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

    // DONE
    async getPopularMoviesAPI(page = 1) {
      const urls = [
        `https://tmdb-backend.herokuapp.com/api/movie/popular`,
        `https://tmdb-backend.autoidleapp.com/api/movie/popular`,
      ];

      try {
        const data = await this.fetchAPI(urls);
        return data;
      } catch (error) {
        console.error("Failed to get content:", error);
        return null;
      }
    },

    // DONE
    async getUpcomingMoviesAPI(page = 1) {
      const urls = [
        `https://tmdb-backend.herokuapp.com/api/upcoming`,
        `https://tmdb-backend.autoidleapp.com/api/upcoming`,
      ];

      try {
        const data = await this.fetchAPI(urls);
        return data;
      } catch (error) {
        console.error("Failed to get content:", error);
        return null; // Return null for now, handle error later
      }
    },

    // DONE
    async getTopRatedAPI() {
      const urls = [
        `https://tmdb-backend.herokuapp.com/api/top-rated`,
        `https://tmdb-backend.autoidleapp.com/api/top-rated`,
      ];

      try {
        const data = await this.fetchAPI(urls);
        return data;
      } catch (error) {
        console.error("Failed to get content:", error);
        return null;
      }
    },

    // DONE
    async getPopularTVShowsAPI(page = 1) {
      const urls = [
        `https://tmdb-backend.herokuapp.com/api/tv/popular?page=${page}`,
        `https://tmdb-backend.autoidleapp.com/api/tv/popular?page=${page}`,
      ];

      try {
        const data = await this.fetchAPI(urls);
        return data;
      } catch (error) {
        console.error("Failed to get content:", error);
        return null;
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
  },
});
