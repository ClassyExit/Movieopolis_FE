<template>
  <div class="flex flex-col">
    <div class="text-left text-xl text-content2">
      {{ movieCollections.name }}
    </div>

    <div class="flex overflow-auto md:flex-wrap gap-2">
      <Container
        v-for="item in movieCollections.parts"
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
import { useRoute } from "vue-router";
import { useMovieStore } from "@/store/movies";
import { storeToRefs } from "pinia";
import Container from "@/components/Container.vue";

const movieStore = useMovieStore();

const { movieCollections } = storeToRefs(movieStore);

const route = useRoute();
const id = route.params.id; // read movie id from router

// Get the collection
movieStore.getCollections(
  useMovieStore().movieDetails.belongs_to_collection.id
);
</script>
