import { defineStore } from "pinia";
import { useUserStore } from "./user";

import {
  collection,
  setDoc,
  doc,
  query,
  getDocs,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "@/firebase/index";

export const useLibraryStore = defineStore("Library", {
  state: () => ({
    data: {
      list: [],
      filteredList: [],
    },
  }),
  persist: true,
  getters: {},
  actions: {
    async addToList(data) {
      // Add a item to users MyList
      /*
            De-contruct details: 
            ID: Number
            Title: String || null
            Overview: String 
            Poster: String || null
            Type: Movie | TV 
        */

      // No user logged in
      if (!useUserStore().user) return;

      this.data.list.push(data);
      this.data.filteredList = this.data.list;

      try {
        // Set Ref point
        const itemRef = doc(
          db,
          `${useUserStore().user.uid}`,
          "UserData",
          "MyList",
          `${data.id}`
        );

        // See if document exists
        const itemSnap = await getDoc(itemRef);

        if (itemSnap.exists()) {
          //pass
        } else {
          // Upload Data
          await setDoc(itemRef, {
            id: data.id,
            title: data.title || null,
            overview: data.overview || null,
            poster: data.poster || null,
            type: data.type || null,
          });
        }
      } catch (err) {
        console.log(err);
      }
    },

    async removeFromList(id) {
      // No user logged in
      if (!useUserStore().user) return;

      // Remove a item from  MyList
      for (const item in this.data.list) {
        if (this.data.list[item].id === id) {
          this.data.list.splice(item, 1);
        }
      }

      // Remove from filteredList if active
      if (this.data.filteredList.length > 0) {
        for (const item in this.data.filteredList) {
          if (this.data.filteredList[item].id === id) {
            this.data.filteredList.splice(item, 1);
          }
        }
      }

      //Update in DB
      try {
        // Find Ref to doc
        const itemRef = doc(
          db,
          `${useUserStore().user.uid}`,
          "UserData",
          "MyList",
          `${id}`
        );

        const itemSnap = await getDoc(itemRef);

        if (!itemSnap.exists()) {
          // If item does not exits, exit
          console.error("Error: can't find requested data");
        } else {
          await deleteDoc(itemRef);
        }
      } catch (err) {
        console.error(err);
      }
    },

    async getListFromDB() {
      // Retrieve user list data
      if (!useUserStore().user) return console.error("User Auth Error");

      this.data.list = [];
      this.data.filteredList = [];

      const q = query(
        collection(db, `${useUserStore().user.uid}`, "UserData", "MyList")
      );

      const querySnapshot = await getDocs(q);

      // Push data to state
      querySnapshot.forEach((doc) => this.data.list.push(doc.data()));

      this.data.filteredList = this.data.list;
    },

    filterResults(option) {
      const supportedOptions = ["all", "tv", "movie"];

      if (!option in supportedOptions) return;

      if (option == "all") {
        this.data.filteredList = this.data.list;
      } else {
        this.data.filteredList = this.data.list.filter(
          (item) => item.type == option
        );
      }
    },
  },
});
