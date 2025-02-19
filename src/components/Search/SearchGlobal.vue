<template>
  <div class="">
    <!-- Search Button -->
    <button class="btn btn-ghost btn-sm" @click="openModal">
      <div class="flex flex-row items-center space-x-2">
        <MagnifyingGlass class="h-5 w-5" />
        <span class="hidden md:block">Search...</span>
      </div>
    </button>

    <!-- Modal -->
    <dialog ref="searchModal" class="modal modal-bottom sm:modal-middle z-50">
      <div class="modal-box flex flex-col bg-base-200">
        <!-- Search Input -->
        <label class="input input-bordered flex items-center gap-2">
          <input
            type="text"
            class="grow"
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

        <!-- Search Results -->
        <div class="h-96">
          <div class="flex flex-row justify-between py-4">
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
            <div @click="clearResults" class="btn btn-sm btn-error">Clear</div>
          </div>

          <!-- Movies -->
          <div
            v-if="selectedOption == 'movies' && search.results[0]?.movies"
            class="grid grid-cols-2 place-items-center h-80 overflow-auto"
          >
            <Container
              v-for="item in search.results[0].movies.results"
              :key="item.id"
              :id="item.id"
              :poster="item.poster_path"
              :title_movie="item.title"
              :year_movie="item.release_date"
              :rating="item.vote_average"
              :media_type="'movie'"
              :overview="item.overview"
            />
          </div>

          <!-- TV Shows -->
          <div
            v-if="selectedOption == 'shows' && search.results[0]?.tv"
            class="grid grid-cols-2 place-items-center h-80 overflow-auto"
          >
            <Container
              v-for="item in search.results[0].tv.results"
              :key="item.id"
              :id="item.id"
              :poster="item.poster_path"
              :title_tv="item.name"
              :year_tv="item.first_air_date"
              :rating="item.vote_average"
              :media_type="'tv'"
              :overview="item.overview"
            />
          </div>
        </div>

        <!-- Modal Actions -->
        <div class="modal-action">
          <button @click="closeModal" class="btn">Close</button>
        </div>
      </div>
    </dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";
import MagnifyingGlass from "@/assets/icons/MagnifyingGlass.vue";
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
