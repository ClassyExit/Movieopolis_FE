<template>
  <div class="max-w-7xl grid grid-cols-1 md:grid-cols-2 md:gap-3">
    <div v-if="tvVideos.length" v-for="video in tvVideos" class="">
      <LiteYouTubeEmbed :id="`${video.key}`" :title="video.name" />
    </div>
    <div class="text-content2 text-center" v-else>No available videos</div>
  </div>
</template>

<script setup>
import LiteYouTubeEmbed from "vue-lite-youtube-embed";
import "vue-lite-youtube-embed/style.css";
import { ref } from "vue";
import { useTVStore } from "@/store/tv";
import Loading from "@/components/Loading.vue";
import { storeToRefs } from "pinia";

const tvStore = useTVStore();

const { tvVideos } = storeToRefs(tvStore);
</script>
