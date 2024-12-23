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
        <div class="flex flex-row items-center justify-between">
          <div>
            <input
              class="input focus:input-primary pl-8 pr-8"
              type=""
              placeholder="Search for movies, shows..."
              v-model="searchQuery"
              v-debounce:300ms="getResults"
            />
          </div>
          <div @click="openModal = !openModal" class="btn btn-sm btn-ghost">
            Cancel
          </div>
        </div>
        <span>Recent searches</span>

        <div>results here</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import MagnifyingGlass from "@/assets/Icons/MagnifyingGlass.vue";
import { useSearchStore } from "@/store/search";
import { get } from "core-js/core/dict";
import { storeToRefs } from "pinia";
import { ref } from "vue";

const searchStore = useSearchStore();
const { search } = storeToRefs(searchStore);

const openModal = ref(false);
const searchQuery = ref("");

const getResults = () => {
  //   searchStore.getSearch(searchQuery, props.searchType);

  console.log("Results..");
};
</script>

<style></style>
