import { defineStore } from "pinia";
import { useAPIStore } from "./API";

export const useSearchStore = defineStore("Search", {
  state: () => ({
    search: {
      query: "",
      results: [],
      isLoading: false,
    },
  }),
  getters: {},
  persist: true,
  actions: {
    async getSearch(query, page = 1) {
      /*
            Get the search results
            query:  String 

        */

      if (!query) return;

      this.search.results = [];

      // Get the search results
      const results = await useAPIStore().getSearchResults(query, (page = 1));

      // Add the results to the search results
      this.search.results.push(results);
    },

    clearSearchResults() {
      this.search.results = [];
    },
  },
});
