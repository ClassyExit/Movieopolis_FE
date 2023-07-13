<template>
  <div v-if="!isLoading">
    <router-view :key="$route.path"></router-view>
  </div>

  <div
    v-else
    class="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 flex items-center justify-center bg-backgroundPrimary"
  >
    <Loading />
  </div>
</template>

<script setup>
import Loading from "@/components/Loading.vue";
const isLoading = false;
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

/* ===== Scrollbar CSS ===== */
/* Firefox */
* {
  scrollbar-width: thin;
  scrollbar-color: #555;
}

/* Chrome, Edge, and Safari */
*::-webkit-scrollbar {
  width: 6px;
}

*::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
}

*::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #555;
}
</style>
