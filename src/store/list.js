import { defineStore } from "pinia";
import { useUserStore } from "./user";

export const useListStore = defineStore("List", {
  state: () => ({
    list: [],
    filteredList: [],
  }),
  getters: {},
  actions: {
    async addToList(details) {
      /*
            De-contruct details: 
            ID: Number
            Title: String
            Description: String 
            Poster: String
            Type: Movie | TV 
        */

      this.list.push(details);
    },

    async removeFromList(id) {
      for (const item in this.list) {
        if (this.list[item].id === id) {
          this.list.splice(item, 1);
          return;
        }
      }
    },
  },
});
