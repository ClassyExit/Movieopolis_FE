import { defineStore } from "pinia";
import { useAPIStore } from "./API";

export const useMovieStore = defineStore("Movie", {
  state: () => ({
    movie: {
      results: {},

      trailer: {},
      reviews: [],
      collections: {},
      isLoading: false,
    },

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

      this.movie.trailer = {};
      this.movie.collections = [];

      const details = await useAPIStore().getMovieDetailsAPI(movie_id);
      const reviews = await useAPIStore().getReviews("movie", movie_id);

      // Find only videos from Youtube
      if (details.videos.results) {
        for (let item in details.videos.results) {
          if (details.videos.results[item].site.includes("YouTube")) {
            // Store all videos from youtube - not needed
            // this.movie.videos.push(details.videos.results[item]);

            // Find the trailer
            // Parameters:
            // type: Trailer
            // isOfficial: true
            // site: Youtube
            if (
              details.videos.results[item].type.includes("Trailer")
              //&& videos.results[item].official == true
            ) {
              this.movie.trailer = details.videos.results[item];
            }
          }
        }
      }

      this.movie.results = details;
      this.movie.reviews = reviews;
      this.movie.isLoading = false;
    },

    async getCollections() {
      // Check if there is a collection

      if (this.movie.results.details.belongs_to_collection) {
        const id = this.movie.results.details.belongs_to_collection.id;

        const results = await useAPIStore().getCollectionsAPI(id);

        this.movie.collections = results;
      } else {
        this.movie.collections = {};
      }
    },

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
  },
});
