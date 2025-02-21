<template>
  <div class="flex items-center">
    <button class="btn btn-sm btn-outline btn-primary" @click="openModal">
      <div class="flex flex-row items-center space-x-2">
        <svg
          class="h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M7 14h10q.425 0 .713-.288T18 13t-.288-.712T17 12H7q-.425 0-.712.288T6 13t.288.713T7 14m0-3h10q.425 0 .713-.288T18 10t-.288-.712T17 9H7q-.425 0-.712.288T6 10t.288.713T7 11m0-3h10q.425 0 .713-.288T18 7t-.288-.712T17 6H7q-.425 0-.712.288T6 7t.288.713T7 8M4 18q-.825 0-1.412-.587T2 16V4q0-.825.588-1.412T4 2h16q.825 0 1.413.588T22 4v15.575q0 .675-.612.938T20.3 20.3L18 18zm14.85-2L20 17.125V4H4v12zM4 16V4z"
          />
        </svg>
        <span v-if="movie.reviews.results.length" class="block">{{
          movie.reviews.results.length
        }}</span>
      </div>
    </button>

    <!-- Modal -->
    <Teleport to="body">
      <dialog
        ref="movieReviewModal"
        class="modal modal-bottom sm:modal-middle z-50"
      >
        <div
          class="modal-box space-y-2 flex flex-col sm:w-11/12 sm:max-w-5xl flex flex-col bg-base-200 h-[91.67vh] sm:h-[80vh] sm:absolute sm:top-12 sm:translate-y-0"
        >
          <div class="flex justify-end">
            <button @click="closeModal" class="btn btn-sm btn-outline">
              X
            </button>
          </div>

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
            v-else
            class="flex flex-col space-y-6 overflow-auto pb-4 md:pb-0"
          >
            <Reviews
              v-for="review in movie.reviews.results"
              :id="review.id"
              :author="review.author"
              :created="review.created_at"
              :content="review.content"
            />
          </div>
        </div>
      </dialog>
    </Teleport>
  </div>
</template>

<script setup>
import Reviews from "@/components/Reviews.vue";
import { useMovieStore } from "@/store/movies";
import { storeToRefs } from "pinia";
import { ref } from "vue";

const { movie } = storeToRefs(useMovieStore());

// Open and Close Modal
const movieReviewModal = ref(null);
const openModal = () => movieReviewModal.value?.showModal();
const closeModal = () => movieReviewModal.value?.close();
</script>
