<template>
  <div class="flex flex-col min-h-screen min-w-screen">
    <div class="flex w-full items-center justify-center">
      <div aria-label="nav" class="block w-full">
        <Navigation />

        <MobileNav />
      </div>
    </div>

    <div
      class="relative w-full flex flex-grow px-6 md:px-12 mb-[70px] md:my-0 bg-base-300"
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
