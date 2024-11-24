<template>
  <div
    aria-label="recommendations"
    class="flex flex-col rounded-xl max-w-7xl p-2 h-fit"
  >
    <div class="overflow-auto">
      <div
        v-if="tvRecommendations.results.length"
        class="w-full flex md:flex-wrap gap-2"
      >
        <Container
          v-for="item in tvRecommendations.results"
          :key="item.id"
          :id="item.id"
          :poster="item.poster_path"
          :title_tv="item.original_name"
          :year_tv="item.first_air_date"
          :rating="item.vote_average"
          :media_type="`tv`"
          :type="item.media_type"
        >
        </Container>
      </div>

      <div v-else class="">Sorry, unable to get recommendations</div>
    </div>
  </div>
</template>

<script setup>
import { useTVStore } from "@/store/tv";

import { storeToRefs } from "pinia";
import Container from "@/components/Container.vue";

const tvStore = useTVStore();
const { tvRecommendations } = storeToRefs(tvStore);
</script>
