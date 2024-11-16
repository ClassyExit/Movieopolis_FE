<template>
  <div v-if="tvTrailer.key" class="w-full aspect-auto">
    <LiteYouTubeEmbed :id="`${tvTrailer.key}`" :title="tvTrailer.name" />
  </div>
</template>

<script setup>
import LiteYouTubeEmbed from "vue-lite-youtube-embed";
import "vue-lite-youtube-embed/style.css";
import { useTVStore } from "@/store/tv";
import { storeToRefs } from "pinia";

const tvStore = useTVStore();

const { tvTrailer } = storeToRefs(tvStore);
</script>

<style></style>
