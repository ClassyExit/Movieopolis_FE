<template>
  <div class="relative w-full rounded">
    <router-link
      v-if="media_type == 'movie'"
      class="hover:cursor-pointer"
      :to="{ name: 'Movie-Details', params: { id: id } }"
    >
      <div
        id="listView"
        class="hover:cursor-pointer flex flex-row bg-backgroundSecondary md:hover:bg-backgroundPrimary border border-border rounded-xl h-20"
      >
        <div class="flex flex-col w-3/4 justify-between p-1 px-2 w-4/5">
          <div
            class="flex line-clamp-1 items-center text-left rounded truncate"
          >
            <span>{{ title_movie }}</span>
            <span class="px-1">({{ year_movie?.slice(0, 4) }})</span>
          </div>

          <div class="flex items-center w-fit">
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
          </div>
        </div>

        <div class="w-1/5 flex items-center justify-end">
          <img
            v-if="poster_base"
            class="h-full object-contain z-10 rounded-lg"
            :src="`https://image.tmdb.org/t/p/w92/${poster}`"
            :alt="`${title_movie || title_tv} poster`"
          />

          <div
            v-else
            class="text-center items-center flex bg-border opacity-40 h-full rounded-lg w-[50px]"
          >
            No image
          </div>
        </div>
      </div>
    </router-link>

    <router-link
      v-else
      :to="{ name: 'TV-Details', params: { id: id } }"
      class="hover:cursor-pointer w-full flex flex-row bg-backgroundSecondary md:hover:bg-backgroundPrimary border border-border rounded-xl h-20"
    >
      <div class="flex flex-col w-4/5 justify-between p-1 px-2">
        <div
          class="flex flex-wrap items-center text-left rounded truncate space-x-2"
        >
          <span class="text-lg">{{ title_tv }}</span>
          <span class="text-content2">({{ year_tv?.slice(0, 4) }})</span>
        </div>

        <div class="flex items-center w-fit">
          <div class="flex flex-row items-center text-content2">
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
        </div>
      </div>

      <div class="flex w-1/5 items-end justify-end">
        <img
          v-if="poster_base"
          class="h-full object-contain z-10 rounded-lg"
          :src="`https://image.tmdb.org/t/p/w92/${poster}`"
          :alt="`${title_movie || title_tv} poster`"
        />

        <img
          v-else
          class="h-full object-contain z-10 rounded-lg"
          src="@/assets/images/no-image.jpg"
        />
      </div>
    </router-link>
  </div>
</template>

<script setup>
const props = defineProps({
  id: Number,
  poster: String | undefined,
  poster_base: String | undefined,
  title_movie: String | undefined,
  title_tv: String | undefined,
  year_tv: String | "0000",
  year_movie: String | "0000",
  rating: Number | undefined,
  media_type: String | " ",
  type: String | undefined,
  overview: String | undefined,
});
</script>

<style scoped></style>
