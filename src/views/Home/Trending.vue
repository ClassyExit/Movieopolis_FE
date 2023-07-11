<template>
  <div class="w-full p-4 md:px-16 rounded text-content1">
    <div class="w-full bg-backgroundSecondary text-content2 rounded p-2">
      <div
        class="flex flex-col lg:flex-row items-start lg:space-x-2 text-left text-3xl text-primary pb-1"
      >
        <span>Trending</span>
        <div class="flex flex-row space-x-1">
          <div class="tabs tabs-boxed bg-base-100 w-fit">
            <span
              @click="selectedTrendingOption('all', trendingTime)"
              class="tab"
              :class="trendingOption == 'all' ? 'tab-active' : ''"
              >All</span
            >
            <span
              @click="selectedTrendingOption('movie', trendingTime)"
              class="tab"
              :class="trendingOption == 'movie' ? 'tab-active ' : ''"
              >Movie</span
            >
            <span
              @click="selectedTrendingOption('tv', trendingTime)"
              class="tab"
              :class="trendingOption == 'tv' ? 'tab-active' : ''"
              >TV Shows</span
            >
          </div>

          <div class="tabs tabs-boxed w-fit bg-base-100" @click="">
            <span
              @click="selectedTrendingOption(trendingOption, 'day')"
              class="tab tab-xs md:tab-md"
              :class="trendingTime == 'day' ? 'tab-active' : ''"
              >Daily</span
            >
            <span
              @click="selectedTrendingOption(trendingOption, 'week')"
              class="tab tab-xs md:tab-md"
              :class="trendingTime == 'week' ? 'tab-active' : ''"
              >Weekly</span
            >
          </div>
        </div>
      </div>

      <div v-if="trendingStore.isLoadingTrending"><Loading /></div>
      <div v-else class="flex flex-wrap gap-2">
        <Container
          v-for="item in trending.results"
          :key="(item.id, item.media_type)"
          :poster="`https://image.tmdb.org/t/p/w154/${item.poster_path}`"
          :title_movie="item.title"
          :title_tv="item.name"
          :year_tv="item.first_air_date"
          :year_movie="item.release_date"
          :rating="item.vote_average"
          :media_type="item.media_type"
          :type="item.media_type"
          @click="
            item.media_type == 'movie'
              ? getMovieStats(item.id)
              : getTVStats(item.id)
          "
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
