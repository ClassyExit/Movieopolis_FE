<template>
  <div class="max-w-7xl w-full text-left">
    <span class="w-full text-2xl">Reviews</span>
    <div class="h-fit overflow-auto overflow-x-hidden">
      <div
        v-if="movie.reviews.results"
        v-for="review in movie.reviews.results"
        class="py-2"
      >
        <Reviews
          :id="review.id"
          :author="review.author"
          :content="review.content"
          :updated="review.created_at"
          :url="review.url"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useMovieStore } from "@/store/movies";
import { storeToRefs } from "pinia";
import Reviews from "@/components/Reviews.vue";

const movieStore = useMovieStore();

const { movie } = storeToRefs(movieStore);
</script>
