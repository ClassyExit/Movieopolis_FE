<template>
  <div class="w-full md:h-fit bg-base-100">
    <div class="relative w-full max-w-sm">
      <input
        class="w-full p-2 pl-8 bg-base-300 md:bg-base-100 text-base-content rounded"
        type="search"
        placeholder="Search movies, tv shows... "
        v-model="searchQuery"
        v-debounce:1500ms="getResults"
      />

      <div class="absolute top-2.5 left-2 md:left-2">
        <Icon icon="material-symbols:search" width="20" height="20" />
      </div>
    </div>

    <div
      class="md:absolute flex flex-row menu md:border border-primary bg-base-100 md:pr-0 max-w-sm md:max-w-sm w-full rounded z-50 mt-2 h-full md:h-fit md:max-h-96 z-50 gap-2 overflow-auto overscroll-auto"
      :class="searchQuery.length == 0 ? 'hidden' : ' '"
    >
      <SearchContainer
        v-for="item in searchResults"
        :key="(item.id, item.media_type)"
        :poster="`https://image.tmdb.org/t/p/w92/${item.poster_path}`"
        :title_movie="item.title"
        :title_tv="item.name"
        :year_tv="item.first_air_date"
        :year_movie="item.release_date"
        :rating="item.vote_average"
        :media_type="item.media_type"
        :label="item.media_type == 'movie' ? 'movie-details' : 'tv-details'"
        @click="
          item.media_type == 'movie'
            ? getMovieStats(item.id)
            : getTVStats(item.id)
        "
      />
    </div>
  </div>

  <TVModal />
  <MovieModal />
</template>

<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useSearchStore } from "@/store/search";
import { useMovieStore } from "@/store/movies";
import { useTVStore } from "@/store/tv";
import TVModal from "@/components/TVModal.vue";
import MovieModal from "@/components/MovieModal.vue";

import SearchContainer from "./SearchContainer.vue";

const searchStore = useSearchStore();

const { searchResults } = storeToRefs(searchStore);

const searchQuery = ref("");

const getResults = () => {
  searchStore.getSearch(searchQuery);
};

const getTVStats = (tv_id) => {
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
