<template>
  <div class="w-full bg-black rounded-lg shadow-lg">
    <iframe
      :src="props.link"
      class="w-full rounded-lg scrollbar-hide"
      allowfullscreen
      :class="containerClass"
    ></iframe>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  link: String,
});

const containerClass = computed(() => {
  return "h-[500px] sm:h-[400px] md:h-[500px] lg:h-[800px] xl:h-[900px] ";
});
</script>
