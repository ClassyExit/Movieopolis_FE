<template>
  <div class="w-full flex flex-col space-y-4">
    <div class="flex justify-end items-center space-x-4">
      <AddToList
        :id="discover.trailer.id"
        :poster="discover.trailer.poster"
        :title="discover.trailer.title"
        :type="discover.trailer.type"
        :overview="discover.trailer.overview"
      />
      <div class="btn btn-sm">
        <div
          @click="toggleValue"
          class="cursor-pointer flex flex-row text-content-base space-x-2"
        >
          <span class="">Autoplay</span>
          <span :class="autoPlay.value === 1 ? 'text-success' : 'text-error'">{{
            autoPlay.state
          }}</span>
        </div>
      </div>

      <div @click="loadNewTrailer()" class="btn btn-sm btn-primary">Next</div>
    </div>

    <div v-if="discover.isLoading" class="skeleton"></div>
    <div v-else class="flex w-full bg-base-300">
      <Video
        :id="discover.trailer.id"
        :ytID="discover.trailer.trailerKey"
        :autoPlay="autoPlay.value"
      ></Video>
    </div>
  </div>
</template>

<script setup>
import { useDiscoverStore } from "@/store/discover";
import Video from "@/components/Video.vue";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import AddToList from "@/components/Actions/AddToList.vue";

// Autoplay toggle state
const autoPlay = ref({
  value: 0, // 0 = off, 1 = on
  state: "OFF",
});

const toggleValue = () => {
  autoPlay.value.value = autoPlay.value.value === 1 ? 0 : 1;
  autoPlay.value.state = autoPlay.value.value === 1 ? "ON" : "OFF";
};

const discoverStore = useDiscoverStore();
const { discover } = storeToRefs(discoverStore);

discoverStore.getTrailer();

const loadNewTrailer = () => {
  discoverStore.getTrailer();
};
</script>
