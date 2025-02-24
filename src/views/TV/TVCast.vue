<template>
  <div
    v-if="show.results.credits.cast.length"
    aria-label="show-cast"
    class="flex flex-col space-y-2 rounded text-left"
  >
    <div class="text-base-content text-2xl">Cast</div>

    <div class="overflow-x-auto flex gap-1 scroll-container">
      <CastTemplate
        v-for="person in show.results.credits.cast"
        :key="person.id"
        :id="person.id"
        :name="person.name"
        :character="person.character"
        :profile_path="person.profile_path"
      />
    </div>
  </div>
</template>

<script setup>
import { useTVStore } from "@/store/tv";
import { storeToRefs } from "pinia";
import CastTemplate from "@/components/CastTemplate.vue";

const tvStore = useTVStore();

const { show } = storeToRefs(tvStore);
</script>
