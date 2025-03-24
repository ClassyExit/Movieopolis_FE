<template>
  <div class="w-full">
    <div v-if="isLoading.home" class="skeleton h-64">
      <!-- <Loading /> -->
    </div>
    <div v-else>
      <vue-horizontal responsive snap="start">
        <ExtendedContainer
          class="mx-5 z-10"
          v-for="item in movies.upcoming.results"
          :key="item.id"
          :id="item.id"
          :poster="`https://image.tmdb.org/t/p/w185/${item.poster_path}`"
          :backdrop="item.backdrop_path ? item.backdrop_path : null"
          :title="item.original_title"
          :overview="item.overview"
          :rating="item.vote_average"
          :rating_count="item.vote_count"
          :release_date="item.release_date"
          :isMobile="isMobile"
        />
      </vue-horizontal>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useHomeStore } from "@/store/homeStore";
import ExtendedContainer from "@/components/Containers/ExtendedContainer.vue";
import VueHorizontal from "vue-horizontal";
import { storeToRefs } from "pinia";

// Store references
const { movies, isLoading } = storeToRefs(useHomeStore());

// Mobile detection
const isMobile = ref(window.matchMedia("(max-width: 768px)").matches);

const updateIsMobile = () => {
  isMobile.value = window.matchMedia("(max-width: 768px)").matches;
};

// Listen for screen size changes
onMounted(() => {
  window.addEventListener("resize", updateIsMobile);
  updateIsMobile();
});

onUnmounted(() => {
  window.removeEventListener("resize", updateIsMobile);
});
</script>
