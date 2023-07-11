<template>
  <div class="w-full max-w-[154px] rounded">
    <label
      for="movie-details"
      v-if="media_type == 'movie'"
      class="hover:cursor-pointer"
    >
      <img
        class="rounded-t-lg"
        :src="props.poster"
        :title="props.title_movie"
        style="width: 154px; height: 231px"
      />

      <div
        class="flex flex-row text-sm p-1 bg-base-100 justify-between border-b border-slate-600"
      >
        <div class="flex flex-row items-center">
          <div class="stat-figure text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="w-4 h-4 fill-current"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              ></path>
            </svg>
          </div>
          {{ rating.toFixed(2) }}
        </div>

        <div class="flex flex-row items-center">
          <span>{{ year_movie.slice(0, 4) }}</span>
        </div>
      </div>
      <div
        class="bg-base-100 rounded-b-lg p-1 flex items-center justify-center text-ellipsis overflow-hidden line-clamp-1"
      >
        {{ title_movie }}
      </div>
    </label>

    <label for="tv-details" v-else class="hover:cursor-pointer">
      <img
        class="rounded-t-lg"
        :src="props.poster"
        :title="props.title_tv"
        style="width: 154px; height: 231px"
      />

      <div
        class="flex flex-row text-sm p-1 bg-base-100 justify-between border-b border-slate-600"
      >
        <div class="flex flex-row items-center">
          <div class="stat-figure text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="w-4 h-4 fill-current"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              ></path>
            </svg>
          </div>
          {{ rating.toFixed(2) }}
        </div>

        <div class="flex flex-row items-center">
          <span>{{ year_tv.slice(0, 4) }}</span>
        </div>
      </div>
      <div
        class="bg-base-100 rounded-b-lg p-1 flex items-center justify-center text-ellipsis overflow-hidden line-clamp-1"
      >
        {{ title_tv }}
      </div>
    </label>
  </div>
</template>

<script setup>
const props = defineProps({
  poster: String | undefined,
  title_movie: String | undefined,
  title_tv: String | undefined,
  year_tv: String | "0000",
  year_movie: String | "0000",
  rating: Number | undefined,
  media_type: String | " ",
  type: String | undefined,
});
</script>

<style scoped></style>
