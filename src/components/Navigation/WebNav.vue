<template>
  <div class="flex flex-row justify-between items-center">
    <div class="">
      <router-link :to="{ name: 'Home' }" class="btn btn-ghost"
        >Home</router-link
      >

      <router-link :to="{ name: 'Reset' }" class="btn btn-ghost"
        >Reset</router-link
      >
    </div>

    <div class="flex flex-row items-center space-x-2">
      <ul class="menu menu-horizontal rounded-box">
        <li>
          <Theme />
        </li>
      </ul>
      <div class="divider text-neutral">|</div>
      <div>
        <div v-if="!userStore.user" class="flex flex-row space-x-2">
          <router-link :to="{ name: 'Login' }" class="btn btn-ghost btn-sm"
            >Login</router-link
          >
          <router-link :to="{ name: 'Register' }" class="btn btn-primary btn-sm"
            >Register</router-link
          >
        </div>
        <div v-else><Profile /></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Theme from "@/components/Theme/Theme.vue";
import Profile from "@/components/Navigation/Profile.vue";
import { useUserStore } from "@/store/user";

const userStore = useUserStore();
</script>
