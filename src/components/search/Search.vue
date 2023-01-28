<template>
  <div class="relative h-screen md:h-fit">
    <div class="form-control relative px-6">
      <div class="input-group pb-2 md:pb-0">
        <input
          type="text"
          placeholder="Search..."
          class="w-full md:w-80 bg-base-200 pl-2 relative"
          v-model="query"
        />
        <div
          class="hidden md:block absolute right-20 cursor-pointer top-3 text-error"
          v-if="query || searchResults.length"
          @click="
            searchStore.searchResults = [];
            query = '';
          "
        >
          X
        </div>
        <button
          class="btn btn-square"
          @click="getResults(query)"
          aria-label="Search"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
    </div>

    <div
      class="absolute w-full h-full md:h-fit md:max-h-96 z-50 overflow-auto overscroll-none bg-base-100 grid grid-cols-2 gap-2 place-items-center px-4 pb-36 md:pb-0 md:py-2"
    >
      <div
        v-for="item in searchResults"
        :key="(item.id, item.media_type)"
        class="md:py-1"
      >
        <div
          v-if="item.media_type == 'movie'"
          class="w-full"
          @click="getMovieStats(item.id)"
        >
          <label for="movie-details" class="cursor-pointer"
            ><img
              :src="`https://image.tmdb.org/t/p/w154/${item.poster_path}`"
              style="width: 156px; height: 225px"
          /></label>
          <span class="text-left line-clamp-1">{{ item.original_title }}</span>
        </div>

        <div
          v-if="item.media_type == 'tv'"
          class="w-full"
          @click="getTVStates(item.id)"
        >
          <label for="tv-details" class="cursor-pointer"
            ><img
              :src="`https://image.tmdb.org/t/p/w154/${item.poster_path}`"
              style="width: 156px; height: 225px"
          /></label>
          <span class="text-left line-clamp-1">{{ item.original_name }}</span>
        </div>
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

const query = ref("");

const getResults = () => {
  searchStore.getSearch(query);
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
