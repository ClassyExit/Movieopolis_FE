<template>
  <div class="w-full pb-8">
    <div
      class="flex flex-col items-center justify-center w-full h-full"
      v-if="movie.isLoading"
    >
      <Loading />
    </div>

    <div v-else class="w-full flex flex-col space-y-4">
      <div
        id="backdrop-movie"
        class="relative w-full h-[60vh] bg-cover bg-center flex items-end"
      >
        <!-- Backdrop  -->
        <img
          class="h-full w-full object-cover blur-[1px] z-0 rounded"
          :src="`https://image.tmdb.org/t/p/original/${movie.results.details.backdrop_path}`"
          :alt="`${movie.results.details.original_title} backdrop`"
          loading="lazy"
        />

        <!-- Gradient Overlay for Better Text Visibility -->
        <div
          class="absolute inset-0 bg-gradient-to-t from-neutral to-transparent z-10"
        ></div>

        <!-- Return Button -->
        <div class="absolute top-2 left-2 z-40">
          <MobileReturn />
        </div>

        <!-- Movie Title, Details, Poster -->
        <div
          class="text-neutral-content text-left absolute top-3/4 inset-y-1/2 left-4 z-20 text-base-content"
        >
          <h1 class="text-3xl md:text-4xl flex flex-wrap font-bold">
            {{ movie.results.details.title }}
          </h1>
          <p
            v-if="movie.results.details.tagline"
            class="italic text-xs md:text-md"
          >
            "{{ movie.results.details.tagline }}"
          </p>
          <div class="flex overflow-auto scrollbar-hide gap-2 mt-2">
            <span
              v-for="genre in movie.results.details.genres"
              :key="genre.id"
              class="badge badge-primary px-2 py-1 rounded-full text-sm"
            >
              {{ genre.name }}
            </span>
          </div>
        </div>
      </div>

      <!-- INFO -->
      <div class="w-full bg-base-300 rounded p-2 space-y-4">
        <div class="flex flex-row space-x-4">
          <MovieTrailer />
          <AddToList />
        </div>

        <div
          class="overflow-auto w-full flex flex-row items-center space-x-2 text-sm"
        >
          <div>{{ convertMinutesToHours(movie.results.details.runtime) }}</div>
          <div class="w-1 h-1 bg-neutral rounded-full"></div>
          <div class="flex flex-row items-center space-x-1">
            <HeartIcon class="h-5 w-5 text-error" />

            <div>{{ movie.results.details.vote_average }}</div>
          </div>
        </div>

        <div class="text-left text-sm md:text-md w-full md:w-1/2">
          {{ movie.results.details.overview }}
        </div>
      </div>
    </div>

    <div
      class="flex flex-row w-fit cursor-pointer overflow-auto scrollbar-hide py-4"
    >
      <div
        class="border-b-2 px-4"
        :class="
          SelectedOption == 'recommendations'
            ? ' border-primary text-primary  '
            : 'text-base-content'
        "
        @click="updateSelectedOption('recommendations')"
      >
        Recommendations
      </div>
      <div
        class="border-b-2 px-4"
        :class="
          SelectedOption == 'reviews'
            ? ' border-primary text-primary  '
            : 'text-base-content'
        "
        @click="updateSelectedOption('reviews')"
      >
        Reviews
      </div>
      <div
        class="border-b-2 px-4"
        :class="
          SelectedOption == 'about'
            ? ' border-primary text-primary  '
            : 'text-base-content'
        "
        @click="updateSelectedOption('about')"
      >
        About
      </div>
    </div>

    <div v-if="SelectedOption == 'recommendations'" class="">
      <Recommendations />
    </div>

    <div v-if="SelectedOption == 'about'" class="">
      <MovieCast />
    </div>

    <div v-if="SelectedOption == 'reviews'" class=""><MovieReviews /></div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { ref } from "vue";
import { useMovieStore } from "@/store/movies";
import Loading from "@/components/Loading.vue";
import { storeToRefs } from "pinia";
import HeartIcon from "@/assets/icons/HeartIcon.vue";
import Recommendations from "./Recommendations.vue";
import MovieCast from "./MovieCast.vue";
import MovieReviews from "./MovieReviews.vue";
import MovieTrailer from "./MovieTrailer.vue";

import AddToList from "@/components/Actions/AddToList.vue";
import MobileReturn from "@/components/Actions/MobileReturn.vue";

const movieStore = useMovieStore();
const { movie } = storeToRefs(movieStore);

// Select different options to show
const SelectedOption = ref("recommendations");
const updateSelectedOption = (newOption) => {
  SelectedOption.value = newOption;
};

const route = useRoute();
const id = route.params.id; // read movie id from router

// Get movie details
movieStore.getMovieDetails(id);

let USDollar = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

function convertMinutesToHours(minutes) {
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hrs}h ${mins}m`;
}
</script>
