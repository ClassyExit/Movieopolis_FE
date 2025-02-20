<template>
  <div class="flex flex-col" style="min-width: 154px">
    <img
      v-if="props.profile_path"
      class="rounded"
      :src="`https://image.tmdb.org/t/p/w300/${props.profile_path}`"
      style="width: 150px; height: 225px"
      :title="props.name"
    />
    <div v-else class="bg-white h-[225px] w-[150px] rounded-lg opacity-20">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="150"
        height="225"
        viewBox="0 0 24 24"
      >
        <path
          fill="black"
          d="M6 17c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1H6m9-9a3 3 0 0 1-3 3a3 3 0 0 1-3-3a3 3 0 0 1 3-3a3 3 0 0 1 3 3M3 5v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2"
        />
      </svg>
    </div>
    <div class="flex flex-col text-left text-xs">
      <span class="text-base-content truncate" style="max-width: 154px">{{
        props.name
      }}</span>
      <span class="text-neutral truncate" style="max-width: 154px">{{
        props.character
      }}</span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  id: Number,
  name: String,
  character: String,
  profile_path: String,
});
</script>
