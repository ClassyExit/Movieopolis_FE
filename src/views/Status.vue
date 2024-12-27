<template>
  <div class="w-full flex flex-col items-center mt-4">
    <div
      class="w-full flex flex-col max-w-4xl bg-backgroundSecondary shadow-md rounded-lg gap-4 p-2"
    >
      <div class="text-primary text-2xl">API Status Page</div>
      <div class="flex flex-col md:flex-row gap-2 justify-center items-center">
        <span> Last Updated: {{ APIStatus.lastUpdated }}</span>
        <div class="btn" @click="useAPIStore().getAPIStatus()">
          GET API STATUS
        </div>
      </div>

      <div v-if="APIStatus.isLoading" class="">Running Tests...</div>
      <div
        v-else
        v-for="API in APIStatus.results"
        class="flex flex-row md:grid md:grid-cols-2 gap-2"
      >
        <span class="flex-1 text-right">{{ API.name }}:</span>
        <span
          class="justify-self-start p-1 border rounded"
          :class="
            API.status_code == 200 ? '  border-success  ' : 'border-error'
          "
          >{{ API.status_code }}</span
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAPIStore } from "@/store/API";
import { storeToRefs } from "pinia";

const { APIStatus } = storeToRefs(useAPIStore());
</script>
