<template>
  <div
    class="flex flex-row justify-between items-center space-x-1 md:space-x-2"
  >
    <SearchGlobal />
    <Theme />

    <div class="flex flex-row items-center space-x-4">
      <!-- Auth status -->
      <div class="flex items-center justify-center">
        <div v-if="!userStore.user" class="hidden md:flex flex-row space-x-2">
          <router-link :to="{ name: 'Login' }" class="btn btn-ghost btn-sm"
            >Login</router-link
          >
          <router-link :to="{ name: 'Register' }" class="btn btn-primary btn-sm"
            >Register</router-link
          >
        </div>
        <div v-else class="flex items-center justify-center">
          <div class="dropdown dropdown-end">
            <div
              tabindex="0"
              role="button"
              class="flex items-center justify-center avatar"
            >
              <div class="w-8 rounded-full">
                <ProfilePic class="w-full h-full object-contain" />
              </div>
            </div>
            <ul
              tabindex="0"
              class="menu menu-sm dropdown-content bg-base-200 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li @click="useUserStore().logout()"><a>Logout</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Theme from "../Theme/Theme.vue";
import SearchGlobal from "../Search/SearchGlobal.vue";

import { useUserStore } from "@/store/user";
import ProfilePic from "@/assets/icons/ProfilePic.vue";

const userStore = useUserStore();
</script>
