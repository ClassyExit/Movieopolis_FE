<template>
  <div class="flex flex-col min-h-screen min-w-screen bg-base-300">
    <div class="flex w-full items-center justify-center">
      <div aria-label="nav" class="block w-full">
        <Navigation />

        <MobileNav />
      </div>
      <div aria-label="mobile-nav" class="md:hidden">
        <!-- <div><TopNav /></div> -->
        <div></div>
      </div>
    </div>

    <div class="relative w-full flex flex-grow mb-[72px] md:my-0">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import Navigation from "../Navigation/Navigation.vue";
import MobileNav from "../Navigation/Mobile/MobileNav.vue";
</script>

<style lang="scss" scoped></style>
