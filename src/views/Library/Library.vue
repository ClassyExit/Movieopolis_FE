<template>
  <div class="">{{ library }}</div>
</template>

<script setup>
import { useLibraryStore } from "@/store/library";
import { storeToRefs } from "pinia";

const libraryStore = useLibraryStore();

const { library } = storeToRefs(libraryStore);
libraryStore.getFromLibrary();
</script>
