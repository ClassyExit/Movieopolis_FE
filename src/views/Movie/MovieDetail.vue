<template>
  <div class="w-full pb-8">
    <div
      class="flex flex-col items-center justify-center w-full h-full"
      v-if="movie.isLoading"
    >
      <Loading />
    </div>

    <div v-else class="w-full flex flex-col space-y-6">
      <!-- Backdrop Section -->
      <div
        id="backdrop-movie"
        class="relative w-full h-[60vh] bg-cover bg-center flex items-end rounded-lg overflow-hidden"
      >
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
          <div class="flex flex-wrap gap-2 mt-2">
            <span
              v-for="genre in movie.results.details.genres"
              :key="genre.id"
              class="bg-primary/80 px-3 py-1 rounded-full text-sm"
            >
              {{ genre.name }}
            </span>
          </div>
        </div>
      </div>

      <!-- Movie Info Section -->
      <div class="w-full bg-base-300 p-6 rounded-lg space-y-6 shadow-md">
        <div
          class="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0"
        >
          <div class="flex items-center space-x-4">
            <MovieTrailer />
            <AddToList
              :id="movie.results.details.id"
              :poster="movie.results.details.poster"
              :title="movie.results.details.title"
              :type="`movie`"
              :overview="movie.results.details.overview"
            />
            <MovieReviews />
          </div>
          <div class="flex items-center space-x-4 text-lg">
            <span>{{
              convertMinutesToHours(movie.results.details.runtime)
            }}</span>
            <span class="w-2 h-2 bg-neutral rounded-full"></span>
            <div class="flex items-center space-x-2">
              <svg
                class="h-6 w-6 text-error"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                ></path>
              </svg>
              <span>{{ movie.results.details.vote_average }}</span>
            </div>
          </div>
        </div>

        <p class="text-left text-md md:text-lg opacity-90 leading-relaxed">
          {{ movie.results.details.overview }}
        </p>
      </div>

      <!-- Additional Sections -->
      <MovieCollections />
      <Recommendations />
      <MovieCast />
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { useMovieStore } from "@/store/movies";
import Loading from "@/components/Loading.vue";
import { storeToRefs } from "pinia";

import Recommendations from "./Recommendations.vue";
import MovieCast from "./MovieCast.vue";
import MovieReviews from "./MovieReviews.vue";
import MovieTrailer from "./MovieTrailer.vue";
import MovieCollections from "./MovieCollections.vue";

import AddToList from "@/components/Actions/AddToList.vue";
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
