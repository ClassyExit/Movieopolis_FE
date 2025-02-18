import { defineStore } from "pinia";
import { useAPIStore } from "./API";

export const useMovieStore = defineStore("Movie", {
  state: () => ({
    movie: {
      details: {},
      credits: {},
      recommendations: [],
      videos: [],
      trailer: {},
      reviews: [],
      collections: [],
      isLoading: false,
    },

    movieGenres: [],

    movies: {
      popular: [],
      isLoading: false,
    },
  }),
  persist: true,
  getters: {},
  actions: {
    async getMovieDetails(movie_id) {
      /* 
        Retrieve the movie credits belonging to the movie_id
      */
      this.movie.isLoading = true;
      this.movie.videos = [];
      this.movie.trailer = {};

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
          this.movie.videos.push(videos.results[item]);

          // Find the trailer
          // Parameters:
          // type: Trailer
          // isOfficial: true
          // site: Youtube
          if (
            videos.results[item].type.includes("Trailer")
            //&& videos.results[item].official == true
          ) {
            this.movie.trailer = videos.results[item];
          }
        }
      }

      const findTrailer = () => {
        // Exit if no videos
        if (!movieStore.movie.videos) return;
      };

      this.movie.credits = credits;
      this.movie.details = details;
      this.movie.recommendations = recommendations;
      this.movie.reviews = reviews;
      this.movie.isLoading = false;
    },

    async getCollections(collection_id) {
      if (!collection_id) return;

      const collections = await useAPIStore().getCollections(collection_id);

      this.movieCollections = collections;
    },

    // DONE
    async getPopularMovies(page) {
      this.movies.isLoading = true;

      // Unload the old movies
      this.movies.popular = [];

      for (let i = page; i < 2 + page; i++) {
        const movies = await useAPIStore().getPopularMoviesAPI(i);

        for (const movie in movies.results) {
          this.movies.popular.push(movies.results[movie]);
        }
      }
      this.movies.isLoading = false;
    },

    async getNowPlayingMovies(page) {
      this.movies.isLoadingMovies = true;

      // Unload the old movies
      this.movies.popular = [];

      for (let i = page; i < 2 + page; i++) {
        const movies = await useAPIStore().getNowPlayingMoviesAPI(i);

        for (const movie in movies.results) {
          this.movies.popular.push(movies.results[movie]);
        }
      }

      this.movies.isLoadingMovies = false;
    },

    async getMovieGenres() {
      const genres = await useAPIStore().getMovieGenres();

      this.movieGenres = genres;
    },
  },
});
