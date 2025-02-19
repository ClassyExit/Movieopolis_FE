<template>
  <div class="mx-auto w-full flex flex-col items-center justify-center">
    <div class="w-full max-w-xl p-4 shadow-lg space-y-8">
      <div class="flex">
        <router-link
          :to="{ name: 'Home' }"
          class="flex flex-row space-x-2 text-base-content hover:text-primary cursor-pointer"
        >
          <BackArrow />
          <span> Back to home </span>
        </router-link>
      </div>
      <slot name="body"></slot>
    </div>
  </div>
</template>

<script setup>
import BackArrow from "@/assets/icons/BackArrow.vue";
</script>
