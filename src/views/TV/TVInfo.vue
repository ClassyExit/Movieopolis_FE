<template>
  <div
    class="flex flex-col md:flex-row items-center w-full bg-base-300 p-4 md:p-6 rounded-lg shadow-lg space-y-4 md:space-y-0 md:space-x-6 transition hover:shadow-xl"
  >
    <!-- Movie Poster -->
    <img
      v-if="show.results.details.poster_path"
      class="hidden md:block rounded-lg shadow-md"
      :src="`https://image.tmdb.org/t/p/w154/${show.results.details.poster_path}`"
      :alt="title"
      style="width: 154px; height: 231px"
    />

    <!-- Movie Details -->
    <div class="w-full flex flex-col text-left space-y-4">
      <div class="flex flex-col justify-between space-y-1">
        <!-- Movie Title -->
        <div class="text-2xl md:text-3xl font-bold text-primary">
          {{ show.results.details.name }}
        </div>
        <span
          v-if="show.results.details.vote_average"
          class="flex w-fit items-center bg-accent text-accent-content px-2 py-1 text-xs font-semibold rounded-md"
        >
          ⭐ {{ show.results.details.vote_average.toFixed(1) }}
        </span>
      </div>

      <!-- Action Options + Rating -->
      <div class="flex flex-row items-center space-x-2">
        <div class="flex items-center space-x-4">
          <TVTrailer />
          <AddToList
            :id="show.results.details.id"
            :poster="show.results.details.poster_path"
            :title="show.results.details.name"
            :type="`tv`"
            :overview="show.results.details.overview"
          />
          <TVReviews />
        </div>
      </div>

      <!-- Overview -->
      <div
        class="text-sm md:text-lg text-content-base opacity-90 leading-relaxed"
      >
        {{ show.results.details.overview }}
      </div>

      <div class="overflow-auto flex flex-row md:flex-wrap gap-2 mt-2">
        <span
          v-for="genre in show.results.details.genres"
          :key="genre.id"
          class="bg-primary/80 px-3 py-1 rounded-full text-sm"
        >
          {{ genre.name }}
        </span>
      </div>

      <!-- Movie Info -->
      <div class="w-full flex flex-col gap-2 text-sm">
        <div class="space-y-1">
          <div class="flex flex-row space-x-2">
            <span class="font-semibold text-base-content">Released:</span>
            <span>{{ formatDate(show.results.details.first_air_date) }}</span>
          </div>

          <div class="flex flex-row space-x-2 items-center">
            <span class="font-semibold text-base-content">Networks:</span>
            <div class="flex flex-row space-x-2 overflow-x-auto flex-nowrap">
              <span
                v-for="item in show.results.details.networks"
                :key="item.id"
                class="bg-gray-700 text-white px-2 py-1 rounded-md whitespace-nowrap"
              >
                {{ item.name }}
              </span>
            </div>
          </div>

          <div class="flex flex-row space-x-2 items-center">
            <span class="font-semibold text-base-content">Cast:</span>
            <div class="flex flex-row space-x-2 overflow-x-auto flex-nowrap">
              <span
                v-for="person in computeCastLimit"
                :key="person.id"
                class="w-fit bg-gray-700 text-white px-2 py-1 rounded-md whitespace-nowrap"
              >
                {{ person.name }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useTVStore } from "@/store/tv";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import AddToList from "@/components/Actions/AddToList.vue";
import TVReviews from "./TVReviews.vue";
import TVTrailer from "./TVTrailer.vue";

const tvStore = useTVStore();
const { show } = storeToRefs(tvStore);

function formatDate(dateString) {
  if (!dateString) return "Unknown";
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

const computeCastLimit = computed(() => {
  return show.value?.results?.credits?.cast?.slice(0, 5) || [];
});
</script>
