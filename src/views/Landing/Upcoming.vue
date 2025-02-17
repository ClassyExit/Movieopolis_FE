<template>
  <div class="w-full">
    <div
      class="flex flex-col lg:flex-row items-start lg:space-x-2 text-left text-3xl text-primary pb-1"
    >
      <span>Upcoming Releases</span>
    </div>

    <div v-if="isLoading.home" class="skeleton h-64">
      <!-- <Loading /> -->
    </div>
    <div v-else>
      <vue-horizontal responsive snap="start">
        <ExtendedContainer
          class="mx-5 z-10"
          v-for="item in movies.upcoming.results"
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
</template>

<script setup>
import { useHomeStore } from "@/store/homeStore";
import ExtendedContainer from "@/components/ExtendedContainer.vue";
import VueHorizontal from "vue-horizontal";
import { storeToRefs } from "pinia";

const { movies, isLoading } = storeToRefs(useHomeStore());
</script>
