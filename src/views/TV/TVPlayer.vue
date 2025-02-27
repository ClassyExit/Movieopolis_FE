<template>
  <div class="w-full" v-if="userStore.permissions?.canViewVideos">
    <VideoPlayer v-if="currentSource" :link="currentSource" />

    <div class="flex gap-2 mt-4">
      <button
        v-for="(link, index) in show_links?.links?.results || []"
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
import { useTVStore } from "@/store/tv";
import VideoPlayer from "@/components/VideoPlayer.vue";
import { useUserStore } from "@/store/user";
import { storeToRefs } from "pinia";
import { ref, watchEffect, onMounted, watch } from "vue";

const userStore = useUserStore();
const tvStore = useTVStore();
const { show_links } = storeToRefs(tvStore);

const route = useRoute();
const id = route.params.id;

const currentSource = ref("");

onMounted(async () => {
  if (userStore.permissions?.canViewVideos) {
    await tvStore.getShowLinks(id, 1, 1);
  }
});

watchEffect(() => {
  if (show_links?.links?.results?.length) {
    currentSource.value = show_links.links.results[0];
  }
});

watch(
  () => show_links.value, // Watch the entire show_links object
  (newLinks) => {
    console.log("Show links updated:", newLinks);
    if (newLinks?.links?.results?.length) {
      currentSource.value = newLinks.links.results[0]; // Update currentSource when new links arrive
    }
  },
  { deep: true } // Ensures nested properties are watched
);
</script>
