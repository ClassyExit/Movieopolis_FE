<template>
  <div class="block md:flex w-full justify-center items-center">
    <div
      class="hidden md:flex max-w-6xl w-full flex flex-row h-4/5 bg-backgroundSecondary rounded shadow-xl divide-x divide-border"
    >
      <div class="w-1/5 text-left">
        <nav class="menu w-full bg-gray-2 p-2 rounded-md h-full">
          <ul class="menu-items">
            <li @click="selectedOption = 'changepassword'" class="menu-item">
              Change Password
            </li>
            <router-link :to="{ name: 'Delete' }" class="text-error menu-item"
              >Delete Account</router-link
            >
          </ul>
        </nav>
      </div>

      <div class="flex flex-1 justify-center items-center overflow-auto">
        <ChangePassword v-if="selectedOption == 'changepassword'" />
      </div>
    </div>

    <div class="md:hidden pt-8 px-8">
      <div class="pb-6 text-left text-xl">Settings</div>
      <div class="space-y-4">
        <router-link
          :to="{ name: 'ChangePassword' }"
          class="flex flex-row items-center rounded bg-backgroundSecondary p-3"
        >
          <div class="flex justify-center text-primary w-1/5">
            <Icon icon="mdi:password-outline" width="25" height="25" />
          </div>
          <span>Change Password</span>
        </router-link>

        <router-link
          :to="{ name: 'Delete' }"
          class="flex flex-row items-center rounded bg-backgroundSecondary p-3"
        >
          <div class="flex justify-center text-error w-1/5">
            <Icon icon="mdi:alert-outline" width="25" height="25" />
          </div>
          <span class="text-error">Delete Account</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import ChangePassword from "./ChangePassword.vue";

const selectedOption = ref("changepassword");
</script>
