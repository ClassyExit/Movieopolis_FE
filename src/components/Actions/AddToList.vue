<template>
  <div v-if="userStore.user" class="flex items-center md:justify-between">
    <div
      class="btn btn-sm btn-outline btn-primary"
      v-if="isMarked"
      @click="remove(props.id)"
    >
      <Icon class="h-5 w-5" icon="material-symbols:bookmark" />
    </div>

    <div v-else @click="add()" class="btn btn-sm btn-outline btn-primary">
      <Icon class="h-5 w-5" icon="ic:outline-bookmark-add" />
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useLibraryStore } from "@/store/library";
import { useUserStore } from "@/store/user";

const props = defineProps({
  id: Number,
  poster: String,
  title: String,
  type: String,
  overview: String,
});

const libraryStore = useLibraryStore();
const userStore = useUserStore();

// Ensure library is an array before checking
const isMarked = computed(() => {
  if (!userStore.user) return false;

  return Array.isArray(libraryStore.library)
    ? libraryStore.library.some((item) => item.item_id === props.id)
    : false;
});

// Add item to library
const add = () => {
  libraryStore.addToLibrary({
    item_id: props.id,
    poster: props.poster,
    title: props.title,
    overview: props.overview,
    type: props.type,
  });
};

// Remove item from library
const remove = (id) => {
  libraryStore.removeFromLibrary(id);
};
</script>
