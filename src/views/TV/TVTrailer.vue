<template>
  <div v-if="!isEmpty(show.trailer)">
    <button class="btn btn-sm btn-secondary" onclick="show_trailer.showModal()">
      Watch Trailer
    </button>
    <dialog id="show_trailer" class="modal modal-bottom sm:modal-middle">
      <div class="modal-box">
        <div>
          <Video
            :id="show.trailer.id"
            :ytID="`${show.trailer.key}`"
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
import { useTVStore } from "@/store/tv";
import { storeToRefs } from "pinia";
import Video from "@/components/Trailer.vue";

const { show } = storeToRefs(useTVStore());

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}
</script>
