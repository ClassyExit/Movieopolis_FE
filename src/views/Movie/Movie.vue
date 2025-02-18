<template>
  <div class="w-full space-y-2">
    <div
      class="w-full flex text-2xl md:text-4xl text-base-content pb-8 space-x-4 md:space-x-0"
    >
      <MobileReturn />
      <span> Popular Movies </span>
    </div>

    <div v-if="movies.isLoading" class="skeleton h-64">
      <!-- <Loading /> -->
    </div>
    <div
      v-else
      class="flex justify-center gap-4 md:gap-2 md:justify-start flex-wrap"
    >
      <Container
        v-for="item in movies.popular"
        :key="(item.id, item.media_type)"
        :id="item.id"
        :poster="item.poster_path"
        :title_movie="item.original_title"
        :year_movie="item.release_date"
        :rating="item.vote_average"
        :media_type="`movie`"
        :listView="false"
        :overview="item.overview"
      >
      </Container>
    </div>

    <div class="join py-4 pb-8">
      <button @click="loadMovies(prevPage)" class="join-item btn">«</button>
      <button class="join-item btn">{{ currentPage }}</button>
      <button @click="loadMovies(nextPage)" class="join-item btn">»</button>
    </div>
  </div>
</template>

<script setup>
import { useMovieStore } from "@/store/movies";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import Container from "@/components/Container.vue";
import MobileReturn from "@/components/Actions/MobileReturn.vue";

const movieStore = useMovieStore();

const { movies } = storeToRefs(movieStore);

// Pagination
let currentPage = ref(1);
let nextPage = ref(currentPage.value + 1);
let prevPage = ref(currentPage.value - 1);

// Load initial batch unless already populated
if (!movieStore.movies.popular.length) {
  movieStore.getPopularMovies(currentPage.value);
}

const loadMovies = (page) => {
  if (page < 1) {
    // Can't load below 1
    return;
  }

  // Pagination - load movies
  movieStore.getPopularMovies(page);

  // Update pages
  currentPage.value = page;
  nextPage.value = currentPage.value + 1;
  prevPage.value = currentPage.value - 1;

  // Disable previous button if current page is 1
};
</script>
