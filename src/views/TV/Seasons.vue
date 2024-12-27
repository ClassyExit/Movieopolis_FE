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
    <div
      v-else
      class="flex flex-row flex-wrap justify-center gap-2 md:gap-2 md:justify-start w-full h-96"
    >
      <div v-for="episode in show.seasonDetails.episodes">
        <SeasonExtended
          :id="episode.season_number + episode.runtime"
          :episode_number="episode.episode_number"
          :overview="episode.overview"
          :runtime="episode.runtime"
          :name="episode.name"
        >
        </SeasonExtended>
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
import SeasonExtended from "@/components/SeasonExtended.vue";

const tvStore = useTVStore();
const { show } = storeToRefs(tvStore);

const route = useRoute();
const tv_id = route.params.id;
const showExtended = ref(false);

let season_select = ref(1);

const getSeasonDetails = (tv_id, season_select) => {
  tvStore.getTVSeasonDetails(tv_id, season_select);
};

// Get intial season data
getSeasonDetails(tv_id, season_select.value);
</script>
