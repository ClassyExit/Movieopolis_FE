import { defineStore } from "pinia";
import { useAPIStore } from "./API";

export const useTVStore = defineStore("TV", {
  state: () => ({
    show: {
      results: {},
      trailer: {},
      reviews: [],
      collections: [],
      isLoading: false,
      // Season details
      seasonDetails: [],
      isLoadingSeason: false,
    },

    shows: {
      popular: [],
      isLoading: false,
    },
  }),
  getters: {},
  persist: true,
  actions: {
    async getTVDetails(tv_id) {
      /*
        Retrieve the details related to the tv show
        */

      this.show.isLoading = true;

      this.show.trailer = {};

      const details = await useAPIStore().getTVDetailsAPI(tv_id);
      const reviews = await useAPIStore().getReviews("tv", tv_id);

      // Find only Youtube videos
      if (details.videos.results) {
        for (let item in details.videos.results) {
          if (details.videos.results[item].site.includes("YouTube")) {
            // Store all videos from youtube - not needed
            // this.show.videos.push(details.videos.results[item]);

            // Find the trailer
            // Parameters:
            // type: Trailer
            // isOfficial: true
            // site: Youtube
            if (
              details.videos.results[item].type.includes("Trailer")
              //&& videos.results[item].official == true
            ) {
              this.show.trailer = details.videos.results[item];
            }
          }
        }
      }

      this.show.results = details;
      this.show.reviews = reviews;
      this.show.isLoading = false;
    },

    async getTVSeasonDetails(tv_id, season_number) {
      this.show.isLoadingSeason = true;

      const details = await useAPIStore().getTVSeasonDetails(
        tv_id,
        season_number
      );
      this.show.seasonDetails = details;

      this.show.isLoadingSeason = false;
    },

    async getPopularTVShows(page) {
      this.shows.isLoading = true;

      // Unload the old tv shows
      this.shows.popular = [];

      for (let i = page; i < 2 + page; i++) {
        const tvshows = await useAPIStore().getPopularTVShowsAPI(i);

        for (const show in tvshows.results) {
          this.shows.popular.push(tvshows.results[show]);
        }
      }
      this.shows.isLoading = false;
    },
  },
});
