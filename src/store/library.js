import { defineStore } from "pinia";
import { useUserStore } from "./user";
import { useAPIStore } from "./API";

export const useLibraryStore = defineStore("Library", {
  state: () => ({
    library: [],
  }),
  persist: true,
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
      for (const item in this.data.list) {
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

    // async getListFromDB() {
    //   // Retrieve user list data
    //   if (!useUserStore().user) return console.error("User Auth Error");

    //   this.data.list = [];
    //   this.data.filteredList = [];

    //   const q = query(
    //     collection(db, `${useUserStore().user.uid}`, "UserData", "MyList")
    //   );

    //   const querySnapshot = await getDocs(q);

    //   // Push data to state
    //   querySnapshot.forEach((doc) => this.data.list.push(doc.data()));

    //   this.data.filteredList = this.data.list;
    // },
  },
});
