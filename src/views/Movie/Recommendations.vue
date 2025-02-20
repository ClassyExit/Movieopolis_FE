<template>
  <div
    aria-label="recommendations"
    class="flex flex-col rounded-xl bg-base-300 p-2"
  >
    <div class="text-primary text-2xl text-left">Recommendations</div>
    <div class="overflow-auto h-fit">
      <div
        v-if="movie.results.recommendations.results.length"
        class="w-full flex md:flex-wrap gap-2"
      >
        <Container
          v-for="item in movie.results.recommendations.results"
          :key="item.id"
          :id="item.id"
          :poster="item.poster_path"
          :title_movie="item.title"
          :year_movie="item.release_date"
          :rating="item.vote_average"
          :type="`movie`"
          :listView="false"
          :overview="item.overview"
        >
        </Container>
      </div>

      <div v-else class="alert alert shadow">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="stroke-primary h-6 w-6 shrink-0"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <div>
          <h3 class="font-bold">Unable to get recommendations</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useMovieStore } from "@/store/movies";
import { storeToRefs } from "pinia";
import Container from "@/components/Containers/Container.vue";

const movieStore = useMovieStore();

const { movie } = storeToRefs(movieStore);
</script>
