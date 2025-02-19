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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  class="w-full h-full object-contain"
                >
                  <path
                    fill="currentColor"
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m0 4c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6m0 14c-2.03 0-4.43-.82-6.14-2.88a9.95 9.95 0 0 1 12.28 0C16.43 19.18 14.03 20 12 20"
                  />
                </svg>
              </div>
            </div>
            <ul
              tabindex="0"
              class="menu menu-sm dropdown-content bg-base-200 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <router-link
                  :to="{ name: 'Settings' }"
                  class="flex items-center space-x-2"
                >
                  <span>Settings</span>
                </router-link>
              </li>
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

const userStore = useUserStore();
</script>
