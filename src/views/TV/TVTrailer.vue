<template>
  <div v-if="show.trailer.key" class="w-full aspect-auto">
    <LiteYouTubeEmbed :id="`${show.trailer.key}`" :title="show.trailer.name" />
  </div>
</template>

<script setup>
import LiteYouTubeEmbed from "vue-lite-youtube-embed";
import "vue-lite-youtube-embed/style.css";
import { useTVStore } from "@/store/tv";
import { storeToRefs } from "pinia";

const tvStore = useTVStore();

const { show } = storeToRefs(tvStore);
</script>

<style></style>
