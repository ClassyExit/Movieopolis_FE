<template>
  <div aria-label="recommendations" class="flex flex-col rounded-xl">
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
          :media_type="`movie`"
          :type="item.media_type"
          :listView="false"
          :overview="item.overview"
        >
        </Container>
      </div>

      <div v-else>Sorry, unable to get recommendations</div>
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
