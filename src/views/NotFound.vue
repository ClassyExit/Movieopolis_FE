<template>
  <div
    class="container flex flex-col md:flex-row items-center justify-between text-paragraph bg-background h-screen min-w-full"
  >
    <div class="w-full lg:w-1/2 mx-8">
      <div class="text-7xl text-green-500 font-dark font-extrabold mb-8">
        404
      </div>
      <p class="text-2xl md:text-3xl font-light leading-normal mb-8">
        Sorry, we couldn't find the page you're looking for
      </p>

      <div class="flex flex-row justify-center space-x-2">
        <router-link
          :to="{ name: 'Home' }"
          class="btn px-5 text-sm font-medium shadow-2xl text-white transition-all duration-400 border border-transparent rounded-lg focus:outline-none bg-green-600 active:bg-red-600 hover:bg-red-700"
          >Home</router-link
        >
        <a
          class="btn px-5 text-sm font-medium shadow-2xl text-white transition-all duration-400 border border-transparent rounded-lg focus:outline-none bg-green-600 active:bg-red-600 hover:bg-red-700"
          @click="$router.go(-1)"
          :class="hasHistory ? 'flex' : 'hidden'"
          >Go back</a
        >
      </div>
    </div>

    <div class="w-full lg:flex lg:justify-end lg:w-1/2 mx-5 my-12">
      <img
        src="https://user-images.githubusercontent.com/43953425/166269493-acd08ccb-4df3-4474-95c7-ad1034d3c070.svg"
        class=""
        alt="Page not found"
      />
    </div>
  </div>
</template>

<script setup>
function hasHistory() {
  return window.history.length > 2;
}
</script>

<style lang="scss" scoped></style>
