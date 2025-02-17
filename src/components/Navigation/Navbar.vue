<template>
  <div class="drawer">
    <input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col">
      <!-- Navbar -->
      <div
        class="navbar w-full flex items-center bg-base-300 rounded-b-xl px-2 md:px-4"
      >
        <!-- Mobile sidebar -->
        <div class="flex md:hidden">
          <label
            for="my-drawer-3"
            aria-label="open sidebar"
            class="btn btn-square btn-ghost"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="inline-block h-6 w-6 stroke-current"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </label>
        </div>

        <!-- Logo -->
        <router-link
          :to="{ name: 'Home' }"
          class="hidden md:flex flex-row space-x-2"
        >
          <img class="h-8 w-8" src="../../assets/logo.png" />
          <div class="">Movieopolis</div>
        </router-link>

        <!-- Navigation -->
        <div
          class="flex-1 flex-row items-center justify-end md:justify-between space-x-4"
        >
          <div class="hidden md:flex pl-8"><Links /></div>

          <WebNav />
        </div>
      </div>
    </div>

    <div class="drawer-side z-50">
      <label
        for="my-drawer-3"
        aria-label="close sidebar"
        class="drawer-overlay"
      ></label>
      <div class="menu bg-base-200 min-h-full w-80 p-4">
        <!-- Sidebar content here -->
        <MobileNav />
      </div>
    </div>
  </div>
</template>

<script setup>
import Theme from "../Theme/Theme.vue";
import MobileNav from "./MobileNav.vue";
import WebNav from "./WebNav.vue";
import Links from "./Links.vue";
</script>

<style scoped></style>
