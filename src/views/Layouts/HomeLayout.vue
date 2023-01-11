<template>
  <div class="flex flex-col min-h-screen min-w-screen bg-base-100">
    <div class="flex w-full items-center justify-center">
      <div aria-label="nav" class="block w-full">
        <Navigation />

        <MobileNav />
      </div>
    </div>

    <div
      class="relative w-full flex flex-grow px-4 md:px-6 mb-[70px] md:my-0 bg-base-100"
    >
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import Navigation from "../Navigation/Navigation.vue";
import MobileNav from "../Navigation/Mobile/MobileNav.vue";
</script>

<style lang="scss" scoped></style>
