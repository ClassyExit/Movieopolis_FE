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
      seasonDetails: [],
      isLoadingSeason: false,
    },

    show_links: {
      id: null,
      season: 1,
      episode: 1,
      links: [],
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
      this.show.isLoading = true;
      this.show.trailer = {};

      const details = await useAPIStore().getTVDetailsAPI(tv_id);
      const reviews = await useAPIStore().getReviews("tv", tv_id);

      if (details.videos.results) {
        for (let item in details.videos.results) {
          if (details.videos.results[item].site.includes("YouTube")) {
            if (details.videos.results[item].type.includes("Trailer")) {
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
      this.shows.popular = [];

      for (let i = page; i < 2 + page; i++) {
        const tvshows = await useAPIStore().getPopularTVShowsAPI(i);
        for (const show of tvshows.results) {
          this.shows.popular.push(show);
        }
      }
      this.shows.isLoading = false;
    },

    async getShowLinks(tv_id, season_number, episode_number) {
      if (!tv_id) return; // Prevent API call if no valid TV ID

      const results = await useAPIStore().getShowVideoLinks(
        tv_id,
        season_number,
        episode_number
      );

      this.show_links = {
        id: tv_id,
        season: season_number,
        episode: episode_number,
        links: results,
      };
    },
  },
});
