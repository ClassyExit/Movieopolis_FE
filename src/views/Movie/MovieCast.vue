<template>
  <div
    v-if="movieCredits.cast.length"
    class="flex flex-col max-w-7xl w-full items-center justify-center"
  >
    <div
      class="flex flex-wrap gap-3 w-full"
      :class="showFullCast ? 'h-auto transition' : 'h-[20rem] overflow-hidden '"
    >
      <div v-for="person in movieCredits.cast">
        <div class="flex flex-col">
          <img
            v-if="person.profile_path"
            class="rounded"
            :src="`https://image.tmdb.org/t/p/w300/${person.profile_path}`"
            style="width: 100px; height: 150px"
            :title="person.name"
          />

          <div
            v-else
            class="bg-white h-[150px] w-[100px] rounded-lg opacity-20"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100"
              height="150"
              viewBox="0 0 24 24"
            >
              <path
                fill="black"
                d="M6 17c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1H6m9-9a3 3 0 0 1-3 3a3 3 0 0 1-3-3a3 3 0 0 1 3-3a3 3 0 0 1 3 3M3 5v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2"
              />
            </svg>
          </div>

          <span class="truncate max-w-[100px]">{{ person.name }}</span>
        </div>
      </div>
    </div>
    <div
      @click="showFullCast = !showFullCast"
      class="bg-backgroundSecondary w-full p-2 text-xl"
    >
      <div v-if="showFullCast" class="flex flex-row justify-center space-x-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M12 22a10 10 0 0 0 10-10A10 10 0 0 0 12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10m0-2a8 8 0 0 1-8-8a8 8 0 0 1 8-8a8 8 0 0 1 8 8a8 8 0 0 1-8 8m5-6l-5-5l-5 5z"
          /></svg
        ><span>Hide Cast</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M12 22a10 10 0 0 0 10-10A10 10 0 0 0 12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10m0-2a8 8 0 0 1-8-8a8 8 0 0 1 8-8a8 8 0 0 1 8 8a8 8 0 0 1-8 8m5-6l-5-5l-5 5z"
          />
        </svg>
      </div>
      <div v-else class="flex flex-row justify-center space-x-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2m0 2a8 8 0 0 1 8 8a8 8 0 0 1-8 8a8 8 0 0 1-8-8a8 8 0 0 1 8-8m-5 6l5 5l5-5z"
          /></svg
        ><span>Show Cast</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2m0 2a8 8 0 0 1 8 8a8 8 0 0 1-8 8a8 8 0 0 1-8-8a8 8 0 0 1 8-8m-5 6l5 5l5-5z"
          />
        </svg>
      </div>
    </div>
  </div>

  <div v-else class="">Unable to gather cast</div>
</template>

<script setup>
import { ref } from "vue";
import { useMovieStore } from "@/store/movies";
import { storeToRefs } from "pinia";

const movieStore = useMovieStore();

const { movieCredits } = storeToRefs(movieStore);

const showFullCast = ref(false);
</script>
