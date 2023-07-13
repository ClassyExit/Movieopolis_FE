<template>
  <teleport to="body">
    <input class="modal-state" id="season-details" type="checkbox" />
    <div class="modal">
      <label class="modal-overlay" for="season-details"></label>
      <div class="modal-content flex flex-col gap-5">
        <label
          for="season-details"
          class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >✕</label
        >
        <h2 class="text-xl"></h2>
        <span
          v-for="episode in tvSeasonDetails.episodes"
          class="flex flex-col w-full justify-between border-[1px] border-border rounded bg-backgroundSecondary p-2"
        >
          <div class="flex flex-row w-full space-x-1">
            <div class="text-primary w-3/4 md:text-lg lg:text-xl">
              {{ episode.name }} ({{ episode.episode_number }})
            </div>
            <img
              :src="`https://image.tmdb.org/t/p/w92/${episode.still_path}`"
              :title="episode.name"
            />
          </div>
          <div class="w-full">
            <div class="text-xs md:text-md text-content2">
              {{ episode.overview }}
            </div>
          </div>
        </span>

        <div class="flex gap-3">
          <label for="season-details" class="btn btn-block">Close</label>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { useTVStore } from "@/store/tv";
import Loading from "@/components/Loading.vue";
import { storeToRefs } from "pinia";

const tvStore = useTVStore();
const { isLoadingSeasonDetails, tvSeasonDetails } = storeToRefs(tvStore);
</script>
