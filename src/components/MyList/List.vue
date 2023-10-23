<template>
  <div
    class="flex flex-row w-full max-w-md bg-backgroundSecondary rounded shadow-xl"
  >
    <div class="flex flex-col justify-between w-2/3 text-left p-2">
      <div class="flex flex-col space-y-4">
        <span class="text-xl line-clamp-1 md:line-clamp-none">{{ title }}</span>
        <span class="text-sm text-content2 line-clamp-5 overflow-hidden">{{
          overview
        }}</span>
      </div>

      <div
        class="flex items-center justify-between w-full hover:cursor-pointer py-3"
      >
        <slot name="options"></slot>
      </div>
    </div>

    <div class="flex items-end justify-end">
      <img
        class="rounded object-scale-down h-48 w-fit md:object-contain md:h-[231px] md:w-[154px]"
        :src="props.poster"
        :title="props.title_tv"
      />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  id: Number,
  title: String | undefined,
  overview: String | undefined,
  poster: String | undefined,
  type: String,
});
</script>
