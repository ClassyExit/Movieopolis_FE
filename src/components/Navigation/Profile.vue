<template>
  <div class="dropdown dropdown-end">
    <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
      <div class="w-24 rounded-full">
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
</template>

<script setup>
import { useUserStore } from "@/store/user";
import ProfilePic from "@/assets/icons/ProfilePic.vue";
</script>
