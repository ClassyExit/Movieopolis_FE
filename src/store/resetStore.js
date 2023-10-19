import { getActivePinia } from "pinia";

/* Cycle through each store and reset them  */
export const resetStore = () => {
  getActivePinia()._s.forEach((store) => store.$reset());
};
