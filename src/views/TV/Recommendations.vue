<template>
  <div
    aria-label="recommendations"
    class="flex flex-col space-y-2 bg-base-300 p-2 rounded"
  >
    <div class="text-primary text-2xl text-left">Recommendations</div>
    <div class="overflow-auto h-fit">
      <div
        v-if="show.results.recommendations.results.length"
        class="w-full flex md:flex-wrap gap-2"
      >
        <Container
          v-for="item in show.results.recommendations.results"
          :key="item.id"
          :id="item.id"
          :poster="item.poster_path"
          :title_tv="item.original_name"
          :year_tv="item.first_air_date"
          :rating="item.vote_average"
          :type="`tv`"
          :listView="false"
        >
        </Container>
      </div>

      <div v-else class="alert alert shadow">
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
          <h3 class="font-bold">Unable to get recommendations</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useTVStore } from "@/store/tv";
import { storeToRefs } from "pinia";
import Container from "@/components/Containers/Container.vue";

const tvStore = useTVStore();

const { show } = storeToRefs(tvStore);
</script>
