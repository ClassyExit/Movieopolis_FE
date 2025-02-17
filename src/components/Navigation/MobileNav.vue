<template>
  <div class="flex flex-col justify-between items-center w-full">
    <div v-if="!user.user" class="flex flex-row justify-evenly w-full">
      <router-link :to="{ name: 'Login' }" class="btn btn-ghost btn-sm"
        >Login</router-link
      >
      <router-link :to="{ name: 'Register' }" class="btn btn-primary btn-sm"
        >Register</router-link
      >
    </div>
    <Links />
  </div>
</template>

<script setup>
import { useUserStore } from "@/store/user";
import Links from "./Links.vue";

const user = useUserStore();
</script>

<style scoped></style>
