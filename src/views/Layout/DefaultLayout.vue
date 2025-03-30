<template>
  <div class="flex flex-col min-h-screen mx-4 lg:mx-8 xl:mx-16">
    <div class="bg-base-300 rounded-b-2xl sticky top-0 z-50">
      <Navbar />
    </div>
    <div class="flex flex-grow pt-4 lg:pt-8">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import Navbar from "@/components/Navigation/Navbar.vue";
import { useUserStore } from "@/store/user";

useUserStore().initializeAuth();
</script>

<style scoped></style>
