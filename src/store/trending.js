import { defineStore } from "pinia";
import { useAPIStore } from "./API";

export const useTrendingStore = defineStore("Trending", {
  state: () => ({
    trending: [],
    isLoadingTrending: false,
  }),

  getters: {},
  actions: {
    async getTrendingContent(media_type, time_window) {
      // Send API call

      this.isLoadingTrending = true;

      const data = await useAPIStore().getTrendingAPI(media_type, time_window);

      // Update the trending state. If there is already content, write over that, otherwise
      // add the new content
      if (this.trending.length > 0) this.trending = data;
      else {
        this.trending.push(data);
      }

      this.isLoadingTrending = false;
    },
  },
});
