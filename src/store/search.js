import { defineStore } from "pinia";
import { useAPIStore } from "./API";

export const useSearchStore = defineStore("Search", {
  state: () => ({
    searchMovieResults: [],
    searchTVResults: [],
    isLoadingSearch: false,
  }),
  getters: {},
  actions: {
    async getSearch(query, type, page = 1) {
      /*
            Get the search results
            Type:   tv | movie | multi
            query:  String 

        */

      if (!query.value) return;

      this.searchMovieResults = [];
      this.searchTVResults = [];

      for (let i = 1; i < 3; i++) {
        const results = await useAPIStore().getSearchResults(
          query.value,
          type,
          (page = i)
        );

        for (let item in results.results) {
          if (type == "movie") {
            this.searchMovieResults.push(results.results[item]);
          } else {
            this.searchTVResults.push(results.results[item]);
          }
        }
      }
    },

    clearSearchResults() {
      this.searchMovieResults = [];
      this.searchTVResults = [];
    },
  },
});
