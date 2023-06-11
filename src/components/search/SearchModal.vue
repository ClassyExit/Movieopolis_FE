<template>
  <teleport to="body">
    <input type="checkbox" id="mobileSearch" class="modal-toggle" />
    <div class="modal modal-bottom md:modal-middle">
      <div class="modal-box w-full max-w-5xl scrollbar-hide h-full bg-base-100">
        <div v-if="isLoadingSearch" class=""><Loading /></div>

        <div v-else class="w-full pt-6 flex flex-col">
          <label
            for="mobileSearch"
            class="btn btn-sm btn-circle btn-error absolute right-2 top-2"
            >✕</label
          >

          <div class="flex w-full h-fit justify-center items-center mt-4">
            <div class="w-full">
              <Search />
            </div>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useSearchStore } from "@/store/search";
import Loading from "../Loading.vue";
import Search from "@/components/search/Search.vue";

const searchStore = useSearchStore();

const { isLoadingSearch } = storeToRefs(searchStore);
</script>
