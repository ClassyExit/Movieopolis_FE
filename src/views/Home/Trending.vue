<template>
  <div class="w-full px-4 pb-4 md:px-16 rounded text-content1">
    <div class="w-full text-content2 rounded p-2 space-y-1">
      <div
        class="flex flex-col lg:flex-row lg:items-center lg:space-x-2 text-left text-3xl pb-1"
      >
        <span class="text-primary pb-1">Trending</span>
        <div class="flex flex-row space-x-2">
          <div class="flex flex-row space-x-2 overflow-auto scrollbar-hide">
            <div
              class="flex flex-row h-10 rounded-xl bg-backgroundSecondary text-content1 text-sm hover:cursor-pointer"
            >
              <span
                @click="selectedTrendingOption('all', trendingTime)"
                :class="trendingOption == 'all' ? ' border border-primary' : ''"
                class="min-w-[50px] text-center rounded-xl items-center justify-center flex p-2"
                >All</span
              >
              <span
                @click="selectedTrendingOption('movie', trendingTime)"
                :class="
                  trendingOption == 'movie' ? 'border border-primary' : ''
                "
                class="min-w-[50px] text-center rounded-xl items-center justify-center flex p-2"
                >Movie</span
              >
              <span
                @click="selectedTrendingOption('tv', trendingTime)"
                :class="trendingOption == 'tv' ? 'border border-primary' : ''"
                class="min-w-[50px] text-center rounded-xl items-center justify-center flex p-2"
                >TV Shows</span
              >
            </div>

            <div
              class="flex flex-row h-10 rounded-xl bg-backgroundSecondary text-content1 text-sm hover:cursor-pointer"
            >
              <span
                @click="selectedTrendingOption(trendingOption, 'day')"
                class="min-w-[50px] text-center rounded-xl items-center justify-center flex p-1 md:p-2"
                :class="trendingTime == 'day' ? 'border border-primary' : ''"
                >Daily</span
              >
              <span
                @click="selectedTrendingOption(trendingOption, 'week')"
                class="min-w-[50px] text-center rounded-xl items-center justify-center flex p-1 md:p-2"
                :class="trendingTime == 'week' ? 'border border-primary' : ''"
                >Weekly</span
              >
            </div>
          </div>
        </div>
      </div>

      <div v-if="trendingStore.isLoadingTrending"><Loading /></div>
      <div v-else class="flex flex-wrap gap-2">
        <Container
          v-for="item in trending.results"
          :key="(item.id, item.media_type)"
          :id="item.id"
          :poster="`https://image.tmdb.org/t/p/w154/${item.poster_path}`"
          :title_movie="item.title"
          :title_tv="item.name"
          :year_tv="item.first_air_date"
          :year_movie="item.release_date"
          :rating="item.vote_average"
          :media_type="item.media_type"
          :type="item.media_type"
          :overview="item.overview"
        >
        </Container>
      </div>
    </div>
  </div>
</template>

<script setup>
import Loading from "@/components/Loading.vue";
import Container from "@/components/Container.vue";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useTrendingStore } from "@/store/trending";

const trendingStore = useTrendingStore();

const { trending } = storeToRefs(trendingStore);

if (trendingStore.trending?.length == 0) {
  useTrendingStore().getTrendingContent();
}

let trendingOption = ref("all");
let trendingTime = ref("week");

const selectedTrendingOption = (media_type, time_window) => {
  // Update ref value and fetch new results
  trendingOption = media_type;
  trendingTime = time_window;
  useTrendingStore().getTrendingContent(media_type, time_window);
};
</script>

<style scoped></style>
