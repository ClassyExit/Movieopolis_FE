<template>
  <div
    class="relative w-full max-w-7xl h-0 pb-[56.25%] overflow-hidden rounded-lg shadow-lg"
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
// Props: Accept the YouTube video ID
const props = defineProps({
  ytID: String, // Youtube ID
  id: String,
  autoPlay: 0 | 1, // 0 - off; 1 - on
});
</script>
