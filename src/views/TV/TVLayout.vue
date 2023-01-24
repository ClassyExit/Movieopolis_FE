<template>
  <div class="w-full h-sceen">
    <div v-if="tvStore.isLoadingPopular" class=""><Loading /></div>

    <div
      v-else
      class="grid grid-cols-2 place-items-center md:flex md:flex-wrap gap-1"
    >
      <div
        v-for="item in popularTVShows"
        :key="item.id"
        @click="getTVStates(item.id)"
        class="md:hover:scale-110"
      >
        <label for="tv-details" class="cursor-pointer"
          ><img
            :src="`https://image.tmdb.org/t/p/w154/${item.poster_path}`"
            style="width: 156px; height: 225px"
        /></label>
      </div>
    </div>
  </div>

  <TVDetails />
</template>

<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useTVStore } from "@/store/tv";
import TVDetails from "@/components/TV/TVDetails.vue";
import Loading from "@/components/Loading.vue";

const tvStore = useTVStore();

const { popularTVShows } = storeToRefs(tvStore);

tvStore.popularTVShows = [];

let page = ref(1);

// Get first three pages of tv shows to show
const showLoading = true;
tvStore.getPopularTVShows((page = 1), showLoading);
tvStore.getPopularTVShows((page = 2), showLoading);
tvStore.getPopularTVShows((page = 3), showLoading);

page = 4;

const getTVStates = (tv_id) => {
  tvStore.getTVDetails(tv_id);
};

/***** Infinite scroll *****/
/* Adds more shows when at the bottom of the viewport */
const showLoadingIcon = false; // Show the loading icon -> If true, it refreshes page and starts user at top
window.addEventListener("scroll", () => {
  if (
    window.scrollY + window.innerHeight >=
    document.documentElement.scrollHeight - 10
  ) {
    tvStore.getPopularTVShows(page, showLoadingIcon);
    page = page + 1;
  }
});
</script>

<style scoped>
img:before {
  content: " ";
  background-image: url("@/assets/images/no-image.jpg");
  display: block;
  width: 156px;
  height: 225px;
}
</style>
