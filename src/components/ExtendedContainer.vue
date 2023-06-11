<template>
  <div class="w-full max-w-lg rounded">
    <label for="movie-details" class="hover:cursor-pointer">
      <div class="flex justify-between bg-base-300 rounded-lg">
        <div class="flex-1 space-y-8 p-2">
          <div class="text-2xl text-primary-content h-[64px]">{{ title }}</div>

          <div class="space-y-2">
            <div class="line-clamp-3">{{ overview }}</div>
            <div class="flex flex-row items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                class="w-6 h-6 fill-primary"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                ></path>
              </svg>
              <div class="space-x-1">
                <span>{{ rating }}</span>
                <span>({{ rating_amount }})</span>
              </div>
              <div class="rounded-full w-[5px] h-[5px] bg-primary"></div>
              <div class="">
                {{ release_date }}
              </div>
            </div>
          </div>
        </div>

        <div
          class="w-[100px] h-[200px] md:w-[185px] md:h-[277px] flex items-center justify-center"
        >
          <img
            class="rounded-r-lg"
            :src="props.poster"
            :title="props.title_movie"
          />
        </div>
      </div>
    </label>
  </div>
</template>

<script setup>
const props = defineProps({
  poster: String,
  title: String,
  overview: String,
  rating: Number,
  rating_amount: Number,
  release_date: String,
});
</script>

<style scoped></style>
