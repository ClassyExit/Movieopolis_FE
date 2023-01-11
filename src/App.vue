<template>
  <div v-if="!isLoading" class="bg-base-100">
    <router-view :key="$route.path"></router-view>
  </div>

  <div
    v-else
    class="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 flex items-center justify-center bg-base-100"
  >
    <Loading />
  </div>
</template>

<script setup>
import Loading from "./components/Loading.vue";
const isLoading = false;
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
