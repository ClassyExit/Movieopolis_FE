<template>
  <div class="w-full pb-8">
    <div
      class="flex flex-col items-center justify-center w-full h-full"
      v-if="movie.isLoading"
    >
      <Loading />
    </div>

    <div v-else class="flex flex-col items-center mx-auto rounded">
      <div
        id="backdrop-movie"
        :class="
          movie.results.details.backdrop_path
            ? 'relative w-full h-[60vh]  bg-cover bg-center flex  items-end rounded '
            : 'hidden'
        "
      >
        <!-- Backdrop  -->
        <img
          class="h-full w-full object-cover blur-[3px] z-0 rounded"
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
          class="text-neutral-content text-left absolute top-3/4 md:inset-y-1/2 left-4 z-20 text-base-content"
        >
          <!-- <img
            class="scale-75 object-cover z-0"
            :src="`https://image.tmdb.org/t/p/w300/${movie.results.details.poster_path}`"
            :alt="`${movie.results.details.original_title} poster`"
            loading="lazy"
          /> -->

          <h1 class="text-3xl md:text-4xl font-bold">
            {{ movie.results.details.title }}
          </h1>
          <p class="italic text-xs md:text-md">
            "{{ movie.results.details.tagline }}"
          </p>
          <div class="flex gap-2 mt-2">
            <span
              v-for="genre in movie.results.details.genres"
              :key="genre.id"
              class="badge badge-primary px-2 py-1 rounded-full text-sm"
            >
              {{ genre.name }}
            </span>
          </div>

          <div class="pt-8 md:pt-4 space-y-2">
            <div class="flex flex-row space-x-4">
              <div class="">Watch trailer</div>
              <div class="">Add to lib</div>
            </div>

            <div class="flex flex-row space-x-4 text-sm">
              <span>{{
                convertMinutesToHours(movie.results.details.runtime)
              }}</span>

              <div class="flex flex-row items-center space-x-1">
                <HeartIcon class="h-4 w-4 text-primary" /><span>{{
                  movie.results.details.vote_average
                }}</span>
              </div>
            </div>

            <div class="text-sm md:text-md w-full md:w-1/2">
              {{ movie.results.details.overview }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="flex flex-row cursor-pointer overflow-auto scrollbar-hide pt-48 py-4 md:pt-4"
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
          SelectedOption == 'credits'
            ? ' border-primary text-primary  '
            : 'text-base-content'
        "
        @click="updateSelectedOption('credits')"
      >
        Credits
      </div>
      <div
        class="border-b-2 px-4"
        :class="
          SelectedOption == 'collections'
            ? ' border-primary text-primary  '
            : 'text-base-content'
        "
        @click="updateSelectedOption('collections')"
      >
        Collections
      </div>
    </div>

    <Recommendations class="" v-if="SelectedOption == 'recommendations'" />
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { ref } from "vue";
import { useMovieStore } from "@/store/movies";
import Loading from "@/components/Loading.vue";
import { storeToRefs } from "pinia";
import HeartIcon from "@/assets/icons/HeartIcon.vue";
import TrailerTemplate from "@/components/TrailerTemplate.vue";
import Recommendations from "./Recommendations.vue";

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
