<template>
  <teleport to="body">
    <input type="checkbox" id="mobileSearch" class="modal-toggle" />
    <div class="modal modal-bottom sm:modal-middle">
      <div class="modal-box w-full max-w-5xl scrollbar-hide h-full bg-base-300">
        <div v-if="isLoadingSearch" class=""><Loading /></div>

        <div v-else class="w-full pt-6 flex-col">
          <label
            for="mobileSearch"
            class="btn btn-sm btn-circle absolute right-2 top-2"
            >✕</label
          >

          <div class="w-full mt-4 bg-white">
            <input class="w-full p-2 bg-base-100" />
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

const searchStore = useSearchStore();

const { isLoadingSearch } = storeToRefs(searchStore);
</script>
