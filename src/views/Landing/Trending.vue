<template>
  <div class="w-full">
    <div class="w-full space-y-1">
      <div class="flex flex-row space-x-2 items-center text-left text-3xl pb-1">
        <span class="text-primary pb-1">Trending</span>
        <div @click="showFilter = !showFilter" class="btn btn-ghost btn-sm">
          <FilterIcon class="h-6 w-6" />
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
          :key="(item.id, item.media_type)"
          :id="item.id"
          :poster="item.poster_path"
          :title_movie="item.title"
          :title_tv="item.name"
          :year_tv="item.first_air_date"
          :year_movie="item.release_date"
          :rating="item.vote_average"
          :media_type="item.media_type"
          :type="item.media_type"
          :overview="item.overview"
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
import FilterIcon from "@/assets/icons/FilterIcon";

const homeStore = useHomeStore();

const { movies, isLoading } = storeToRefs(homeStore);

const showFilter = ref(false);

let trendingOption = ref("all");
let trendingTime = ref("week");

if (!homeStore.movies.trending?.results) {
  // If trending content is empty, fetch new results
  homeStore.getTrendingContent(trendingOption.value, trendingTime.value);
}

const updateTrendingFilter = (media_type, time_window) => {
  trendingOption.value = media_type;
  trendingTime.value = time_window;
  homeStore.getTrendingContent(media_type, time_window);
};
</script>
