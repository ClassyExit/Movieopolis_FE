<template>
  <div class="max-w-7xl w-full text-left">
    <div class="max-h-[40rem] h-fit overflow-auto overflow-x-hidden">
      <div
        v-if="tvReviews.results.length"
        v-for="review in tvReviews.results"
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

      <div v-else class="text-center text-content2 pt-8">
        There are currently no reviews.
      </div>
    </div>
  </div>
</template>

<script setup>
import Reviews from "@/components/Reviews.vue";
import { useTVStore } from "@/store/tv";
import { storeToRefs } from "pinia";

const { tvReviews } = storeToRefs(useTVStore());
</script>
