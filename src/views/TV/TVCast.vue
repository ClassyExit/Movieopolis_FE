<template>
  <div class="w-full flex flex-row md:flex-wrap overflow-auto scrollbar-hide">
    <div
      v-if="!show.results.credits.cast.length"
      class="alert alert-shadow text-left"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        class="stroke-primary h-6 w-6 shrink-0"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
      <div>
        <h3 class="font-bold">Unable to get cast</h3>
      </div>
    </div>

    <div v-else v-for="person in show.results.credits.cast" class="">
      <CastTemplate
        :id="person.id"
        :name="person.name"
        :character="person.character"
        :profile_path="person.profile_path"
      />
    </div>
  </div>
</template>

<script setup>
import CastTemplate from "@/components/CastTemplate.vue";
import { useTVStore } from "@/store/tv";
import { storeToRefs } from "pinia";

const { show } = storeToRefs(useTVStore());
</script>
