<template>
  <div class="flex flex-col gap-4">
    <div class="">Videos here</div>
  </div>
</template>

<script setup>
import { useDiscoverStore } from "@/store/discover";
import FilterIcon from "@/assets/icons/FilterIcon.vue";
import Video from "@/components/Video.vue";

const discoverStore = useDiscoverStore();
</script>
