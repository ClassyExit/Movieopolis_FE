<template>
  <div @click="expandedView">
    <div v-if="expand" class="card bg-base-300 w-full shadow-xl">
      <div class="card-body">
        <h2 class="card-title text-left">{{ name }}</h2>
        <div class="text-left text-sm text-gray-500">
          {{ overview }}
        </div>
      </div>
    </div>
    <div
      v-else
      class="p-3 w-12 flex items-center justify-center bg-base-300 rounded"
    >
      {{ episodeNumber }}
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  id: Number,
  name: String,
  overview: String,
  episodeNumber: Number,
  cantExpand: Boolean,
});

const expand = ref(false);

const expandedView = () => {
  // If user can view videos, limit expansion of cards
  if (props.cantExpand) return;

  expand.value = !expand.value;
};
</script>
