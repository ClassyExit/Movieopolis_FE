<template>
  <div class="w-full flex flex-col space-y-12">
    <Upcoming />
    <Trending />
    <Popular />
    <TopRated />
  </div>
</template>

<script setup>
import { useHomeStore } from "@/store/homeStore";
import Trending from "./Trending.vue";
import Popular from "./Popular.vue";
import TopRated from "./TopRated.vue";
import Upcoming from "./Upcoming.vue";

useHomeStore().getHomeData();
</script>

<style scoped></style>
