import { defineStore } from "pinia";
import { useAPIStore } from "./API";

export const useDiscoverStore = defineStore("Discover", {
  state: () => ({
    discoverTV: [],
    discoverMovies: [],

    isLoadingDiscover: false,
  }),

  getters: {},
  actions: {
    async getMovieDiscover(
      movieSortBy,
      sort_order,
      vote_average,
      vote_sort,
      movie_genre,
      page = 1
    ) {
      /*****
         Get a list of movie pending on the given parameters:

         movieSortBy:   popularity, release_date, vote_average
         sort_order:    desc | asc 
         vote_average:  int
         vote_sort:     gte ( >vote_average | lte (<vote_average))
         movie_genre:   selected genre
         page:          number
        ******/

      this.isLoadingDiscover = true;

      // Unload old results
      this.discoverMovies = [];

      const sort_by = `${movieSortBy}.${sort_order}`;

      for (let i = 1; i <= 2; i++) {
        const movies = await useAPIStore().getMovieDiscover(
          sort_by,
          (page = i),
          vote_average,
          vote_sort,
          movie_genre
        );

        for (const movie in movies.results) {
          this.discoverMovies.push(movies.results[movie]);
        }
      }

      this.isLoadingDiscover = false;
    },

    async getTVDiscover(
      tvSortBy,
      tv_sort_order,
      tv_vote_average,
      tv_vote_sort,
      tvGenre,
      page = 1
    ) {
      /*****
         Get a list of shows pending on the given parameters:

         tvSortBy:          release_date, vote_average
         tv_sort_order:     desc | asc 
         tv_vote_average:   int
         tv_vote_sort:      gte ( >vote_average)
         tvGenre:           selected genre
         page:              number
        ******/

      this.isLoadingDiscover = true;

      // Unload old shows
      this.discoverTV = [];

      const sort_by = `${tvSortBy}.${tv_sort_order}`;

      for (let i = 1; i <= 2; i++) {
        const shows = await useAPIStore().getTVDiscover(
          sort_by,
          (page = i),
          tv_vote_average,
          tv_vote_sort,
          tvGenre
        );

        for (const show in shows.results) {
          this.discoverTV.push(shows.results[show]);
        }
      }

      this.isLoadingDiscover = false;
    },

    clearDiscoverMovies() {
      this.discoverMovies = [];
    },
    clearDiscoverTV() {
      this.discoverTV = [];
    },
  },
});
