<template>
  <div class="flex flex-row bg-backgroundSecondary rounded h-fit">
    <div
      @click="hideReview = !hideReview"
      class="w-[32px] flex items-center justify-center px-2 my-2 cursor-pointer"
    >
      <div
        v-if="!hideReview"
        class="w-[1px] h-full bg-primary text-primary rounded"
      ></div>

      <div v-else class="text-primary">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 512 512"
        >
          <path
            fill="currentColor"
            d="M64 64v128l48-48l48 48l32-32l-48-48l48-48zm256 0l48 48l-48 48l32 32l48-48l48 48V64zM64 320v128h128l-48-48l48-48l-32-32l-48 48zm288 0l-32 32l48 48l-48 48h128V320l-48 48z"
          />
        </svg>
      </div>
    </div>
    <div class="flex flex-col p-2 w-full h-full">
      <div class="flex flex-row justify-between text-content2">
        <div class="flex flex-row items-center space-x-2">
          <span>{{ author }}</span>
          <div class="dot"></div>
          <span class="flex justify-end text-content2">
            {{ updated.slice(0, 10) }}</span
          >
        </div>

        <a
          :href="`${url}`"
          class="tooltip tooltip-bottom"
          data-tooltip="View full review"
        >
          <Icon icon="eva:external-link-outline" width="25" height="25" />
        </a>
      </div>
      <div class="line-clamp-5" :class="hideReview ? 'hidden' : 'block'">
        {{ content }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const hideReview = ref(false);

const props = defineProps({
  id: String | Number,
  author: String,
  content: String,
  updated: String,
  url: String,
});
</script>

<style scoped></style>
