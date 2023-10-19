<template>
  <div class="hidden md:flex w-full justify-center items-center">
    <div
      class="max-w-6xl w-full flex flex-row h-4/5 bg-backgroundSecondary rounded shadow-xl divide-x divide-border"
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
  </div>
</template>

<script setup>
import { ref } from "vue";
import ChangePassword from "./ChangePassword.vue";
import DeleteAccount from "./DeleteAccount.vue";

const selectedOption = ref("changepassword");
</script>
