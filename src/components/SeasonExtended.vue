<template>
  <div class="relative">
    <div
      @click="openExtended = !openExtended"
      class="px-4 py-2 rounded border border-border hover:bg-backgroundSecondary cursor-pointer"
    ></div>

    <div
      v-if="openExtended"
      class="absolute w-96 bg-backgroundSecondary p-4 mt-2 z-40"
    >
      <div class="flex flex-col">
        <div class="text-2xl text-primary">{{ name }}</div>

        <div class="">{{ overview }}</div>
      </div>
    </div>

    <div class="dropdown">
      <label class="btn btn-solid-primary my-2" tabindex="0">{{
        episode_number
      }}</label>
      <div class="dropdown-menu dropdown-menu-bottom-right gap-1">
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
