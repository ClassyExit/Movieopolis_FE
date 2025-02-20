import { getActivePinia } from "pinia";
import { useUserStore } from "@/store/user";
import { useLibraryStore } from "@/store/library";

/* Cycle through each store and reset them  */
export const resetStore = () => {
  getActivePinia()._s.forEach((store) => store.$reset());
};

/* Reset the user data */
export const RESET_USER_DATA = () => {
  const userStore = useUserStore();
  const libraryStore = useLibraryStore();

  userStore.$reset(); // Reset only user-related data
  libraryStore.$reset(); // Reset library-related data
};
