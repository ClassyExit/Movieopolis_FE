<template>
  <div
    class="relative w-full overflow-hidden rounded-lg shadow-lg"
    :class="containerClass"
  >
    <iframe
      :src="`https://www.youtube.com/embed/${props.ytID}?autoplay=${props.autoPlay}`"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
      class="absolute top-0 left-0 w-full h-full"
    ></iframe>
  </div>
</template>

<script setup>
import { computed } from "vue";

// Props: Accept the YouTube video ID and autoplay state
const props = defineProps({
  ytID: String, // YouTube Video ID
  id: String,
  autoPlay: Number, // 0 - Off; 1 - On
});

// Dynamic container class based on screen size
const containerClass = computed(() => {
  return "h-[500px] sm:h-[400px] md:h-[500px] lg:h-[800px] xl:h-[900px]";
});
</script>
