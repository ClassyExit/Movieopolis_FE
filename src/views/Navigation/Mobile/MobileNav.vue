<template>
  <section
    id="bottom-navigation"
    class="block md:hidden h-16 fixed inset-x-0 bottom-0 z-40 bg-base-100 text-base-content"
  >
    <div id="tabs" class="flex justify-between h-full">
      <router-link
        :to="{ name: 'Home' }"
        class="w-full justify-center inline-block text-center pt-2 pb-1"
      >
        <Icon
          class="inline-block mb-1"
          icon="material-symbols:home-outline-rounded"
          width="25"
          height="25"
        />
        <span class="block text-xs">Home</span>
      </router-link>

      <router-link
        :to="{ name: 'Discover' }"
        class="w-full justify-center inline-block text-center pt-2 pb-1"
      >
        <Icon class="inline-block mb-1" icon="bxs:hot" width="25" height="25" />
        <span class="block text-xs">Discover</span>
      </router-link>

      <router-link
        :to="{ name: 'Movies' }"
        class="w-full justify-center inline-block text-center pt-2 pb-1"
      >
        <Icon
          class="inline-block mb-1"
          icon="fluent-mdl2:my-movies-t-v"
          width="25"
          height="25"
        />
        <span class="block text-xs">Movies</span>
      </router-link>
      <router-link
        :to="{ name: 'TV' }"
        class="w-full justify-center inline-block text-center pt-2 pb-1"
        aria-label="navigation"
      >
        <Icon
          class="inline-block mb-1"
          icon="ic:outline-live-tv"
          height="25"
          width="25"
        />
        <span class="block text-xs">TV Shows</span>
      </router-link>
    </div>
  </section>
</template>

<script setup></script>

<style scoped>
.router-link-active {
  background-color: theme("colors.base-200");
  /* width | style | color */
  border-top: 1px solid theme("colors.primary");
}
</style>
