import { defineStore } from "pinia";
import { useAPIStore } from "./API";

export const useHomeStore = defineStore("Home", {
  state: () => ({
    isLoading: {
      trending: false,
      home: false,
    },

    movies: {
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
      this.isLoading.home = true;
      const movies = await useAPIStore().getPopularMoviesAPI();
      const TVShows = await useAPIStore().getPopularTVShowsAPI();
      const upcomingMovies = await useAPIStore().getUpcomingMoviesAPI();
      const topRated = await useAPIStore().getTopRatedAPI();

      this.movies.popularMovies = movies;
      this.movies.popularTVShows = TVShows;
      this.movies.upcoming = upcomingMovies;
      this.movies.topRated = topRated;

      this.isLoading.home = false;
    },

    async getTrendingContent(media_type, time_window) {
      this.isLoading.trending = true;

      const data = await useAPIStore().getTrendingAPI(media_type, time_window);

      // Update the trending state. If there is already content, write over that, otherwise
      // add the new content
      this.movies.trending = data;

      this.isLoading.trending = false;
    },
  },
});
