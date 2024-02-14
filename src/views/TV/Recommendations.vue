<template>
  <div
    aria-label="recommendations"
    class="flex flex-col bg-backgroundSecondary max-w-sm rounded-xl p-2 h-fit"
  >
    <div class="flex flex-row space-x-2 text-xl text-left p-1 text-content1">
      <Icon icon="fluent-mdl2:show-time-as" />
      <span>You many also like...</span>
    </div>
    <div class="overflow-auto h-fit md:h-full md:max-h-[60rem]">
      <div
        v-if="tvRecommendations.results.length"
        class="w-full flex flex-wrap gap-2"
      >
        <SmallContainer
          v-for="item in tvRecommendations.results"
          :key="item.id"
          :id="item.id"
          :poster="`https://image.tmdb.org/t/p/w154/${item.poster_path}`"
          :poster_base="item.poster_path"
          :title_tv="item.original_name"
          :year_tv="item.first_air_date"
          :rating="item.vote_average"
          :media_type="`tv`"
          :type="item.media_type"
        >
        </SmallContainer>
      </div>

      <div v-else class="">Sorry, unable to get recommendations</div>
    </div>
  </div>
</template>

<script setup>
import { useTVStore } from "@/store/tv";
import SmallContainer from "@/components/SmallContainer.vue";
import { storeToRefs } from "pinia";

const tvStore = useTVStore();
const { tvRecommendations } = storeToRefs(tvStore);
</script>
