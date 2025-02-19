import { defineStore } from "pinia";
import { useUserStore } from "./user";
import { useAPIStore } from "./API";

export const useLibraryStore = defineStore("Library", {
  state: () => ({
    library: [],
  }),

  actions: {
    async addToLibrary(data) {
      /*
            item_id: Number
            title: String || null
            overview: String 
            poster: String || null
            type: Movie | TV 
        */

      if (!useUserStore().user) return;

      this.library.push(data);

      const request_options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          uid: useUserStore().user.uid,
        },
        body: JSON.stringify(data),
      };

      const urls = [
        `https://tmdb-backend.herokuapp.com/api/list`,
        `https://tmdb-backend.autoidleapp.com/api/list`,
      ];

      try {
        const data = await useAPIStore().fetchAPI(urls, request_options);
        return data;
      } catch (error) {
        console.error("Failed to get content:", error);
        return null;
      }
    },

    async removeFromLibrary(id) {
      // Delete a item from users library
      /*
            item_id: Number
      */

      if (!useUserStore().user) return;

      if (!Array.isArray(this.library)) {
        this.library = [];
      }

      // Find the index and remove the item safely
      const index = this.library.findIndex((item) => item.item_id === id);
      if (index !== -1) this.library.splice(index, 1);

      const request_options = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          uid: useUserStore().user.uid,
        },
        body: JSON.stringify({ item_id: id }),
      };

      const urls = [
        `https://tmdb-backend.herokuapp.com/api/list`,
        `https://tmdb-backend.autoidleapp.com/api/list`,
      ];

      try {
        const response = await useAPIStore().fetchAPI(urls, request_options);
        return response;
      } catch (error) {
        console.error("Failed to remove content:", error);
        return null;
      }
    },

    async getLibrary() {
      if (!useUserStore().user) return;

      this.library = []; // Reset before fetching

      const request_options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          uid: useUserStore().user.uid,
        },
      };

      const urls = [
        `https://tmdb-backend.herokuapp.com/api/list`,
        `https://tmdb-backend.autoidleapp.com/api/list`,
      ];

      try {
        const data = await useAPIStore()
          .fetchAPI(urls, request_options)
          .then((response) => this.library.push(...response.results));
      } catch (error) {
        console.error("Failed to get content:", error);
        this.library = []; // Ensure it remains an array
      }
    },
  },
});
