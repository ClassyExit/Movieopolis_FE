<template>
  <div class="w-full pb-8">
    <div
      class="flex flex-col items-center justify-center w-full h-full"
      v-if="show.isLoading"
    >
      <Loading />
    </div>

    <div v-else class="w-full flex flex-col space-y-4">
      <div
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
          <div class="flex flex-wrap gap-2 mt-2">
            <span
              v-for="genre in show.results.details.genres"
              :key="genre.id"
              class="bg-primary/80 px-3 py-1 rounded-full text-sm"
            >
              {{ genre.name }}
            </span>
          </div>
        </div>
      </div>

      <!-- INFO -->
      <div class="w-full bg-base-300 rounded-lg p-6 space-y-6 shadow-md">
        <div
          class="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0"
        >
          <div class="flex items-center space-x-4">
            <TVTrailer />
            <AddToList
              :id="show.results.details.id"
              :poster="show.results.details.poster"
              :title="show.results.details.name"
              :type="`tv`"
              :overview="show.results.details.overview"
            />
            <TVReviews />
          </div>
        </div>

        <div
          class="overflow-auto w-full flex flex-row items-center space-x-2 text-md"
        >
          <div class="flex flex-row space-x-2">
            <div
              v-for="network in show.results.details.networks"
              class="badge badge-outline px-3 py-1 rounded-md text-sm shadow-sm"
            >
              {{ network.name }}
            </div>
          </div>
          <div class="w-1 h-1 bg-neutral rounded-full"></div>
          <div class="flex flex-row items-center space-x-1">
            <svg
              class="stroke-current h-6 w-6 text-error"
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
            <div class="font-bold text-lg">
              {{ show.results.details.vote_average }}
            </div>
          </div>
        </div>

        <div
          class="text-left text-md md:text-lg w-full md:w-3/4 leading-relaxed"
        >
          {{ show.results.details.overview }}
        </div>
      </div>

      <TVSeason />
      <TVRecommendations />
      <TVCast />
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";

import { useTVStore } from "@/store/tv";
import Loading from "@/components/Loading.vue";
import { storeToRefs } from "pinia";

import TVReviews from "./TVReviews.vue";
import TVTrailer from "./TVTrailer.vue";

import AddToList from "@/components/Actions/AddToList.vue";
import MobileReturn from "@/components/Actions/MobileReturn.vue";
import TVSeason from "./TVSeason.vue";

import TVRecommendations from "./TVRecommendations.vue";

import TVCast from "./TVCast.vue";

const tvStore = useTVStore();
const { show } = storeToRefs(tvStore);

const route = useRoute();
const id = route.params.id; // read show id from router

// Get tv details
tvStore.getTVDetails(id);
</script>
