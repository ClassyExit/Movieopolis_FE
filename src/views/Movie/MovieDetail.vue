<template>
  <div class="w-full flex flex-col pb-8">
    <div
      class="flex flex-col items-center justify-center w-full h-full"
      v-if="movie.isLoading"
    >
      <Loading />
    </div>

    <div v-else class="w-full flex flex-col space-y-6">
      <div v-if="useUserStore().permissions.canViewVideos">
        <MoviePlayer />
      </div>
      <div
        v-else
        id="backdrop-movie"
        class="relative w-full h-[60vh] bg-cover bg-center flex items-end rounded-lg overflow-hidden"
      >
        <!-- Backdrop -->
        <img
          v-if="movie.results.details.backdrop_path"
          class="h-full w-full object-cover blur-sm z-0"
          :src="`https://image.tmdb.org/t/p/original/${movie.results.details.backdrop_path}`"
          :alt="`${movie.results.details.original_title} backdrop`"
          loading="lazy"
        />

        <img
          v-else-if="movie.results.details.poster_path"
          class="h-full w-full object-cover blur-sm z-0"
          :src="`https://image.tmdb.org/t/p/original/${movie.results.details.poster_path}`"
          :alt="`${movie.results.details.poster_path} backdrop`"
          loading="lazy"
        />

        <div
          class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"
        ></div>

        <!-- Back Button -->
        <div class="absolute top-4 left-4 z-40">
          <MobileReturn />
        </div>

        <!-- Movie Title & Details -->
        <div class="absolute bottom-6 left-6 z-20 text-white max-w-xl">
          <h1 class="text-4xl font-bold leading-tight">
            {{ movie.results.details.title }}
          </h1>
          <p
            v-if="movie.results.details.tagline"
            class="italic text-lg opacity-75 mt-1"
          >
            "{{ movie.results.details.tagline }}"
          </p>
        </div>
      </div>

      <!-- Movie Info Section -->
      <MovieInfo />

      <!-- Additional Sections -->
      <MovieCollections />
      <MovieRecommendations />
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from "@/store/user";
import { useRoute } from "vue-router";
import { useMovieStore } from "@/store/movies";
import Loading from "@/components/Loading.vue";
import { storeToRefs } from "pinia";

import MovieCollections from "./MovieCollections.vue";
import MovieRecommendations from "./MovieRecommendations.vue";
import MovieInfo from "./MovieInfo.vue";
import MoviePlayer from "./MoviePlayer.vue";

import MobileReturn from "@/components/Actions/MobileReturn.vue";

const movieStore = useMovieStore();
const { movie } = storeToRefs(movieStore);

const route = useRoute();
const id = route.params.id;

movieStore.getMovieDetails(id);

function convertMinutesToHours(minutes) {
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hrs}h ${mins}m`;
}
</script>
