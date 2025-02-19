import { defineStore } from "pinia";
import { useAPIStore } from "./API";

export const useDiscoverStore = defineStore("Discover", {
  state: () => ({
    discover: {
      results: [],
      isLoading: false,
    },
    genres: {},
  }),

  getters: {},
  actions: {
    async getDiscover(
      type = "movie",
      include_adult = false,
      language = "en-US",
      sort_by = "popularity",
      sort_order = "desc", // Added sort_order
      page = 1,
      vote_average = 5,
      vote_sort = "gte",
      with_genres
    ) {
      /*****
         Get a list of movie pending on the given parameters:
         type: movie || tv
         include_adult: boolean
         language:      string
         sort_by:       popularity, release_date, vote_average
         sort_order:    desc | asc 
         vote_average:  int
         vote_sort:     gte ( >vote_average | lte (<vote_average))
         with_genres:   selected genre
         page:          number
      ******/

      this.discover.isLoading = true;

      // Unload old results
      this.discover.results = [];

      const sorted_by = `${sort_by}.${sort_order}`;

      for (let i = 1; i <= 2; i++) {
        const movies = await useAPIStore().getDiscover(
          type,
          include_adult,
          language,
          sorted_by,
          i, // Pass i directly as the page number
          vote_average,
          vote_sort,
          with_genres
        );

        movies.results.forEach((movie) => {
          this.discover.results.push(movie);
        });
      }

      this.discover.isLoading = false;
    },

    clearDiscover() {
      this.discover.results = [];
    },

    async getGenres() {
      this.genres = await useAPIStore().getGenres();
    },
  },
});
