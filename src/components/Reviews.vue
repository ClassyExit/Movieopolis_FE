<template>
  <div class="w-full">
    <div class="flex flex-col text-left text-sm">
      <div class="flex flex-row space-x-1">
        <span class="text-primary">@{{ props.author }} </span>
        <span class="text-neutral">•</span>
        <span class="text-neutral">{{ timeAgo }}</span>
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
import { ref, computed } from "vue";

const readMore = ref(false);

const props = defineProps({
  id: String,
  author: String,
  content: String,
  created: String, // ISO 8601 format (e.g., "2018-04-10T15:44:38.134Z")
});

const timeAgo = computed(() => {
  const createdDate = new Date(props.created);
  const now = new Date();
  const diffInSeconds = Math.floor((now - createdDate) / 1000);

  if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) return `${diffInDays}d ago`;
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) return `${diffInMonths}mo ago`;
  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears}y ago`;
});
</script>
