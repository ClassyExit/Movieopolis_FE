import { defineStore } from "pinia";
import { useAPIStore } from "./API";

export const useSearchStore = defineStore("Search", {
  state: () => ({
    searchResults: [],
    isLoadingSearch: false,
  }),
  getters: {},
  actions: {
    async getSearch(query, page = 1) {
      /*
            Get the search results
            Type:   tv | movie | multi
            query:  String 

        */

      if (!query.value) return;

      this.searchResults = [];

      const results = await useAPIStore().getSearchResults(query.value, page);

      for (const result in results.results) {
        this.searchResults.push(results.results[result]);
      }
    },
  },
});
