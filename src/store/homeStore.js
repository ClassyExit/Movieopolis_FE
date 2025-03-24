import { defineStore } from "pinia";
import { useAPIStore } from "./API";

export const useHomeStore = defineStore("Home", {
  state: () => ({
    isLoading: {
      trending: false,
      home: false,
    },

    movies: {
      lastUpdated: null,
      popularMovies: [],
      popularTVShows: [],
      upcoming: [],
      trending: [],
      topRated: [],
    },
  }),
  persist: true,
  actions: {
    async getHomeData() {
      /*
              Get the popular movies and shows to display
      
              NOTE: Only for the homepage -> limit the amount to show 
              and use movies page to show more
            */

      const now = new Date();
      const lastUpdated = this.movies.lastUpdated
        ? new Date(this.movies.lastUpdated)
        : null;

      const hoursSinceUpdate = (now - lastUpdated) / 36e5;

      // Check to update if more than 6 hours since last update
      if (
        lastUpdated instanceof Date &&
        hoursSinceUpdate < 6 &&
        this.movies.popularMovies.results.length &&
        this.movies.popularTVShows.results.length &&
        this.movies.upcoming.results.length
      ) {
        return;
      }

      this.isLoading.home = true;

      const movies = await useAPIStore().getPopularMoviesAPI();
      const TVShows = await useAPIStore().getPopularTVShowsAPI();
      const upcomingMovies = await useAPIStore().getUpcomingMoviesAPI();
      const topRated = await useAPIStore().getTopRatedAPI();

      // Update state with new data
      this.movies = {
        lastUpdated: now,
        popularMovies: movies,
        popularTVShows: TVShows,
        upcoming: upcomingMovies,
        trending: this.movies.trending, // Preserve trending data
        topRated: topRated,
      };

      this.isLoading.home = false;
    },

    async getTrendingContent(media_type, time_window) {
      const now = new Date();

      const lastUpdated = this.movies.lastUpdated
        ? new Date(this.movies.lastUpdated)
        : null;

      const hoursSinceUpdate = (now - lastUpdated) / 36e5;
      // Check if we need to update: if no data OR last update was over 6 hours ago
      if (
        lastUpdated instanceof Date &&
        hoursSinceUpdate < 6 &&
        this.movies.trending.results.length
      ) {
        return;
      }

      this.isLoading.trending = true;

      const data = await useAPIStore().getTrendingAPI(media_type, time_window);

      // Update the trending state. If there is already content, write over that, otherwise
      // add the new content
      this.movies.trending = data;

      this.isLoading.trending = false;
    },
  },
});
