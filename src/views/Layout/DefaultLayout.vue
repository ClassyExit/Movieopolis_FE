<template>
  <div class="flex flex-col h-screen">
    <div class="mx-2 md:mx-16 bg-base-300 rounded-b-2xl">
      <Navbar />
    </div>
    <div class="flex flex-grow px-2 md:px-16 pt-4">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from "@/store/user";
import { storeToRefs } from "pinia";
import Navbar from "@/components/Navigation/Navbar.vue";
import Loading from "@/components/Loading.vue";
const { user } = storeToRefs(useUserStore());
</script>

<style scoped></style>
