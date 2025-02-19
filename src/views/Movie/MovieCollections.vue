<template>
  <div class="flex flex-col">
    <div class="text-left text-xl text-content2"></div>

    <div
      v-if="Object.keys(movie.collections) != 0"
      class="flex overflow-auto md:flex-wrap gap-2"
    >
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

    <div v-else class="">
      <div class="alert alert-shadow text-left">
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
          <h3 class="font-bold">There are no collections for this movie</h3>
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

movieStore.getCollections();
</script>
