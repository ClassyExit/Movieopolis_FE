<template>
  <div class="w-full space-y-4">
    <div class="w-full space-y-1">
      <div
        class="text-left text-3xl text-primary flex flex-row items-center justify-between md:justify-start space-x-2 pb-1"
      >
        <span class="">Popular Movies</span>

        <router-link
          :to="{ name: 'MoviesLayout' }"
          class="flex items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl p-[1px]"
        >
          <div
            class="flex badge badge-md md:badge-lg text-sm text-base-content"
          >
            <span class="text-xs md:text-md">View more</span>
            <Icon icon="ic:twotone-arrow-right" width="20" height="20" />
          </div>
        </router-link>
      </div>

      <div v-if="isLoading.home" class="skeleton h-64">
        <!-- <Loading /> -->
      </div>

      <div v-else class="flex gap-2 overflow-auto lg:flex-wrap">
        <Container
          v-for="item in movies.popularMovies?.results"
          :key="item.id"
          :id="item.id"
          :poster="item.poster_path"
          :title="item.title || item.name"
          :year="item.release_date || item.first_air_date"
          :rating="item.vote_average"
          :overview="item.overview"
          :type="'movie'"
        >
        </Container>
      </div>
    </div>

    <div class="w-full rounded p-2 space-y-1">
      <div
        class="text-left text-3xl text-primary flex flex-row items-center justify-between md:justify-start space-x-2 pb-1"
      >
        <span class="">Popular Shows</span>

        <router-link
          :to="{ name: 'TVLayout' }"
          class="flex items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl p-[1px]"
        >
          <div
            class="flex badge badge-md md:badge-lg text-sm text-base-content"
          >
            <span class="text-xs md:text-md">View more</span>
            <Icon icon="ic:twotone-arrow-right" width="20" height="20" />
          </div>
        </router-link>
      </div>

      <div v-if="isLoading.home" class="skeleton h-64">
        <!-- <Loading /> -->
      </div>

      <div v-else class="flex gap-2 overflow-auto lg:flex-wrap">
        <Container
          v-for="item in movies.popularTVShows?.results"
          :key="item.id"
          :id="item.id"
          :poster="item.poster_path"
          :title="item.title || item.name"
          :year="item.release_date || item.first_air_date"
          :rating="item.vote_average"
          :overview="item.overview"
          :type="'tv'"
        >
        </Container>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useHomeStore } from "@/store/homeStore";
import Container from "@/components/Containers/Container.vue";
import { storeToRefs } from "pinia";

const { movies, isLoading } = storeToRefs(useHomeStore());

useHomeStore().getHomeData();
</script>
