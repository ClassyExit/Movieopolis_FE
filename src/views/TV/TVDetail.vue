<template>
  <div class="w-full">
    <div
      class="flex flex-col items-center justify-center w-full h-full"
      v-if="show.isLoading"
    >
      <Loading />
    </div>

    <div v-else class="flex flex-col h-screen items-center mx-auto">
      <div
        id="backdrop-tv"
        :class="
          show.details.backdrop_path
            ? 'relative inset-y-0 top-0 w-full h-2/5 z-0 md:pb-5'
            : 'hidden'
        "
      >
        <img
          class="h-full w-full object-cover blur-xs z-0"
          :src="`https://image.tmdb.org/t/p/original/${show.details.backdrop_path}`"
          :alt="`${show.details.original_name} backdrop`"
        />

        <div class="absolute top-2 left-2 z-40"><MobileReturn /></div>
      </div>

      <div
        aria-label="layout"
        class="w-full flex flex-col space-y-4 md:space-y-0 mx-auto"
      >
        <div class="w-full flex flex-col md:flex-row justify-center">
          <div aria-label="main channel" class="p-2 pb-24 space-y-4">
            <div
              :class="
                Object.keys(show.trailer).length > 0
                  ? 'max-w-7xl w-full bg-backgroundSecondary p-2 rounded-xl mt-2 md:mt-0'
                  : 'hidden'
              "
            >
              <TVTrailer />
            </div>

            <div
              aria-label="main label"
              class="flex flex-row space-x-4 max-w-7xl w-full bg-backgroundSecondary p-2 rounded-xl mt-2 md:mt-0"
            >
              <div class="hidden md:block min-w-fit max-w-2/5">
                <img
                  class="h-full object-contain z-10 rounded-lg"
                  :src="`https://image.tmdb.org/t/p/w300/${show.details.poster_path}`"
                  :alt="`${show.details.original_name} poster`"
                />
              </div>

              <div class="flex flex-col space-y-4 w-full">
                <div class="text-3xl">
                  <div class="flex flex-row text-content1 space-x-2">
                    <div class="space-x-2">
                      <span class="text-bold">
                        {{ show.details.original_name }}
                      </span>

                      <span class="text-content2"
                        >({{ show.details.first_air_date.slice(0, 4) }})</span
                      >
                    </div>
                  </div>
                </div>

                <div class="flex flex-col space-y-4">
                  <div class="text-left space-y-4 flex flex-row items-center">
                    <div class="flex flex-row space-x-3">
                      <span class="badge badge-sm badge-primary">{{
                        show.details.status
                      }}</span>
                      <div
                        class="flex flex-row items-center justify-center space-x-1 p-2 rounded-lg"
                      >
                        <Icon
                          icon="streamline:interface-favorite-heart-reward-social-rating-media-heart-it-like-favorite-love"
                          width="20"
                          height="20"
                        />

                        <span class="text-content1">{{
                          show.details.vote_average.toFixed(2)
                        }}</span>
                      </div>

                      <AddToList
                        :id="show.details.id"
                        :poster="show.details.poster"
                        :title_tv="show.details.original_name"
                        :media_type="show.details.media_type"
                        :overview="show.details.overview"
                      />
                    </div>
                  </div>
                  <div class="text-left text-md text-content2">
                    {{ show.details?.overview }}
                  </div>
                </div>

                <div class="w-full">
                  <div class="grid grid-cols-2 w-fit">
                    <div
                      class="flex flex-col text-left space-y-2 text-content1"
                    >
                      <div class="text-bold">Release Date</div>
                      <div class="text-bold">Language(s)</div>
                      <div class="text-bold">Last Air Date</div>
                      <div class="text-bold">Networks</div>
                      <div class="text-bold">Season(s)</div>
                      <div class="text-bold">Total Episodes</div>
                      <div class="text-bold">Genre(s)</div>
                    </div>

                    <div
                      class="flex flex-col text-left space-y-2 text-content2"
                    >
                      <div class="">{{ show.details.first_air_date }}</div>
                      <div class="flex flex-wrap gap-1">
                        <div
                          v-for="item in show.details.languages"
                          class="flex flex-wrap badge w-fit uppercase"
                        >
                          {{ item }}
                        </div>
                      </div>
                      <div class="text-bold">
                        {{ show.details.last_air_date }}
                      </div>
                      <div class="flex flex-wrap gap-1">
                        <div
                          v-for="item in show.details.networks"
                          class="flex flex-wrap badge badge-secondary w-fit uppercase"
                        >
                          {{ item.name }}
                        </div>
                      </div>
                      <div class="">{{ show.details.number_of_seasons }}</div>
                      <div class="">{{ show.details.number_of_episodes }}</div>
                      <div class="flex flex-wrap gap-1">
                        <div
                          v-for="item in show.details.genres"
                          class="flex flex-wrap badge badge-primary w-fit"
                        >
                          {{ item.name }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="flex flex-row overflow-auto space-x-2 scrollbar-hide">
              <div
                @click="updateSelectedOption('recommendations')"
                class="btn"
                :class="
                  SelectedOption == 'recommendations'
                    ? 'btn-primary'
                    : 'btn-outline-primary'
                "
              >
                Recommendations
              </div>

              <div
                @click="updateSelectedOption('seasons')"
                class="btn"
                :class="
                  SelectedOption == 'seasons'
                    ? 'btn-primary'
                    : 'btn-outline-primary'
                "
              >
                Seasons
              </div>
              <div
                @click="updateSelectedOption('reviews')"
                class="btn"
                :class="
                  SelectedOption == 'reviews'
                    ? 'btn-primary'
                    : 'btn-outline-primary'
                "
              >
                Reviews
              </div>
              <div
                @click="updateSelectedOption('videos')"
                class="btn"
                :class="
                  SelectedOption == 'videos'
                    ? 'btn-primary'
                    : 'btn-outline-primary'
                "
              >
                Videos
              </div>
            </div>

            <Recommendations v-if="SelectedOption == 'recommendations'" />
            <Reviews v-if="SelectedOption == 'reviews'" />
            <Seasons v-if="SelectedOption == 'seasons'" />
            <Videos v-if="SelectedOption == 'videos'" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useTVStore } from "@/store/tv";
import Loading from "@/components/Loading.vue";
import { storeToRefs } from "pinia";

import Reviews from "./Reviews.vue";
import Seasons from "./Seasons.vue";
import Videos from "./Videos.vue";
import Recommendations from "./Recommendations.vue";

import AddToList from "@/components/Actions/AddToList.vue";
import MobileReturn from "@/components/Actions/MobileReturn.vue";
import TVTrailer from "./TVTrailer.vue";

// Select different options to show
const SelectedOption = ref("recommendations");
const updateSelectedOption = (newOption) => {
  SelectedOption.value = newOption;
};

const tvStore = useTVStore();
const { show } = storeToRefs(tvStore);

const route = useRoute();
const id = route.params.id;

// Get TV show details
tvStore.getTVDetails(id);
</script>
