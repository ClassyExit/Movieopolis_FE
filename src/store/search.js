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
            Type:   tv | movie | multi
            query:  String 

        */

      if (!query.value) return;

      this.search.results = [];

      // Get the search results for the first 3 pages
      const results = await useAPIStore().getSearchResults(
        query.value,
        (page = 1)
      );

      // Add the results to the search results
      this.search.results.push(results);

      // for (let i = 1; i < 3; i++) {
      //   // Get the search results for the first 3 pages
      //   const results = await useAPIStore().getSearchResults(
      //     query.value,
      //     type,
      //     (page = i)
      //   );

      //   // Add the results to the search results
      //   this.search.results.push(results.results);
      // }
    },

    clearSearchResults() {
      this.search.results = [];
    },
  },
});
