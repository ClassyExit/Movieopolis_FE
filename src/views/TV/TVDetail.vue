<template>TV Detail</template>

<script setup>
import { useRoute } from "vue-router";
import { ref } from "vue";
import { useTVStore } from "@/store/tv";
import Loading from "@/components/Loading.vue";
import { storeToRefs } from "pinia";

import AddToList from "@/components/Actions/AddToList.vue";
import MobileReturn from "@/components/Actions/MobileReturn.vue";

const tvStore = useTVStore();
const { show } = storeToRefs(tvStore);

// Select different options to show
const SelectedOption = ref("recommendations");
const updateSelectedOption = (newOption) => {
  SelectedOption.value = newOption;
};

const route = useRoute();
const id = route.params.id;

// Get TV show details
tvStore.getTVDetails(id);
</script>
