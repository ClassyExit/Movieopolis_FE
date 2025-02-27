<template>
  <div v-if="!isEmpty(movie.trailer)">
    <button
      class="btn btn-sm btn-secondary"
      onclick="movie_trailer.showModal()"
    >
      Watch Trailer
    </button>
    <dialog id="movie_trailer" class="modal modal-bottom sm:modal-middle">
      <div class="modal-box">
        <div>
          <Video
            :id="movie.trailer.id"
            :ytID="`${movie.trailer.key}`"
            :autoPlay="0"
          ></Video>
        </div>

        <div class="modal-action">
          <form method="dialog">
            <!-- if there is a button in form, it will close the modal -->
            <button class="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  </div>
</template>

<script setup>
import { useMovieStore } from "@/store/movies";
import { storeToRefs } from "pinia";
import Video from "@/components/Trailer.vue";

const { movie } = storeToRefs(useMovieStore());

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}
</script>
