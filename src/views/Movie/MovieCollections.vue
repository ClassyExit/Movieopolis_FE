<template>
  <div
    v-if="Object.keys(movie.collections) != 0"
    class="flex flex-col rounded text-left space-y-2"
  >
    <span class="text-base-content text-2xl">
      {{ movie.collections.name }}
    </span>

    <div class="flex overflow-auto md:flex-wrap gap-2 scroll-container">
      <Container
        v-for="item in movie.collections.parts"
        :key="item.id"
        :id="item.id"
        :poster="item.poster_path"
        :title="item.title || item.name"
        :year="item.release_date || item.first_air_date"
        :rating="item.vote_average"
        :overview="item.overview"
        :type="'movie'"
      >
      </Container>
    </div>
  </div>
</template>

<script setup>
import { useMovieStore } from "@/store/movies";
import Container from "@/components/Containers/Container.vue";
import { storeToRefs } from "pinia";

const movieStore = useMovieStore();

const { movie } = storeToRefs(movieStore);
</script>
