import { defineStore } from "pinia";
import { useAPIStore } from "./API";

export const useSearchStore = defineStore("Search", {
  state: () => ({
    searchMovieResults: [],
    searchTVResults: [],
    isLoadingSearch: false,

    search: {
      query: "",
      results: [],
      recentSearches: [],
      isLoading: false,
    },
  }),
  getters: {},
  persist: true,
  actions: {
    async getSearch(query, type, page = 1) {
      /*
            Get the search results
            Type:   tv | movie | multi
            query:  String 

        */

      if (!query.value) return;

      this.search.results = [];

      for (let i = 1; i < 3; i++) {
        // Get the search results for the first 3 pages
        const results = await useAPIStore().getSearchResults(
          query.value,
          type,
          (page = i)
        );

        // Add the results to the search results
        this.search.results.push(results.results);
      }

      //Append query to recent searches
      if (this.search.recentSearches.length > 5) {
        // Limit the recent searches to 5
        this.search.recentSearches.shift();
      }
      this.search.recentSearches.push(query.value);
    },

    clearSearchResults() {
      this.search.results = [];
    },
  },
});
