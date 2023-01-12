import { defineStore } from "pinia";
import { useAPIStore } from "./API";

export const useMovieStore = defineStore("Movie", {
  state: () => ({
    movieDetails: {},
    movieCredits: {},
    movieRecommendations: [],
    isLoadingDetails: false,

    popularMovies: [],
    popularMoviesHome: [],
    upcomingMoviesHome: [],
    latestMovies: [],
    topRatedMovies: [],
  }),
  getters: {},
  actions: {
    async getMovieDetails(movie_id) {
      /* 
        Retrieve the movie credits belonging to the movie_id
      */
      this.isLoadingDetails = true;

      const credits = await useAPIStore().getMovieCreditsAPI(movie_id);
      const details = await useAPIStore().getMovieDetailsAPI(movie_id);
      const recommendations = await useAPIStore().getMovieRecommendationsAPI(
        movie_id
      );

      this.movieCredits = credits;
      this.movieDetails = details;
      this.movieRecommendations = recommendations;

      this.isLoadingDetails = false;
    },

    async getPopularMoviesHome(page) {
      /*
        Get the popular movies to display

        NOTE: Only for the homepage -> limit the amount to show 
        and use movies page to show more
      */
      const movies = await useAPIStore().getPopularMoviesAPI((page = page));
      this.popularMoviesHome = movies;
    },

    async getUpcomingMovies(page) {
      /* Get the upcoming movies for the home screen */
      const upcoming = await useAPIStore().getUpcomingMoviesAPI((page = page));
      this.upcomingMoviesHome = upcoming;
    },

    async getLatestMovie() {
      /* Get the latest movies */
      const latest = await useAPIStore().getLatestMoviesAPI();
      this.latestMovies = latest;
    },

    async getTopRatedMovies(page) {
      /* Get the top rated movies */
      const toprated = await useAPIStore().getTopRatedMoviesAPI(page);
      this.topRatedMovies = toprated;
    },
  
  },
});
