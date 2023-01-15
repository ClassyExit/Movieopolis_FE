<template>
  <div>
    <div dev-hint="mobile-view" class="md:hidden">
      <div class="flex items-center">
        <label class="swap swap-rotate">
          <!-- this hidden checkbox controls the state -->
          <input type="checkbox" v-model="isSearchOpen" />

          <!-- sun icon -->

          <div class="swap-off">
            <Icon
              icon="material-symbols:search-rounded"
              width="25"
              height="25"
            />
          </div>

          <div class="swap-on">
            <Icon
              icon="material-symbols:search-off-rounded"
              width="25"
              height="25"
            />
          </div>
        </label>
      </div>

      <div
        v-if="isSearchOpen"
        class="flex items-center justify-center absolute inset-x-0 top-16 h-fit z-50 bg-base-100"
      >
        <div class="w-full"><Search /></div>
      </div>
    </div>

    <div dev-hint="web-view" class="hidden md:block">
      <Search />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Search from "./Search.vue";

const isSearchOpen = ref(false);
</script>

<style lang="scss" scoped></style>
