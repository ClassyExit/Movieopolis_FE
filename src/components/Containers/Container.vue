<template>
  <div class="relative w-full rounded" :class="listView ? '' : 'max-w-[154px]'">
    <div class="absolute right-2 top-1 z-40 hover:cursor-pointer text-white">
      <AddToList
        :id="props.id"
        :poster="props.poster"
        :title="props.title_tv || props.title_movie"
        :type="props.type"
        :overview="props.overview"
      />
    </div>

    <router-link :to="detailsLink" class="hover:cursor-pointer">
      <div
        v-if="listView"
        class="flex flex-row h-16 w-full bg-base-300 hover:bg-base-100 border border-border rounded-xl px-4 justify-between"
      >
        <div class="flex flex-wrap items-center text-left rounded truncate">
          <span>{{ title }}</span>
          <span class="px-1">({{ year }})</span>
        </div>

        <div class="flex items-center w-fit px-4 pr-12">
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
            <span>{{ rating ? rating.toFixed(2) : "N/A" }}</span>
          </div>
        </div>
      </div>

      <div v-else class="w-[154px] h-fit shadow rounded-md">
        <img
          v-if="poster"
          class="rounded-t-lg"
          :src="`https://image.tmdb.org/t/p/w154/${poster}`"
          :alt="title"
          style="width: 154px; height: 231px"
        />
        <div
          v-else
          class="flex items-center justify-center bg-white w-[154px] h-[231px] rounded-md opacity-30"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="96"
            height="96"
            viewBox="0 0 32 32"
          >
            <path
              fill="black"
              d="M30 3.414L28.586 2L2 28.586L3.414 30l2-2H26a2.003 2.003 0 0 0 2-2V5.414zM26 26H7.414l7.793-7.793l2.379 2.379a2 2 0 0 0 2.828 0L22 19l4 3.997zm0-5.832l-2.586-2.586a2 2 0 0 0-2.828 0L19 19.168l-2.377-2.377L26 7.414zM6 22v-3l5-4.997l1.373 1.374l1.416-1.416l-1.375-1.375a2 2 0 0 0-2.828 0L6 16.172V6h16V4H6a2.002 2.002 0 0 0-2 2v16z"
            />
          </svg>
        </div>

        <div
          class="flex flex-col text-sm bg-base-300 justify-between rounded-b-lg p-2"
        >
          <div class="text-left line-clamp-1 text-xs">{{ props.title }}</div>
          <div class="flex flex-row items-center justify-between space-x-1">
            <div class="flex flex-row items-center space-x-1">
              <div>
                <div class="rating rating-xs">
                  <input
                    v-for="star in computedRating"
                    :key="star"
                    type="radio"
                    name="rating"
                    class="mask mask-star-2 bg-orange-400"
                    disabled
                  />
                </div>
              </div>
              <div class="flex text-xs text-neutral h-full items-centers">
                {{ rating ? rating.toFixed(2) : "N/A" }}
              </div>
            </div>
            <div class="flex flex-row items-center">
              <span>{{ year }}</span>
            </div>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script setup>
import AddToList from "@/components/Actions/AddToList.vue";
import { computed } from "vue";

const props = defineProps({
  id: { type: Number, required: true },
  poster: { type: String, default: "" },
  title: { type: String, default: "" },
  year: { type: String, default: "" },
  rating: { type: Number, default: 0 },
  type: { type: String, required: true },
  overview: { type: String, default: "" },
  listView: { type: Boolean, default: false },
});

const title = computed(() => props.title_movie || props.title_tv || "Unknown");
const year = computed(() => (props.year || "").slice(0, 4));

// Convert rating (out of 10) to a 5-star scale
const computedRating = computed(() => Math.round(props.rating / 2));

const detailsLink = computed(() => ({
  name: props.type === "movie" ? "Movie-Details" : "TV-Details",
  params: { id: props.id },
}));
</script>
