<template>
  <nav
    class="w-screen p-4 md:px-16 md:py-2 bg-backgroundPrimary border-b border-border"
  >
    <div class="flex justify-between items-center">
      <!-- Web Navigation Links -->
      <div class="hidden md:flex">
        <slot name="web-left"> </slot>
      </div>

      <div class="hidden md:flex">
        <slot name="web-center"></slot>
      </div>

      <div class="hidden md:flex">
        <slot name="web-right"></slot>
      </div>

      <!-- Mobile View -->
      <div class="md:hidden flex flex-row justify-between items-center w-full">
        <slot name="mobile-drop"></slot>

        <div class="flex flex-row items-center">
          <img src="@/assets/logo.png" class="h-8 w-8" />
        </div>

        <slot name="mobile-right" class="flex flex-row items-center"> </slot>
      </div>
    </div>
  </nav>
</template>

<script setup></script>

<style scoped></style>
