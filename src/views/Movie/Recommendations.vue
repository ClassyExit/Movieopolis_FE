<template>
  <div
    aria-label="recommendations"
    class="flex flex-col max-w-7xl rounded-xl p-2"
  >
    <div class="overflow-auto h-fit md:h-full md:max-h-[60rem]">
      <div
        v-if="movieRecommendations.results.length"
        class="w-full flex md:flex-wrap gap-2"
      >
        <Container
          v-for="item in movieRecommendations.results"
          :key="item.id"
          :id="item.id"
          :poster="item.poster_path"
          :title_movie="item.title"
          :year_movie="item.release_date"
          :rating="item.vote_average"
          :media_type="`movie`"
          :type="item.media_type"
          :listView="isListView"
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
import Container from "@/components/Container.vue";

const movieStore = useMovieStore();

const { movieRecommendations } = storeToRefs(movieStore);
</script>
