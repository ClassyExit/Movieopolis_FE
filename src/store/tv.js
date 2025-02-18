import { defineStore } from "pinia";
import { useAPIStore } from "./API";

export const useTVStore = defineStore("TV", {
  state: () => ({
    show: {
      details: {},
      credits: {},
      recommendations: [],
      seasonDetails: [],
      videos: [],
      trailer: {},
      reviews: [],
      isLoading: false,
      isLoadingSeason: false,
    },

    shows: {
      popular: [],
      isLoading: false,
    },

    tvGenres: [],
  }),
  getters: {},
  persist: true,
  actions: {
    async getTVDetails(tv_id) {
      /*
        Retrieve the details related to the tv show
        */

      this.show.isLoading = true;
      this.show.videos = []; // reset the videos, seems to keep stacking
      this.show.trailer = {};

      const credits = await useAPIStore().getTVCredits(tv_id);
      const details = await useAPIStore().getTVDetailsAPI(tv_id);
      const recommendations = await useAPIStore().getTVRecommendationsAPI(
        tv_id
      );
      const videos = await useAPIStore().getTVVideos(tv_id);
      const reviews = await useAPIStore().getReviews("tv", tv_id);

      // Find only Youtube videos
      for (let item in videos.results) {
        if (videos.results[item].site.includes("YouTube")) {
          this.show.videos.push(videos.results[item]);

          // Find the trailer
          // Parameters:
          // type: Trailer
          // isOfficial: true
          // site: Youtube
          if (
            videos.results[item].type.includes("Trailer")
            //&& videos.results[item].official == true
          ) {
            this.show.trailer = videos.results[item];
          }
        }
      }

      this.show.credits = credits;
      this.show.details = details;
      this.show.recommendations = recommendations;
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

    // DONE
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

    async getTopRatedTVShows(page) {
      this.shows.isLoading = true;

      // Unload the old tv shows
      this.shows.popular = [];

      for (let i = page; i < 2 + page; i++) {
        const tvshows = await useAPIStore().getTopRatedTVAPI(i);

        for (const show in tvshows.results) {
          this.shows.popular.push(tvshows.results[show]);
        }
      }

      this.shows.isLoading = false;
    },

    async getTVGenres() {
      const genres = await useAPIStore().getTVGenres();

      this.tvGenres = genres;
    },
  },
});
