<template>
  <div
    class="relative w-full rounded"
    :class="listView ? 'w-full ' : 'max-w-[154px]'"
  >
    <div class="absolute right-2 top-1 z-40 hover:cursor-pointer text-white">
      <AddToList
        :id="id"
        :poster="poster"
        :title_tv="title_tv"
        :title_movie="title_movie"
        :media_type="media_type"
        :overview="overview"
      />
    </div>

    <router-link
      v-if="media_type == 'movie'"
      class="hover:cursor-pointer"
      :to="{ name: 'Movie-Details', params: { id: id } }"
    >
      <div
        id="listView"
        v-if="props.listView == true"
        class="flex flex-row h-16 w-full bg-backgroundSecondary hover:bg-backgroundPrimary border border-border rounded-xl px-4 justify-between"
      >
        <div class="flex flex-wrap items-center text-left rounded truncate">
          <span class="">{{ title_movie }}</span>
          <span class="px-1">({{ year_movie?.slice(0, 4) }})</span>
        </div>

        <div class="flex items-center w-fit px-4">
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

      <div id="cardView" v-else class="shadow rounded">
        <img
          class="rounded-t-lg"
          :src="props.poster"
          :title="props.title_movie"
          style="width: 154px; height: 231px"
        />

        <div
          class="flex flex-row text-sm p-1 bg-backgroundSecondary justify-between border-b border-slate-600"
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
            <span>{{ year_movie?.slice(0, 4) }}</span>
          </div>
        </div>
        <div
          class="bg-backgroundSecondary rounded-b-lg p-1 flex items-center justify-center h-16"
        >
          <span class="line-clamp-2">{{ title_movie }} </span>
        </div>
      </div>
    </router-link>

    <router-link
      :to="{ name: 'TV-Details', params: { id: id } }"
      v-else
      class="hover:cursor-pointer"
    >
      <div
        id="listView"
        v-if="props.listView == true"
        class="flex flex-row h-16 w-full bg-backgroundSecondary hover:bg-backgroundPrimary border border-border rounded-xl px-4 justify-between"
      >
        <div class="flex flex-wrap items-center text-left rounded truncate">
          <span class="">{{ title_tv }}</span>
          <span class="px-1">({{ year_tv?.slice(0, 4) }})</span>
        </div>

        <div class="flex items-center w-fit px-4">
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

      <div v-else class="bg-backgroundSecondary shadow rounded">
        <img
          class="rounded-t-lg"
          :src="props.poster"
          :title="props.title_tv"
          style="width: 154px; height: 231px"
        />

        <div
          class="flex flex-row text-sm p-1 justify-between border-b border-slate-600"
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
            <span>{{ year_tv?.slice(0, 4) }}</span>
          </div>
        </div>
        <div
          class="rounded-b-lg p-1 flex items-center justify-center overflow-hidden line-clamp-2 h-16"
        >
          <span class="line-clamp-2">{{ title_tv }}</span>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script setup>
import AddToList from "@/components/Actions/AddToList.vue";

const props = defineProps({
  id: Number,
  poster: String | undefined,
  title_movie: String | undefined,
  title_tv: String | undefined,
  year_tv: String | "0000",
  year_movie: String | "0000",
  rating: Number | undefined,
  media_type: String | " ",
  type: String | undefined,
  overview: String | undefined,
  listView: Boolean,
});
</script>

<style scoped></style>
