import { defineStore } from "pinia";
import { useUserStore } from "./user";
import { useAPIStore } from "./API";

export const useLibraryStore = defineStore("Library", {
  state: () => ({
    library: [],
  }),

  getters: {},
  actions: {
    async addToLibrary(data) {
      // Add a item to users library
      /*
            item_id: Number
            title: String || null
            overview: String 
            poster: String || null
            type: Movie | TV 
        */

      // No user logged in
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
      // No user logged in
      if (!useUserStore().user) return;

      // Remove a item from  MyList
      for (const item in this.library) {
        if (this.library[item].item_id === id) {
          this.library.splice(item, 1);
        }
      }

      const data = {
        item_id: id,
      };

      const request_options = {
        method: "DELETE",
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

    async getFromLibrary() {
      // Retrieve user list data
      if (!useUserStore().user) return;

      this.library = [];

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
        const data = await useAPIStore().fetchAPI(urls, request_options);
        this.library = data;
      } catch (error) {
        console.error("Failed to get content:", error);
        return null;
      }
    },
  },
});
