import { defineStore } from "pinia";
import { useAPIStore } from "./API";

export const useDiscoverStore = defineStore("Discover", {
  state: () => ({
    discover: {
      tv: [],
      movies: [],
      isLoading: false,
    },
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

      this.discover.isLoading = true;

      // Unload old results
      this.discover.movies = [];

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
          this.discover.movies.push(movies.results[movie]);
        }
      }

      this.discover.isLoading = false;
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

      this.discover.isLoading = true;

      // Unload old shows
      this.discover.tv = [];

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
          this.discover.tv.push(shows.results[show]);
        }
      }

      this.discover.isLoading = false;
    },

    clearDiscoverMovies() {
      this.discover.movies = [];
    },
    clearDiscoverTV() {
      this.discover.tv = [];
    },
  },
});
