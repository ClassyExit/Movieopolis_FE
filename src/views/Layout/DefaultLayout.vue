<template>
  <div class="flex flex-col h-screen mx-4 lg:mx-8 xl:mx-16">
    <div class="bg-base-300 rounded-b-2xl">
      <Navbar />
    </div>
    <div class="flex flex-grow pt-4 lg:pt-8">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import Navbar from "@/components/Navigation/Navbar.vue";
</script>

<style scoped></style>
