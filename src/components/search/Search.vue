<template>
  <div class="w-full h-screen md:h-fit bg-base-100">
    <div class="relative w-full px-6 md:px-12">
      <input
        class="w-full p-2 pl-10 bg-base-300 text-base-content"
        type="search"
        placeholder="Search for movies or tv shows... "
        v-model="searchQuery"
        v-debounce:250ms="getResults"
      />

      <div class="absolute top-2.5 left-9 md:left-14">
        <Icon icon="material-symbols:search" width="20" height="20" />
      </div>
    </div>

    <div
      dev-hint="search container"
      class="w-full text-left divide-y py-2 pb-40 px-6 md:px-12 md:pb-0 h-full md:h-fit md:max-h-96 z-40 overflow-auto overscroll-none"
    >
      <div
        v-for="item in searchResults"
        :key="(item.id, item.media_type)"
        class="py-1"
      >
        <div
          v-if="item.media_type == 'movie'"
          class="w-full"
          @click="getMovieStats(item.id)"
        >
          <label for="movie-details" class="flex space-x-1 cursor-pointer">
            <Icon
              icon="material-symbols:theaters-rounded"
              width="20"
              height="20"
            /><span class="text-left line-clamp-1">{{
              item.original_title
            }}</span></label
          >
        </div>

        <div
          v-if="item.media_type == 'tv'"
          class="w-full"
          @click="getTVStates(item.id)"
        >
          <label for="tv-details" class="flex space-x-1 cursor-pointer">
            <Icon icon="ic:outline-live-tv" width="20" height="20" /><span
              class="text-left line-clamp-1"
              >{{ item.original_name }}</span
            ></label
          >
        </div>

        <div
          v-if="item.media_type == 'person'"
          class="w-full"
          @click="getTVStates(item.id)"
        >
          <div class="flex space-x-1">
            <Icon icon="material-symbols:person" width="20" height="20" /><span
              class="text-left line-clamp-1"
              >{{ item.name }}</span
            >
          </div>
        </div>
      </div>

      <div
        v-if="!searchResults.length && searchQuery.length"
        class="py-2 text-lg text-error"
      >
        No Results
      </div>
    </div>
  </div>

  <TVDetails />
  <MovieDetails />
</template>

<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useSearchStore } from "@/store/search";
import { useMovieStore } from "@/store/movies";
import { useTVStore } from "@/store/tv";
import TVDetails from "../TV/TVDetails.vue";
import MovieDetails from "../Movie/MovieDetails.vue";

const searchStore = useSearchStore();

const { searchResults } = storeToRefs(searchStore);

const searchQuery = ref("");

const getResults = () => {
  searchStore.getSearch(searchQuery);
};

const getTVStates = (tv_id) => {
  useTVStore().getTVDetails(tv_id);
};

const getMovieStats = (movie_id) => {
  useMovieStore().getMovieDetails(movie_id);
};
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
