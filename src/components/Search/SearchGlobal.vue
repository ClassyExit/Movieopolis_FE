<template>
  <div class="">
    <!-- Search Button -->
    <button class="btn btn-ghost btn-sm" @click="openModal">
      <div class="flex flex-row items-center space-x-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          viewBox="0 0 15 16"
          class="h-5 w-5"
        >
          <path
            fill="currentColor"
            d="M6.5 13.02a5.5 5.5 0 0 1-3.89-1.61C1.57 10.37 1 8.99 1 7.52s.57-2.85 1.61-3.89c2.14-2.14 5.63-2.14 7.78 0C11.43 4.67 12 6.05 12 7.52s-.57 2.85-1.61 3.89a5.5 5.5 0 0 1-3.89 1.61m0-10c-1.15 0-2.3.44-3.18 1.32C2.47 5.19 2 6.32 2 7.52s.47 2.33 1.32 3.18a4.51 4.51 0 0 0 6.36 0C10.53 9.85 11 8.72 11 7.52s-.47-2.33-1.32-3.18A4.48 4.48 0 0 0 6.5 3.02"
          />
          <path
            fill="currentColor"
            d="M13.5 15a.47.47 0 0 1-.35-.15l-3.38-3.38c-.2-.2-.2-.51 0-.71s.51-.2.71 0l3.38 3.38c.2.2.2.51 0 .71c-.1.1-.23.15-.35.15Z"
          />
        </svg>
        <span class="hidden md:block">Search...</span>
      </div>
    </button>

    <!-- Modal -->
    <Teleport to="body">
      <dialog ref="searchModal" class="modal modal-bottom sm:modal-middle z-50">
        <div
          class="modal-box space-y-2 flex flex-col sm:w-11/12 sm:max-w-5xl flex flex-col bg-base-200 h-[91.67vh] sm:h-[80vh] sm:absolute sm:top-12 sm:translate-y-0"
        >
          <div class="flex justify-end">
            <button @click="closeModal" class="btn btn-sm btn-outline">
              X
            </button>
          </div>
          <!-- Search Input -->
          <label class="input flex input-bordered items-center gap-2">
            <input
              type="text"
              class="grow p-2"
              placeholder="Search"
              v-model="searchQuery"
              v-debounce:500ms="getSearch"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              class="h-4 w-4 opacity-70"
            >
              <path
                fill-rule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clip-rule="evenodd"
              />
            </svg>
          </label>

          <div class="flex flex-row justify-between">
            <div class="flex flex-row gap-4">
              <div
                @click="UpdateOption('movies')"
                class="btn btn-sm"
                :class="
                  selectedOption == 'movies'
                    ? 'btn-primary'
                    : 'btn-outline btn-primary'
                "
              >
                Movies
              </div>
              <div
                @click="UpdateOption('shows')"
                class="btn btn-sm"
                :class="
                  selectedOption == 'shows'
                    ? 'btn-primary'
                    : 'btn-outline btn-primary'
                "
              >
                Shows
              </div>
            </div>
            <div class="flex flex-row space-x-4">
              <div @click="clearResults" class="btn btn-sm btn-error">
                Clear
              </div>
            </div>
          </div>

          <!-- Search Results -->
          <div class="space-y-4 overflow-auto">
            <!-- Movies -->
            <div
              v-if="selectedOption == 'movies' && search.results[0]?.movies"
              class="grid grid-cols-2 md:flex md:flex-wrap gap-2 place-items-center overflow-auto"
            >
              <Container
                v-for="item in search.results[0].movies.results"
                :key="item.id"
                :id="item.id"
                :poster="item.poster_path"
                :title_movie="item.title"
                :year_movie="item.release_date"
                :rating="item.vote_average"
                :type="'movie'"
                :overview="item.overview"
              />
            </div>

            <!-- TV Shows -->
            <div
              v-if="selectedOption == 'shows' && search.results[0]?.tv"
              class="grid grid-cols-2 md:flex md:flex-wrap gap-2 place-items-center overflow-auto"
            >
              <Container
                v-for="item in search.results[0].tv.results"
                :key="item.id"
                :id="item.id"
                :poster="item.poster_path"
                :title_tv="item.name"
                :year_tv="item.first_air_date"
                :rating="item.vote_average"
                :type="'tv'"
                :overview="item.overview"
              />
            </div>
          </div>
        </div>
      </dialog>
    </Teleport>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useSearchStore } from "@/store/search";
import { storeToRefs } from "pinia";
import Container from "../Containers/Container.vue";

const searchStore = useSearchStore();
const { search } = storeToRefs(searchStore);

const searchQuery = ref("");
const searchModal = ref(null);
const selectedOption = ref("movies");

const UpdateOption = (option) => {
  selectedOption.value = option;
};

// Open and Close Modal
const openModal = () => searchModal.value?.showModal();
const closeModal = () => searchModal.value?.close();

const getSearch = () => {
  searchStore.getSearch(searchQuery, "multi");
};

// Clear Search Results
const clearResults = () => {
  searchQuery.value = "";
  searchStore.clearSearchResults();
};
</script>
