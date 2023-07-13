<template>
  <div class="w-full flex flex-col space-y-4 overflow-none">
    <New />
    <Trending />
    <Popular />
  </div>
</template>

<script setup>
import Trending from "@/views/Home/Trending.vue";
import New from "@/views/Home/New.vue";
import Popular from "./Popular.vue";
</script>

<style scoped>
img:before {
  content: " ";
  background-image: url("@/assets/images/no-image.jpg");
  display: block;
  width: 154px;
  height: 231px;
}
</style>
