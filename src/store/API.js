import { defineStore } from "pinia";

export const useAPIStore = defineStore("API", {
  state: () => ({}),
  getters: {},
  persist: true,
  actions: {
    async fetchAPI(urls, request_options, retries = 2) {
      // URLS - LIST OF URLS TO REQUEST FROM
      // REQUEST_OPTIONS: HEADERS, BODY, METHODS

      for (let url of urls) {
        for (let attempt = 0; attempt <= retries; attempt++) {
          try {
            const response = await fetch(url, request_options);
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

    // DONE
    async getMovieDetailsAPI(movie_id) {
      if (!movie_id) return;

      const urls = [
        `https://tmdb-backend.herokuapp.com/api/movie/details?movie_id=${movie_id}`,
        `https://tmdb-backend.autoidleapp.com/api/movie/details?movie_id=${movie_id}`,
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

    // DONE
    async getTVDetailsAPI(tv_id) {
      if (!tv_id) return;

      const urls = [
        `https://tmdb-backend.herokuapp.com/api/tv/details?tv_id=${tv_id}`,
        `https://tmdb-backend.autoidleapp.com/api/tv/details?tv_id=${tv_id}`,
      ];

      try {
        const data = await this.fetchAPI(urls);
        return data;
      } catch (error) {
        console.error("Failed to get content:", error);
        return null;
      }
    },

    // TEST
    async getTVSeasonDetails(tv_id, season_number) {
      if (!tv_id) return;

      const urls = [
        `https://tmdb-backend.herokuapp.com/api/tv/season/details?tv_id=${tv_id}&season_number=${season_number}`,
        `https://tmdb-backend.autoidleapp.com/api/tv/season/details?tv_id=${tv_id}&season_number=${season_number}`,
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
    async getGenres() {
      const response = await fetch(
        `https://tmdb-backend.herokuapp.com/api/genres`
      );
      return response.json();
    },

    // TEST
    async getDiscover(
      type = "movie",
      include_adult = false,
      language = "en-US",
      sort_by = "popularity",
      page = 1,
      vote_average = 5,
      vote_sort = "gte",
      with_genres
    ) {
      if (!["movie", "tv"].includes(type)) return;

      const urls = [
        `https://tmdb-backend.herokuapp.com/api/discover/${type}?sort_by=${sort_by}&page=${page}&vote_average=${vote_average}&vote_sort=${vote_sort}&with_genres=${with_genres}&include_adult=${include_adult}&language=${language}`,
        `https://tmdb-backend.autoidleapp.com/api/discover/${type}?sort_by=${sort_by}&page=${page}&vote_average=${vote_average}&vote_sort=${vote_sort}&with_genres=${with_genres}&include_adult=${include_adult}&language=${language}`,
      ];

      try {
        const data = await this.fetchAPI(urls);
        return data;
      } catch (error) {
        console.error("Failed to get content:", error);
        return null;
      }
    },

    // TEST
    async getSearchResults(query, page = 1) {
      // Get search results based on query

      if (!query) return;

      const urls = [
        `https://tmdb-backend.herokuapp.com/api/search?query=${query}&page=${page}`,
        `https://tmdb-backend.autoidleapp.com/api/search?query=${query}&page=${page}`,
      ];

      try {
        const data = await this.fetchAPI(urls);
        return data;
      } catch (error) {
        console.error("Failed to get search:", error);
        return null;
      }
    },

    // DONE
    async getReviews(type, id) {
      // Get reviews based on id
      // Type can be either movie | tv

      if (!id) return;

      const urls = [
        `https://tmdb-backend.herokuapp.com/api/${type}/review?tv_id=${id}&movie_id=${id}`,
        `https://tmdb-backend.autoidleapp.com/api/${type}/review?tv_id=${id}&movie_id=${id}`,
      ];

      try {
        const data = await this.fetchAPI(urls);
        return data;
      } catch (error) {
        console.error("Failed to get content:", error);
        return null;
      }
    },

    // TEST
    async getCollections(id) {
      // Gather collections for a tv/movie show

      if (!id) return;

      const urls = [
        `https://tmdb-backend.herokuapp.com/api/collections?id=${id}`,
        `https://tmdb-backend.autoidleapp.com/api/collections?id=${id}`,
      ];

      try {
        const data = await this.fetchAPI(urls);
        return data;
      } catch (error) {
        console.error("Failed to get content:", error);
        return null;
      }
    },
  },
});
