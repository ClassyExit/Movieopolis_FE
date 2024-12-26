<template>
  <div class="">
    <div
      @click="openExtended = !openExtended"
      class="px-4 py-2 rounded border border-border cursor-pointer"
      :class="
        openExtended
          ? 'w-96 bg-backgroundSecondary'
          : 'w-16 hover:bg-backgroundSecondary'
      "
    >
      {{ episode_number }}
      <div v-if="openExtended" class="p-2">
        <div class="flex flex-col">
          <div class="text-2xl text-primary">{{ name }}</div>

          <div class="">{{ overview }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const openExtended = ref(false);

const props = defineProps({
  id: Number,
  episode_number: Number,
  overview: String,
  runtime: Number,
  name: String,
});
</script>

<style></style>
