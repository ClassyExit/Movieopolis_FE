<template>
  <div>
    <!-- Search Button -->
    <button
      class="btn btn-ghost btn-sm px-4 py-2 flex items-center space-x-2 hover:bg-base-300"
      @click="openModal"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
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
      <span class="hidden md:block text-sm">Search...</span>
    </button>

    <!-- Modal -->
    <Teleport to="body">
      <dialog ref="searchModal" class="modal modal-bottom sm:modal-middle z-50">
        <div
          class="modal-box bg-base-200 rounded-lg shadow-lg p-5 sm:w-11/12 sm:max-w-5xl h-[91.67vh] sm:h-[80vh]"
        >
          <!-- Close Button -->
          <div class="flex justify-end">
            <button
              @click="closeModal"
              class="btn btn-sm btn-outline rounded-full px-3"
            >
              ✕
            </button>
          </div>

          <!-- Search Input -->
          <div class="relative">
            <input
              type="text"
              class="w-full input input-bordered p-3 pl-10 rounded-md shadow-sm text-base"
              placeholder="Search movies or TV shows..."
              v-model="searchQuery"
              v-debounce:500ms="getSearch"
            />
            <svg
              class="absolute left-3 top-3 h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clip-rule="evenodd"
              />
            </svg>
          </div>

          <!-- Tabs (Movies & Shows) -->
          <div class="flex justify-between items-center mt-4">
            <div class="flex space-x-3">
              <button
                @click="UpdateOption('movies')"
                class="btn btn-sm rounded-md"
                :class="
                  selectedOption == 'movies'
                    ? 'btn-primary'
                    : 'btn-outline btn-primary'
                "
              >
                Movies
              </button>
              <button
                @click="UpdateOption('shows')"
                class="btn btn-sm rounded-md"
                :class="
                  selectedOption == 'shows'
                    ? 'btn-primary'
                    : 'btn-outline btn-primary'
                "
              >
                Shows
              </button>
            </div>
            <button
              @click="clearResults"
              class="btn btn-sm btn-error rounded-md"
            >
              Clear
            </button>
          </div>

          <!-- Search Results -->
          <div class="mt-4 overflow-auto space-y-4 max-h-[60vh]">
            <!-- Movies -->
            <div
              v-if="selectedOption == 'movies' && search.results[0]?.movies"
              class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4"
            >
              <Container
                v-for="item in search.results[0].movies.results"
                :key="item.id"
                :id="item.id"
                :poster="item.poster_path"
                :title="item.title || item.name"
                :year="item.release_date || item.first_air_date"
                :rating="item.vote_average"
                :overview="item.overview"
                :type="'movie'"
              />
            </div>

            <!-- TV Shows -->
            <div
              v-if="selectedOption == 'shows' && search.results[0]?.tv"
              class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4"
            >
              <Container
                v-for="item in search.results[0].tv.results"
                :key="item.id"
                :id="item.id"
                :poster="item.poster_path"
                :title="item.title || item.name"
                :year="item.release_date || item.first_air_date"
                :rating="item.vote_average"
                :overview="item.overview"
                :type="'tv'"
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
