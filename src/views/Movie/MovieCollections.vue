<template>
  <div
    v-if="Object.keys(movie.collections) != 0"
    class="flex flex-col bg-base-300 p-2 rounded"
  >
    <div class="text-primary text-2xl text-left">
      {{ movie.collections.name }}
    </div>
    <div class="flex overflow-auto md:flex-wrap gap-2">
      <Container
        v-for="item in movie.collections.parts"
        :key="item.id"
        :id="item.id"
        :poster="item.poster_path"
        :title_movie="item.original_title"
        :year_movie="item.release_date"
        :rating="item.vote_average"
        :media_type="`movie`"
        :type="item.media_type"
        :listView="false"
        :overview="item.overview"
      >
      </Container>
    </div>
  </div>
</template>

<script setup>
import { useMovieStore } from "@/store/movies";
import { storeToRefs } from "pinia";
import Container from "@/components/Containers/Container.vue";

const movieStore = useMovieStore();

const { movie } = storeToRefs(movieStore);

movieStore.getCollections();
</script>
