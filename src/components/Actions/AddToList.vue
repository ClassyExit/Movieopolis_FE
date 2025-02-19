<template>
  <div class="flex items-center md:justify-between">
    <div
      class="btn btn-sm btn-outline"
      v-if="checkListIfMarked(id) == true"
      @click="removeFromList(id)"
    >
      <Icon class="h-5 w-5" icon="material-symbols:bookmark" />
    </div>

    <div
      v-else
      @click="
        addToList(id, poster, title_movie, title_tv, overview, media_type)
      "
      class="btn btn-sm btn-outline btn-primary"
    >
      <Icon class="h-5 w-5" icon="ic:outline-bookmark-add" />
    </div>
  </div>
</template>

<script setup>
import { useLibraryStore } from "@/store/library";
import { useUserStore } from "@/store/user";

const props = defineProps({
  id: Number,
  poster: String | undefined,
  title_movie: String | undefined,
  title_tv: String | undefined,
  media_type: String | " ",
  overview: String | undefined,
});

const addToList = (id, poster, title_movie, title_tv, overview, media_type) => {
  const details = {
    id: id,
    poster: poster,
    title: title_movie || title_tv,
    overview: overview,
    type: media_type,
  };

  useLibraryStore().addToList(details);
};

const removeFromList = (id) => {
  useLibraryStore().removeFromList(id);
};

const checkListIfMarked = (id) => {
  if (!useUserStore().user) return;

  if (useLibraryStore().data.list.filter((item) => item.id == id).length > 0)
    return true;
  return false;
};
</script>

<style scoped></style>
