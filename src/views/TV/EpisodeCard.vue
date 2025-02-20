<template>
  <div @click="expandedView = !expandedView">
    <div v-if="expandedView" class="card bg-base-300 w-full shadow-xl">
      <div class="card-body">
        <h2 class="card-title text-left">{{ props.name }}</h2>

        <div class="text-left text-sm text-gray-500">
          {{ props.overview }}
        </div>
      </div>
    </div>
    <div
      v-else
      class="p-3 w-12 flex items-center justify-center bg-base-300 rounded"
    >
      {{ props.episodeNumber }}
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps } from "vue";

const props = defineProps({
  id: Number,
  name: String,
  overview: String,
  episodeNumber: Number,
});

const expandedView = ref(false);
</script>
