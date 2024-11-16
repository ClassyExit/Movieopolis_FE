<template>
  <div v-if="movieTrailer.key" class="w-full aspect-auto">
    <LiteYouTubeEmbed :id="`${movieTrailer.key}`" :title="movieTrailer.name" />
  </div>
</template>

<script setup>
import LiteYouTubeEmbed from "vue-lite-youtube-embed";
import "vue-lite-youtube-embed/style.css";
import { useMovieStore } from "@/store/movies";
import { storeToRefs } from "pinia";

const movieStore = useMovieStore();

const { movieTrailer } = storeToRefs(movieStore);
</script>

<style></style>
