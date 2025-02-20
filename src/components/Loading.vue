<template>
  <div
    wire:loading
    class="overflow-hidden flex flex-col items-center justify-center"
  >
    <span
      class="loading loading-infinity loading-lg"
      :class="randomColor()"
    ></span>
  </div>
</template>

<script setup>
// Define Tailwind color classes
const colors = ["text-primary", "text-secondary", "text-accent"];

// Function to randomly pick a color
const randomColor = () => colors[Math.floor(Math.random() * colors.length)];
</script>

<style></style>
