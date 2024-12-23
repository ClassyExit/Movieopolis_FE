<template>
  <div v-if="movie.trailer.key" class="w-full aspect-auto">
    <LiteYouTubeEmbed
      :id="`${movie.trailer.key}`"
      :title="movie.trailer.name"
    />
  </div>
</template>

<script setup>
import LiteYouTubeEmbed from "vue-lite-youtube-embed";
import "vue-lite-youtube-embed/style.css";
import { useMovieStore } from "@/store/movies";
import { storeToRefs } from "pinia";

const movieStore = useMovieStore();

const { movie } = storeToRefs(movieStore);
</script>

<style></style>
