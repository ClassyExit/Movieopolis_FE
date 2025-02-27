<template>
  <div class="flex flex-col space-y-4">
    <!-- Season options -->
    <div class="flex">
      <select
        v-model="selectedSeason"
        @change="getSeasonDetails(tv_id, selectedSeason)"
        class="select select-bordered w-full max-w-xs"
      >
        <option
          :key="season.id"
          :value="season.season_number"
          v-for="season in show.results.details.seasons"
        >
          {{ season.name }} ({{ season.episode_count }})
        </option>
      </select>
    </div>

    <!-- Season details -->
    <div class="space-y-4">
      <div class="text-left">
        <div class="text-primary text-2xl">
          {{ show.seasonDetails.details.name }}
        </div>
        <div class="text-sm text-base-content">
          {{ show.seasonDetails.details.overview }}
        </div>
      </div>

      <div class="flex flex-wrap gap-4 max-h-80 overflow-auto">
        <EpisodeCard
          @click="UpdateTVPlayer(tv_id, selectedSeason, episode.episode_number)"
          v-for="episode in show.seasonDetails.details.episodes"
          :id="episode.id"
          :name="episode.name"
          :overview="episode.overview"
          :episodeNumber="episode.episode_number"
          :cantExpand="useUserStore().permissions.canViewVideos"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { useTVStore } from "@/store/tv";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useUserStore } from "@/store/user";
import EpisodeCard from "./EpisodeCard.vue";

const tvStore = useTVStore();
const { show } = storeToRefs(tvStore);

const route = useRoute();
const tv_id = route.params.id;

const selectedSeason = ref(1);

const getSeasonDetails = (id, season) => {
  tvStore.getTVSeasonDetails(id, season);
};

const UpdateTVPlayer = (id, season, episode) => {
  // console.log(id, season, episode);
  tvStore.getShowLinks(id, season, episode);
};

if (tvStore.show.results.details.seasons.length > 0) {
  // Get intial season data
  getSeasonDetails(tv_id, selectedSeason.value);
}
</script>
