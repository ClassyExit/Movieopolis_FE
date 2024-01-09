<template>
  <div class="flex items-center justify-center">
    <div v-if="checkListIfMarked(id) == true" @click="removeFromList(id)">
      <span class="tooltip tooltip-top" data-tooltip="Remove from list">
        <Icon icon="material-symbols:bookmark" width="25" height="25" />
      </span>
    </div>

    <div
      v-else
      @click="
        addToList(id, poster, title_movie, title_tv, overview, media_type)
      "
      class="tooltip tooltip-top"
    >
      <span class="tooltip tooltip-top" data-tooltip="Add to list">
        <Icon icon="ic:outline-bookmark-add" width="25" height="25" />
      </span>
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
