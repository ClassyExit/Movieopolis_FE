<template>
  <div
    v-if="movie.results.credits.cast.length"
    aria-label="recommendations"
    class="flex flex-col space-y-2 p-2 rounded text-left"
  >
    <span class="text-base-content text-2xl"> Cast </span>
    <div class="overflow-auto h-fit">
      <div v-if="movie.results.credits.cast.length" class="w-full flex gap-2">
        <CastTemplate
          v-for="person in movie.results.credits.cast"
          :id="person.id"
          :name="person.name"
          :character="person.character"
          :profile_path="person.profile_path"
        ></CastTemplate>
      </div>
    </div>
  </div>
</template>

<script setup>
import CastTemplate from "@/components/CastTemplate.vue";
import { useMovieStore } from "@/store/movies";
import { storeToRefs } from "pinia";

const { movie } = storeToRefs(useMovieStore());
</script>
