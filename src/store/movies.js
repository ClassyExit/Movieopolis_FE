import { defineStore } from "pinia";
import { useAPIStore } from "./API";
import { collection } from "firebase/firestore";

export const useMovieStore = defineStore("Movie", {
  state: () => ({
    movieDetails: {},
    movieCredits: {},
    movieRecommendations: [],
    movieVideos: [],
    movieTrailer: {},
    movieReviews: [],
    movieCollections: [],

    isLoadingDetails: false,

    movieGenres: [],

    isLoadingPopularHome: false,
    isLoadingUpcomingHome: false,
    isLoadingTopRatedHome: false,

    popularMovies: [],
    isLoadingMovies: false,
    popularMoviesHome: [],
    upcomingMoviesHome: [],
    latestMovies: [],
  }),
  getters: {},
  actions: {
    async getMovieDetails(movie_id) {
      /* 
        Retrieve the movie credits belonging to the movie_id
      */
      this.isLoadingDetails = true;
      this.movieVideos = [];
      this.movieTrailer = {};

      const credits = await useAPIStore().getMovieCreditsAPI(movie_id);
      const details = await useAPIStore().getMovieDetailsAPI(movie_id);
      const recommendations = await useAPIStore().getMovieRecommendationsAPI(
        movie_id
      );
      const videos = await useAPIStore().getMovieVideos(movie_id);
      const reviews = await useAPIStore().getReviews("movie", movie_id);

      // Find only videos from Youtube
      for (let item in videos.results) {
        if (videos.results[item].site.includes("YouTube")) {
          this.movieVideos.push(videos.results[item]);

          // Find the trailer
          // Parameters:
          // type: Trailer
          // isOfficial: true
          // site: Youtube
          if (
            videos.results[item].type.includes("Trailer")
            //&& videos.results[item].official == true
          ) {
            this.movieTrailer = videos.results[item];
          }
        }
      }

      const findTrailer = () => {
        // Exit if no videos
        if (!movieStore.movieVideos) return;
      };

      this.movieCredits = credits;
      this.movieDetails = details;
      this.movieRecommendations = recommendations;
      this.movieReviews = reviews;
      this.isLoadingDetails = false;
    },

    async getCollections(collection_id) {
      if (!collection_id) return;

      const collections = await useAPIStore().getCollections(collection_id);

      this.movieCollections = collections;
    },

    async getPopularMoviesHome(page) {
      /*
        Get the popular movies to display

        NOTE: Only for the homepage -> limit the amount to show 
        and use movies page to show more
      */
      this.isLoadingPopularHome = true;
      const movies = await useAPIStore().getPopularMoviesAPI((page = page));
      this.popularMoviesHome = movies;

      this.isLoadingPopularHome = false;
    },

    async getUpcomingMovies(page) {
      /* Get the upcoming movies for the home screen */

      this.isLoadingUpcomingHome = true;

      const upcoming = await useAPIStore().getUpcomingMoviesAPI((page = page));
      this.upcomingMoviesHome = upcoming;

      this.isLoadingUpcomingHome = false;
    },

    async getLatestMovie() {
      /* Get the latest movies */
      const latest = await useAPIStore().getLatestMoviesAPI();
      this.latestMovies = latest;
    },

    async getTopRatedMovies(page) {
      /* Get the top rated movies */

      // Unload the old movies
      this.popularMovies = [];

      for (let i = page; i < 2 + page; i++) {
        const movies = await useAPIStore().getTopRatedMoviesAPI(i);

        for (const movie in movies.results) {
          this.popularMovies.push(movies.results[movie]);
        }
      }

      this.isLoadingMovies = false;
    },

    async getPopularMovies(page) {
      this.isLoadingMovies = true;

      // Unload the old movies
      this.popularMovies = [];

      for (let i = page; i < 2 + page; i++) {
        const movies = await useAPIStore().getPopularMoviesAPI(i);

        for (const movie in movies.results) {
          this.popularMovies.push(movies.results[movie]);
        }
      }

      this.isLoadingMovies = false;
    },

    async getNowPlayingMovies(page) {
      this.isLoadingMovies = true;

      // Unload the old movies
      this.popularMovies = [];

      for (let i = page; i < 2 + page; i++) {
        const movies = await useAPIStore().getNowPlayingMoviesAPI(i);

        for (const movie in movies.results) {
          this.popularMovies.push(movies.results[movie]);
        }
      }

      this.isLoadingMovies = false;
    },

    async getMovieGenres() {
      const genres = await useAPIStore().getMovieGenres();

      this.movieGenres = genres;
    },
  },
});
