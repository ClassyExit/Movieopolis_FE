<template>
  <div>
    <div
      class="flex flex-row items-center border border-border rounded-md cursor-pointer p-2 space-x-2 w-fit md:w-80"
      @click="openModal = !openModal"
    >
      <span> <MagnifyingGlass /> </span>
      <span class="hidden md:block">Search movies, shows...</span>
    </div>

    <input
      class="modal-state"
      id="modal-search"
      type="checkbox"
      v-model="openModal"
    />

    <div class="modal w-full">
      <label class="modal-overlay" for="modal-search"></label>
      <div
        class="absolute top-2 modal-content flex flex-col gap-5 max-w-4xl w-full"
      >
        <div class="flex flex-row items-center w-full space-x-2">
          <div class="w-full">
            <input
              class="focus:input-primary w-full p-2 rounded-md border border-primary"
              type=""
              placeholder="Search for movies, shows..."
              v-model="searchQuery"
              v-debounce:500ms="getResults"
            />
          </div>
          <div @click="openModal = !openModal" class="btn btn-sm">X</div>
        </div>
        <div class="pb-2 border-b-2 border-border">
          <div
            v-if="search.recentSearches.length"
            class="flex flex-row space-x-4"
          >
            <span class="text-primary">Recent searches</span>
            <div
              @click="searchStore.clearRecentSearches"
              class="btn btn-xs btn-outline-error"
            >
              Clear
            </div>
          </div>
          <div class="space-y-2" v-for="search in search.recentSearches">
            <span> {{ search }}</span>
          </div>
        </div>

        <div class="max-w-4xl">
          <div
            v-if="search.results.length"
            class="flex flex-row space-x-4 pb-4"
          >
            <span class="text-primary">Search results</span>
            <div
              @click="searchStore.clearSearchResults"
              class="btn btn-xs btn-outline-error"
            >
              Clear
            </div>
          </div>
          <div
            v-if="search.results[0]?.movies"
            class="flex gap-2 justify-center gap-4 md:gap-2 md:justify-start flex-wrap"
          >
            <Container
              v-for="item in search.results[0].movies.results"
              :key="item.id"
              :id="item.id"
              :poster="item.poster_path"
              :title_movie="item.title"
              :year_movie="item.release_date"
              :rating="item.vote_average"
              :media_type="`movie`"
              :overview="item.overview"
            >
            </Container>
          </div>

          <div
            v-if="search.results[0]?.tv"
            class="flex gap-2 justify-center gap-4 md:gap-2 md:justify-start flex-wrap"
          >
            <Container
              v-for="item in search.results[0].tv.results"
              :key="item.id"
              :id="item.id"
              :poster="item.poster_path"
              :title_tv="item.name"
              :year_tv="item.first_air_date"
              :rating="item.vote_average"
              :media_type="`tv`"
              :overview="item.overview"
            >
            </Container>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import MagnifyingGlass from "@/assets/Icons/MagnifyingGlass.vue";
import { useSearchStore } from "@/store/search";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import Container from "../Container.vue";

const searchStore = useSearchStore();
const { search } = storeToRefs(searchStore);

const openModal = ref(false);
const searchQuery = ref("");

const getResults = () => {
  searchStore.getSearch(searchQuery, "multi");
};
</script>

<style></style>
