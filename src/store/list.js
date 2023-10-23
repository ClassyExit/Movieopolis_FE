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

export const useListStore = defineStore("List", {
  state: () => ({
    list: [],
    filteredList: [],
  }),
  persist: true,
  getters: {},
  actions: {
    async addToList(data) {
      // Add a item to users MyList
      /*
            De-contruct details: 
            ID: Number
            Title: String
            Description: String 
            Poster: String
            Type: Movie | TV 
        */

      this.list.push(data);
      this.filteredList.push(data);

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
        } else {
          // Upload Data
          await setDoc(itemRef, data);
        }
      } catch (err) {
        console.log(err);
      }
    },

    async removeFromList(id) {
      // Remove a item from  MyList
      for (const item in this.list) {
        if (this.list[item].id === id) {
          this.list.splice(item, 1);
        }
      }

      // Remove from filteredList if active
      if (this.filteredList.length > 0) {
        for (const item in this.filteredList) {
          if (this.filteredList[item].id === id) {
            this.filteredList.splice(item, 1);
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

      const q = query(
        collection(db, `${useUserStore().user.uid}`, "UserData", "MyList")
      );

      const querySnapshot = await getDocs(q);

      // Push data to state
      querySnapshot.forEach((doc) => this.list.push(doc.data()));
    },

    filterResults(option) {
      const supportedOptions = ["all", "tv", "movie"];

      if (!option in supportedOptions) return;

      if (option == "all") {
        this.filteredList = this.list;
      } else {
        this.filteredList = this.list.filter((item) => item.type == option);
      }
    },
  },
});
