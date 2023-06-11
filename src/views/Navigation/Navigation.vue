<template>
  <nav class="relative w-full p-4 px-6 md:px-12 bg-base-300 text-base-content">
    <div class="flex flex-row justify-between items-center">
      <div class="flex flex-row space-x-16">
        <div class="flex items-center">
          <img src="@/assets/logo.png" class="h-8 w-8" alt="logo" />
          <h1 class="hidden md:block tracking-wide font-bold text-xl pl-4">
            Movieopolis
          </h1>
        </div>

        <ul class="hidden md:flex flex-row items-center space-x-8">
          <li
            class="text-lg focus:underline hover:underline underline-offset-8"
          >
            <router-link :to="{ name: 'Home' }" class="">Home </router-link>
          </li>
          <li
            class="text-lg focus:underline hover:underline underline-offset-8"
          >
            <router-link :to="{ name: 'Movies' }" class="">Movies</router-link>
          </li>
          <li
            class="text-lg focus:underline hover:underline underline-offset-8"
          >
            <router-link :to="{ name: 'TV' }" class="">TV Shows</router-link>
          </li>
          <li
            class="text-lg focus:underline hover:underline underline-offset-8"
          >
            <router-link :to="{ name: 'Discover' }" class=""
              >Discover</router-link
            >
          </li>
        </ul>
      </div>

      <div
        class="hidden md:flex flex-row items-center max-w-sm w-full space-x-3"
      >
        <Search />
      </div>
    </div>
  </nav>
</template>

<script setup>
import Search from "@/components/search/Search.vue";
</script>

<style lang="scss" scoped></style>
