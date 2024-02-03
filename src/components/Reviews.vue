<template>
  <div class="bg-backgroundSecondary rounded">
    <div class="flex flex-col p-2">
      <div class="flex flex-row justify-between text-content2">
        <span>Review by: {{ author }}</span>

        <a
          :href="`${url}`"
          class="tooltip tooltip-bottom"
          data-tooltip="View full review"
        >
          <Icon icon="eva:external-link-outline" width="25" height="25" />
        </a>
      </div>
      <div class="line-clamp-5">{{ content }}</div>

      <span class="flex justify-end text-content2"
        >Upload Date: {{ updated.slice(0, 10) }}</span
      >
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  id: Number,
  author: String,
  content: String,
  updated: String,
  url: String,
});
</script>

<style scoped></style>
