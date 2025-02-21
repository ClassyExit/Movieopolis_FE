<template>
  <div class="w-full">
    <div class="w-full space-y-1">
      <div class="flex flex-row space-x-2 items-center text-left text-3xl pb-1">
        <span class="text-primary pb-1">Trending</span>
        <div @click="showFilter = !showFilter" class="btn btn-ghost btn-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 32 32"
          >
            <path
              fill="currentColor"
              d="M26 6H4v3.17l7.41 7.42l.59.58V26h4v-2h2v2a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-8l-7.41-7.41A2 2 0 0 1 2 9.17V6a2 2 0 0 1 2-2h22Z"
            />
            <path
              fill="currentColor"
              d="m29.71 11.29l-3-3a1 1 0 0 0-1.42 0L16 17.59V22h4.41l9.3-9.29a1 1 0 0 0 0-1.42M19.59 20H18v-1.59l5-5L24.59 15ZM26 13.59L24.41 12L26 10.41L27.59 12Z"
            />
          </svg>
        </div>
      </div>

      <div v-if="showFilter" class="flex flex-row space-x-2 w-fit rounded">
        <div class="flex flex-row space-x-2 overflow-auto scrollbar-hide">
          <div
            class="flex flex-row h-10 rounded-xl text-sm hover:cursor-pointer bg-base-200"
          >
            <span
              @click="updateTrendingFilter('all', trendingTime)"
              :class="trendingOption == 'all' ? ' border border-primary' : ''"
              class="min-w-[50px] text-center rounded-xl items-center justify-center flex p-2"
              >All</span
            >
            <span
              @click="updateTrendingFilter('movie', trendingTime)"
              :class="trendingOption == 'movie' ? 'border border-primary' : ''"
              class="min-w-[50px] text-center rounded-xl items-center justify-center flex p-2"
              >Movie</span
            >
            <span
              @click="updateTrendingFilter('tv', trendingTime)"
              :class="trendingOption == 'tv' ? 'border border-primary' : ''"
              class="min-w-[50px] text-center rounded-xl items-center justify-center flex p-2"
              >Shows</span
            >
          </div>

          <div
            class="flex flex-row h-10 rounded-xl text-sm hover:cursor-pointer bg-base-200"
          >
            <span
              @click="updateTrendingFilter(trendingOption, 'day')"
              class="min-w-[50px] text-center rounded-xl items-center justify-center flex p-1 md:p-2"
              :class="trendingTime == 'day' ? 'border border-primary' : ''"
              >Daily</span
            >
            <span
              @click="updateTrendingFilter(trendingOption, 'week')"
              class="min-w-[50px] text-center rounded-xl items-center justify-center flex p-1 md:p-2"
              :class="trendingTime == 'week' ? 'border border-primary' : ''"
              >Weekly</span
            >
          </div>
        </div>
      </div>

      <div v-if="homeStore.isLoading.trending" class="skeleton h-64">
        <!-- <Loading /> -->
      </div>
      <div v-else class="flex gap-2 overflow-auto lg:flex-wrap">
        <Container
          v-for="item in movies.trending.results"
          :key="item.id"
          :id="item.id"
          :poster="item.poster_path"
          :title="item.title || item.name"
          :year="item.release_date || item.first_air_date"
          :rating="item.vote_average"
          :overview="item.overview"
          :type="item.media_type"
        >
        </Container>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Container from "@/components/Containers/Container.vue";
import { useHomeStore } from "@/store/homeStore";
import { storeToRefs } from "pinia";

const homeStore = useHomeStore();

const { movies, isLoading } = storeToRefs(homeStore);

const showFilter = ref(false);

let trendingOption = ref("all");
let trendingTime = ref("week");

if (!homeStore.movies.trending.results) {
  // If trending content is empty, fetch new results
  homeStore.getTrendingContent(trendingOption.value, trendingTime.value);
}

const updateTrendingFilter = (media_type, time_window) => {
  trendingOption.value = media_type;
  trendingTime.value = time_window;
  homeStore.getTrendingContent(media_type, time_window);
};
</script>
