<template>
  <div class="w-full pb-8">
    <div
      class="flex flex-col items-center justify-center w-full h-full"
      v-if="show.isLoading"
    >
      <Loading />
    </div>

    <div v-else class="w-full flex flex-col space-y-4">
      <div v-if="useUserStore().permissions.canViewVideos">
        <TVPlayer />
      </div>
      <div
        v-else
        id="backdrop-show"
        class="relative w-full h-[60vh] bg-cover bg-center flex items-end rounded-lg overflow-hidden shadow-lg"
      >
        <!-- Backdrop -->
        <img
          v-if="show.results.details.backdrop_path"
          class="h-full w-full object-cover blur-sm z-0"
          :src="`https://image.tmdb.org/t/p/original/${show.results.details.backdrop_path}`"
          :alt="`${show.results.details.name} backdrop`"
          loading="lazy"
        />

        <img
          v-else-if="show.results.details.poster_path"
          class="h-full w-full object-cover blur-sm z-0"
          :src="`https://image.tmdb.org/t/p/original/${show.results.details.poster_path}`"
          :alt="`${show.results.details.poster_path} backdrop`"
          loading="lazy"
        />

        <div
          class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"
        ></div>

        <!-- Return Button -->
        <div class="absolute top-4 left-4 z-40">
          <MobileReturn />
        </div>

        <!-- Show Title, Details, Poster -->

        <div class="absolute bottom-6 left-6 z-20 text-white max-w-xl">
          <h1 class="text-4xl font-bold leading-tight">
            {{ show.results.details.name }}
          </h1>
          <p
            v-if="show.results.details.tagline"
            class="italic text-lg opacity-75 mt-1"
          >
            "{{ show.results.details.tagline }}"
          </p>
        </div>
      </div>

      <TVInfo />
      <TVSeason />
      <TVRecommendations />
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { useUserStore } from "@/store/user";
import { useTVStore } from "@/store/tv";
import Loading from "@/components/Loading.vue";
import { storeToRefs } from "pinia";

import MobileReturn from "@/components/Actions/MobileReturn.vue";
import TVSeason from "./TVSeason.vue";
import TVPlayer from "./TVPlayer.vue";
import TVInfo from "./TVInfo.vue";

import TVRecommendations from "./TVRecommendations.vue";

const tvStore = useTVStore();
const { show } = storeToRefs(tvStore);

const route = useRoute();
const id = route.params.id; // read show id from router

// Get tv details
tvStore.getTVDetails(id);
</script>
