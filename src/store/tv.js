import { defineStore } from "pinia";
import { useAPIStore } from "./API";

export const useTVStore = defineStore("TV", {
  state: () => ({
    tvDetails: {},
    tvCredits: {},
    tvRecommendations: [],
    tvReviews: [],

    // TODO: Update these to only isLoadingTV

    isLoadingPopularHome: false,
    isLoadingPopular: false,

    isLoadingTV: false,

    tvGenres: [],

    popularTVShows: [],
    popularTVShowsHome: [],
  }),
  getters: {},
  actions: {
    async getTVDetails(tv_id) {
      /*
        Retrieve the details related to the tv show
        */

      this.isLoadingTV = true;

      const credits = await useAPIStore().getTVCredits(tv_id);
      const details = await useAPIStore().getTVDetailsAPI(tv_id);
      const recommendations = await useAPIStore().getTVRecommendationsAPI(
        tv_id
      );
      const reviews = await useAPIStore().getTVReviews(tv_id);

      this.tvCredits = credits;
      this.tvDetails = details;
      this.tvRecommendations = recommendations;
      this.tvReviews = reviews;

      this.isLoadingTV = false;
    },

    async getPopularTVHome(page) {
      /* 
          Retrieve the popular tv shows to display on home screen
      */

      this.isLoadingPopularHome = true;
      const popularTVShows = await useAPIStore().getPopularTVShowsAPI(
        (page = page)
      );
      this.popularTVShowsHome = popularTVShows;

      this.isLoadingPopularHome = false;
    },

    async getPopularTVShows(page) {
      this.isLoadingTV = true;

      // Unload the old tv shows
      this.popularTVShows = [];

      for (let i = page; i < 2 + page; i++) {
        const tvshows = await useAPIStore().getPopularTVShowsAPI(i);

        for (const show in tvshows.results) {
          this.popularTVShows.push(tvshows.results[show]);
        }
      }

      this.isLoadingTV = false;
    },

    async getTVGenres() {
      const genres = await useAPIStore().getTVGenres();

      this.tvGenres = genres;
    },
  },
});
