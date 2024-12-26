<template>
  <div class="">
    <div class="">API Status Page</div>

    <div class="">
      <div v-for="API in APIStatus.results" class="">g</div>
    </div>
  </div>
</template>

<script setup>
import { useAPIStore } from "@/store/API";
import { storeToRefs } from "pinia";

const { APIStatus } = storeToRefs(useAPIStore());

useAPIStore().getAPIStatus();
</script>
