<template>
  <div
    aria-label="recommendations"
    class="flex flex-col bg-backgroundSecondary max-w-sm rounded-xl p-2"
  >
    <div class="flex flex-row space-x-2 text-xl text-left p-1 text-content1">
      <Icon icon="fluent-mdl2:show-time-as" />
      <span>You many also like...</span>
    </div>
    <div class="overflow-auto h-fit max-h-[40rem] md:h-full md:max-h-none">
      <div
        v-if="movieRecommendations.results.length"
        class="w-full flex flex-wrap gap-2"
      >
        <SmallContainer
          v-for="item in movieRecommendations.results"
          :key="item.id"
          :id="item.id"
          :poster="`https://image.tmdb.org/t/p/w154/${item.poster_path}`"
          :poster_base="item.poster_path"
          :title_movie="item.title"
          :year_movie="item.release_date"
          :rating="item.vote_average"
          :media_type="`movie`"
          :type="item.media_type"
        >
        </SmallContainer>
      </div>

      <div v-else>Sorry, unable to get recommendations</div>
    </div>
  </div>
</template>

<script setup>
import { useMovieStore } from "@/store/movies";
import { storeToRefs } from "pinia";
import SmallContainer from "@/components/SmallContainer.vue";

const movieStore = useMovieStore();

const { movieRecommendations } = storeToRefs(movieStore);
</script>
