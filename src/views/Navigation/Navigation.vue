<template>
  <nav class="p-4 bg-base-300 text-base-content">
    <div class="flex flex-row px-4 md:px-12 justify-between items-center">
      <div class="flex flex-row space-x-16">
        <div class="flex items-center">
          <img src="@/assets/logo.png" class="h-8 w-8" />
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
            <router-link to="#" class="">Movies</router-link>
          </li>
          <li
            class="text-lg focus:underline hover:underline underline-offset-8"
          >
            <router-link to="#" class="">TV Shows</router-link>
          </li>
          <li
            class="text-lg focus:underline hover:underline underline-offset-8"
          >
            <router-link to="#" class="">Trending</router-link>
          </li>
        </ul>
      </div>

      <div class="">Right</div>
    </div>
  </nav>
</template>

<script setup></script>

<style lang="scss" scoped></style>
