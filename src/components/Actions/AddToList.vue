<template>
  <div class="flex items-center md:justify-between">
    <div
      class="btn btn-sm btn-outline-primary"
      v-if="checkListIfMarked(id) == true"
      @click="removeFromList(id)"
    >
      <Icon icon="material-symbols:bookmark" width="25" height="25" />
    </div>

    <div
      v-else
      @click="
        addToList(id, poster, title_movie, title_tv, overview, media_type)
      "
      class="btn btn-sm btn-outline-primary"
    >
      <Icon icon="ic:outline-bookmark-add" width="25" height="25" />
    </div>
  </div>
</template>

<script setup>
import { useListStore } from "@/store/list";
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

  useListStore().addToList(details);
};

const removeFromList = (id) => {
  useListStore().removeFromList(id);
};

const checkListIfMarked = (id) => {
  if (!useUserStore().user) return;

  if (useListStore().list.filter((item) => item.id == id).length > 0)
    return true;
  return false;
};
</script>

<style scoped></style>
