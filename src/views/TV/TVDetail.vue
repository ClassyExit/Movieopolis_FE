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
        class="relative w-full h-[60vh] bg-cover bg-center flex items-end"
      >
        <!-- Backdrop  -->
        <img
          class="h-full w-full object-cover blur-[1px] z-0 rounded"
          :src="`https://image.tmdb.org/t/p/original/${show.results.details.backdrop_path}`"
          :alt="`${show.results.details.name} backdrop`"
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
            {{ show.results.details.name }}
          </h1>
          <p
            v-if="show.results.details.tagline"
            class="italic text-xs md:text-md"
          >
            "{{ show.results.details.tagline }}"
          </p>
          <div class="flex overflow-auto scrollbar-hide gap-2 mt-2">
            <span
              v-for="genre in show.results.details.genres"
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
          <TVTrailer />
          <!-- <AddToList
            :id="id"
            :poster="poster"
            :title_tv="title_tv"
            :title_movie="title_movie"
            :media_type="media_type"
            :overview="overview"
          /> -->
        </div>

        <div
          class="overflow-auto w-full flex flex-row items-center space-x-2 text-sm"
        >
          <div class="flex flex-row space-x-2">
            <div
              v-for="network in show.results.details.networks"
              class="badge badge-primary badge-outline"
            >
              {{ network.name }}
            </div>
          </div>
          <div class="w-1 h-1 bg-neutral rounded-full"></div>
          <div class="flex flex-row items-center space-x-1">
            <svg
              class="stroke-current h-5 w-5 text-error"
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
            <div>{{ show.results.details.vote_average }}</div>
          </div>
        </div>

        <div class="text-left text-sm md:text-md w-full md:w-1/2">
          {{ show.results.details.overview }}
        </div>
      </div>
    </div>

    <div
      class="flex flex-row w-full cursor-pointer overflow-auto scrollbar-hide py-4"
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
      <TVCast />
    </div>

    <div v-if="SelectedOption == 'reviews'" class=""><TVReviews /></div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { ref } from "vue";
import { useTVStore } from "@/store/tv";
import Loading from "@/components/Loading.vue";
import { storeToRefs } from "pinia";

import Recommendations from "./Recommendations.vue";
import TVCast from "./TVCast.vue";
import TVReviews from "./TVReviews.vue";
import TVTrailer from "./TVTrailer.vue";

import AddToList from "@/components/Actions/AddToList.vue";
import MobileReturn from "@/components/Actions/MobileReturn.vue";

const tvStore = useTVStore();
const { show } = storeToRefs(tvStore);

// Select different options to show
const SelectedOption = ref("recommendations");
const updateSelectedOption = (newOption) => {
  SelectedOption.value = newOption;
};

const route = useRoute();
const id = route.params.id; // read show id from router

// Get tv details
tvStore.getTVDetails(id);
</script>
