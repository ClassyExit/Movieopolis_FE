<template>
  <div class="drawer">
    <input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col">
      <!-- Navbar -->
      <div
        class="navbar w-full flex items-center bg-base-300 rounded-b-xl px-2 md:px-8"
      >
        <div class="flex lg:hidden">
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
        <router-link :to="{ name: 'Home' }" class="flex space-x-2">
          <img class="h-8 w-8" src="../../assets/logo.png" />
          <span class="hidden md:block">Movieopolis</span>
        </router-link>
        <div class="divider text-neutral">|</div>
        <div class="hidden flex-grow lg:block">
          <WebNav />
        </div>
      </div>
    </div>
    <div class="drawer-side">
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
import MobileNav from "./MobileNav.vue";
import WebNav from "./WebNav.vue";
</script>

<style scoped></style>
