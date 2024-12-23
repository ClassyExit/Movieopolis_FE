<template>
  <div
    class="flex flex-col bg-backgroundPrimary rounded w-full space-y-4 max-w-7xl"
  >
    <div class="flex justify-end w-full px-6">
      <select
        v-model="season_select"
        @change="getSeasonDetails(tv_id, season_select)"
        class="select"
      >
        <option
          :key="season.id"
          v-for="season in show.details.seasons"
          :value="season.season_number"
        >
          {{ season.name }} ({{ season.episode_count }})
        </option>
      </select>
    </div>
    <div v-if="show.isLoading.isLoadingSeason" class=""><Loading /></div>
    <div v-else class="w-full max-h-[40rem] overflow-auto">
      <div
        v-for="episode in show.seasonDetails.episodes"
        class="flex flex-row p-4 items-center w-full hover:bg-backgroundSecondary border-b border-border"
      >
        <div class="px-4 text-xl text-content2">
          {{ episode.episode_number }}
        </div>

        <div class="w-full flex flex-col text-left">
          <div class="flex flex-row justify-between text-lg pb-2">
            <div class="">{{ episode.name }}</div>
            <div class="text-lg">{{ episode.runtime }}m</div>
          </div>

          <div class="text-sm text-content2">{{ episode.overview }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useTVStore } from "@/store/tv";
import { useRoute } from "vue-router";
import Loading from "@/components/Loading.vue";
import { storeToRefs } from "pinia";

const tvStore = useTVStore();
const { show } = storeToRefs(tvStore);

const route = useRoute();
const tv_id = route.params.id;

let season_select = ref(1);

const getSeasonDetails = (tv_id, season_select) => {
  tvStore.getTVSeasonDetails(tv_id, season_select);
};

// Get intial season data
getSeasonDetails(tv_id, season_select);
</script>
