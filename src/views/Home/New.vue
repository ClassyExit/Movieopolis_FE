<template>
  <div class="w-full p-4 md:px-16 rounded text-content1">
    <div class="w-full text-content2 rounded p-2">
      <div
        class="flex flex-col lg:flex-row items-start lg:space-x-2 text-left text-3xl text-primary pb-1"
      >
        <span>New Releases</span>
      </div>

      <div v-if="homeStore.isLoading.upcomingMovies" class="skeleton h-64">
        <!-- <Loading /> -->
      </div>
      <div v-else>
        <vue-horizontal responsive snap="start">
          <ExtendedContainer
            class="mx-5 text-content1"
            v-for="item in upcomingMovies.results"
            :key="item.id"
            :id="item.id"
            :poster="`https://image.tmdb.org/t/p/w185/${item.poster_path}`"
            :title="item.original_title"
            :overview="item.overview"
            :rating="item.vote_average"
            :rating_amount="item.vote_count"
            :release_date="item.release_date.slice(5)"
          ></ExtendedContainer>
        </vue-horizontal>
      </div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import ExtendedContainer from "@/components/ExtendedContainer.vue";
import VueHorizontal from "vue-horizontal";
import { useHomeStore } from "@/store/homeStore";

const homeStore = useHomeStore();

const { upcomingMovies } = storeToRefs(homeStore);

if (homeStore.upcomingMovies?.length == 0) {
  const page = 1;
  homeStore.getUpcomingMovies(page);
}
</script>
