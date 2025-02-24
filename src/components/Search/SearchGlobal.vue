<template>
  <div class="btn btn-ghost btn-sm">
    <!-- Search Button -->
    <div class="flex justify-center items-center space-x-2" @click="openModal">
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
      <span class="hidden md:flex text-sm">Search...</span>
    </div>

    <!-- Modal -->
    <Teleport to="body">
      <dialog ref="searchModal" class="modal modal-bottom sm:modal-middle z-50">
        <div
          class="modal-box bg-base-200 rounded-lg shadow-lg p-5 sm:w-11/12 sm:max-w-5xl h-[91.67vh] sm:h-[80vh]"
        >
          <!-- Close Button -->
          <div class="flex justify-end">
            <button @click="closeModal" class="btn btn-sm btn-outline rounded">
              ✕
            </button>
          </div>

          <!-- Search Input -->
          <div class="relative pt-2">
            <input
              type="text"
              class="w-full input input-bordered p-3 pl-10 rounded-md shadow-sm text-base"
              placeholder="Search movies or TV shows..."
              v-model="searchQuery"
              v-debounce:500ms="getSearch"
            />
            <svg
              class="absolute left-3 top-6 h-5 w-5 text-gray-400"
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
            <div role="tablist" class="tabs tabs-boxed">
              <div
                @click="listView = !listView"
                :class="listView == true ? 'tab-active' : ''"
                class="tab"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M7 9V7h14v2zm0 4v-2h14v2zm0 4v-2h14v2zM4 9q-.425 0-.712-.288T3 8t.288-.712T4 7t.713.288T5 8t-.288.713T4 9m0 4q-.425 0-.712-.288T3 12t.288-.712T4 11t.713.288T5 12t-.288.713T4 13m0 4q-.425 0-.712-.288T3 16t.288-.712T4 15t.713.288T5 16t-.288.713T4 17"
                  />
                </svg>
                <div class="">List</div>
              </div>

              <div
                @click="listView = !listView"
                :class="listView == false ? 'tab-active' : ''"
                class="tab"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M3 21h4.675v-4.675H3zm6.675 0h4.65v-4.675h-4.65zm6.65 0H21v-4.675h-4.675zM3 14.325h4.675v-4.65H3zm6.675 0h4.65v-4.65h-4.65zm6.65 0H21v-4.65h-4.675zM3 7.675h4.675V3H3zm6.675 0h4.65V3h-4.65zm6.65 0H21V3h-4.675z"
                  />
                </svg>
                <div class="">Grid</div>
              </div>
            </div>

            <button
              @click="clearResults"
              class="btn btn-sm btn-error rounded-md"
            >
              Clear
            </button>
          </div>

          <!-- Search Results -->
          <div class="mt-4 overflow-auto scroll-hidden space-y-4 max-h-[60vh]">
            <div
              class="gap-4"
              :class="
                listView
                  ? 'flex flex-col'
                  : 'grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 '
              "
            >
              <Container
                v-for="item in search.results[0].results"
                :key="item.id"
                :id="item.id"
                :poster="item.poster_path"
                :title="item.title || item.name"
                :year="item.release_date || item.first_air_date"
                :rating="item.vote_average"
                :overview="item.overview"
                :type="item.type"
                :listView="listView"
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
const listView = ref(true);

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
