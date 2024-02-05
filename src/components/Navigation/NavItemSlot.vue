<template>
  <router-link
    :to="{ name: props.to }"
    class="flex flex-col items-center justify-center px-6 py-4 w-fit rounded hover:bg-backgroundPrimary transition ease-in-out duration-300"
  >
    <div class="w-6 h-6 text-primary">
      <slot name="icon"></slot>
    </div>

    <span class="pt-2 text-base text-content1">{{ props.title }}</span>
  </router-link>
</template>

<script setup>
const props = defineProps({
  title: String,
  to: String,
});
</script>
