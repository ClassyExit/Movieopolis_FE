<template>
  <div class="w-full md:h-fit">
    <div class="relative w-full max-w-sm">
      <input
        class="input focus:input-primary pl-8 pr-8"
        type=""
        :placeholder="props.placeholder"
        v-model="searchQuery"
        v-debounce:1500ms="getResults"
        :searchType="props.searchType"
      />

      <div class="absolute top-2.5 left-2 md:left-2">
        <Icon icon="material-symbols:search" width="20" height="20" />
      </div>

      <div
        v-if="searchQuery"
        class="text-error absolute top-2.5 right-4 cursor-pointer"
        @click="searchQuery = ''"
      >
        X
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useSearchStore } from "@/store/search";

const props = defineProps({
  placeholder: String,
  searchType: "movie" || "tv",
});

const searchStore = useSearchStore();

const searchQuery = ref("");

const getResults = () => {
  searchStore.getSearch(searchQuery, props.searchType);
};
</script>

<style scoped>
img:before {
  content: " ";
  background-image: url("@/assets/images/no-image.jpg");
  display: block;
  width: 156px;
  height: 225px;
}
</style>
