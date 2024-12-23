<template>
  <div class="w-full max-w-7xl">
    <div
      v-if="show.videos.length"
      class="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-3"
    >
      <div v-for="video in show.videos">
        <div class="text-content1 text-lg text-left">{{ video.name }}</div>
        <LiteYouTubeEmbed :id="`${video.key}`" :title="video.name" />
      </div>
    </div>
    <div class="w-full text-content2 items-center pt-8 pb-8" v-else>
      No available videos
    </div>
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
