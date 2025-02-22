<template>
  <div class="w-full flex flex-col space-y-12">
    <Upcoming />
    <Trending />
    <Popular />
    <TopRated />
  </div>
</template>

<script setup>
import Trending from "./Trending.vue";
import Popular from "./Popular.vue";
import TopRated from "./TopRated.vue";
import Upcoming from "./Upcoming.vue";
</script>

<style scoped></style>
