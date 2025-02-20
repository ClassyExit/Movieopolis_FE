<template>
  <div v-if="!useUserStore().user" class="w-full mx-auto flex justify-center">
    <div class="flex flex-col space-y-8 p-4 max-w-xl w-full pt-10">
      <div role="alert" class="alert alert-error">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>You must be signed in to use the library feature</span>
      </div>

      <router-link
        class="btn btn-outline btn-primary rounded text-xl p-2"
        :to="{ name: 'Login' }"
        >Login here</router-link
      >
    </div>
  </div>

  <div v-else class="w-full flex flex-col md:px-16 pt-4 space-y-4 p-4">
    <div class="flex flex-row items-center space-x-4 w-full">
      <span class="text-3xl text-content-base">My Library</span>

      <span class="btn btn-sm" @click="manualResync()">
        <Icon
          class="text-primary"
          icon="material-symbols:sync"
          width="20"
          height="20"
        />
      </span>
    </div>

    <div
      v-if="!library.length"
      class="flex h-2/5 items-center justify-center text-content2"
    >
      <div v-if="useLibraryStore().isLoading" class=""><Loading /></div>
      <span v-else>You haven't added any titles to your library yet</span>
    </div>

    <div v-else class="flex flex-col space-y-4">
      <div
        class="flex overflow-auto md:space-y-0 md:flex-wrap md:flex-row gap-2"
      >
        <LibraryCard
          v-for="item in library"
          :key="item.item_id"
          :id="item.item_id"
          :title="item.title"
          :overview="item.overview"
          :poster="item.poster"
          :type="item.type"
        >
        </LibraryCard>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useLibraryStore } from "@/store/library";
import { useUserStore } from "@/store/user";
import { storeToRefs } from "pinia";
import LibraryCard from "@/views/Library/LibraryCard.vue";
import Loading from "@/components/Loading.vue";

const libraryStore = useLibraryStore();

const { library } = storeToRefs(libraryStore);

if (libraryStore.library.length === 0) {
  libraryStore.getLibrary();
}

const manualResync = () => {
  libraryStore.getLibrary();
};
</script>
