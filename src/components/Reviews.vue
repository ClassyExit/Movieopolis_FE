<template>
  <div class="w-full">
    <div class="flex flex-col text-left text-sm">
      <div class="flex flex-row space-x-2">
        <span class="text-primary">@{{ props.author }} </span>
        <span class="text-neutral">|</span>
        <span class="text-neutral">{{ props.created }}</span>
      </div>
      <div class="text-content-base">
        <span :class="readMore ? '' : 'line-clamp-2'">{{ props.content }}</span>

        <div
          @click="readMore = !readMore"
          v-if="props.content.length > 40"
          class="text-info cursor-pointer"
        >
          <span v-if="readMore">show less</span>
          <span v-else>read more...</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const readMore = ref(false);

const props = defineProps({
  id: String,
  author: String,
  content: String,
  created: String,
});
</script>

<style scoped></style>
