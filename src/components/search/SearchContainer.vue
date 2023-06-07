<template>
  <div class="flex bg-base-300 hover:cursor-pointer h-[100px] w-full">
    <label
      :for="label"
      class="flex justify-between w-full hover:cursor-pointer"
    >
      <div class="flex flex-col space-y-8 w-full px-2">
        <span class="text-left line-clamp-1 text-md w-full">{{
          title_tv || title_movie
        }}</span>

        <div class="flex flex-row items-center space-x-1">
          <span class="flex items-center"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="w-4 h-4 fill-primary"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              ></path>
            </svg>
            {{ rating }}</span
          >
          <div class="rounded-full w-[5px] h-[5px] bg-primary"></div>
          <div class="">{{ year_tv?.slice(0, 4) }}</div>
          <div class="">{{ year_movie?.slice(0, 4) }}</div>
          <div class="rounded-full w-[5px] h-[5px] bg-primary"></div>
          <div class="">{{ media_type.toUpperCase() }}</div>
        </div>
      </div>

      <div class="scale-100">
        <img
          :src="props.poster"
          :title="props.title_movie"
          style="width: 92px; height: 100px"
        />
      </div>
    </label>
  </div>
</template>

<script setup>
const props = defineProps({
  poster: String | undefined,
  title_tv: String,
  title_movie: String,
  rating: Number,
  year_tv: String | undefined,
  year_movie: String | undefined,
  media_type: String,
  label: String,
});
</script>

<style scoped></style>
