<template>
  <div class="flex flex-col space-y-4 text-content-base">
    <div
      v-if="!movie.reviews.results.length"
      class="alert alert-shadow text-left"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        class="stroke-primary h-6 w-6 shrink-0"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
      <div>
        <h3 class="font-bold">There are no reviews yet</h3>
      </div>
    </div>

    <div
      class="bg-base-300 p-2 rounded"
      v-else
      v-for="review in movie.reviews.results"
    >
      <Reviews
        :id="review.id"
        :author="review.author"
        :created="review.created_at"
        :content="review.content"
      />
    </div>
  </div>
</template>

<script setup>
import Reviews from "@/components/Reviews.vue";
import { useMovieStore } from "@/store/movies";
import { storeToRefs } from "pinia";

const { movie } = storeToRefs(useMovieStore());
</script>
