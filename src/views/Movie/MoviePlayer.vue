<template>
  <div class="w-full" v-if="useUserStore().permissions.canViewVideos">
    <VideoPlayer v-if="currentSource" :link="currentSource" />

    <div class="flex gap-2 mt-4">
      <button
        v-for="(link, index) in movie_links?.results || []"
        :key="index"
        @click="currentSource = link"
        class="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Source {{ index + 1 }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { useMovieStore } from "@/store/movies";
import VideoPlayer from "@/components/VideoPlayer.vue";
import { useUserStore } from "@/store/user";
import { storeToRefs } from "pinia";
import { ref, watchEffect, onMounted } from "vue";

const userStore = useUserStore();
const movieStore = useMovieStore();
const { movie_links } = storeToRefs(movieStore);

const route = useRoute();
const id = route.params.id;

const currentSource = ref(null);

onMounted(async () => {
  if (userStore.permissions?.canViewVideos) {
    await movieStore.getMovieLinks(id);
  }
});

// Update currentSource when movie_links changes
watchEffect(() => {
  if (movie_links.value?.results?.length) {
    currentSource.value = movie_links.value.results[0];
  }
});
</script>
