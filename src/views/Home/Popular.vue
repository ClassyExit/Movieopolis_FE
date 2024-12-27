<template>
  <div class="w-full p-4 md:px-16 space-y-4 rounded text-content1">
    <div class="w-full rounded p-2 space-y-1">
      <div
        class="text-left text-3xl text-primary flex flex-row items-center space-x-4 pb-1"
      >
        <span class="w-fit line-clamp-1">Popular Movies</span>

        <router-link
          :to="{ name: 'MoviesLayout' }"
          class="flex items-center badge badge-sm md:badge-md text-sm text-content1 bg-backgroundSecondary"
        >
          <span> View more</span>
          <Icon icon="ic:twotone-arrow-right" width="20" height="20" />
        </router-link>
      </div>

      <div v-if="homeStore.isLoading.popularMovies" class="skeleton h-64">
        <!-- <Loading /> -->
      </div>

      <div v-else class="flex gap-2 overflow-auto lg:flex-wrap">
        <Container
          v-for="item in movies.popularMovies?.results"
          :key="item.id"
          :id="item.id"
          :poster="item.poster_path"
          :title_movie="item.title"
          :year_tv="item.first_air_date"
          :year_movie="item.release_date"
          :rating="item.vote_average"
          :media_type="`movie`"
          :type="item.media_type"
          :overview="item.overview"
        >
        </Container>
      </div>
    </div>

    <div class="w-full rounded p-2 space-y-1">
      <div
        class="text-left text-3xl text-primary flex flex-row items-center space-x-4 pb-1"
      >
        <span class="line-clamp-1">Popular Shows</span>

        <router-link
          :to="{ name: 'TVLayout' }"
          class="flex items-center badge badge-sm md:badge-md text-sm text-content1 bg-backgroundSecondary"
        >
          <span> View more</span>
          <Icon icon="ic:twotone-arrow-right" width="20" height="20" />
        </router-link>
      </div>

      <div v-if="homeStore.isLoading.popularTVShows" class="skeleton h-64">
        <!-- <Loading /> -->
      </div>

      <div v-else class="flex gap-2 overflow-auto lg:flex-wrap">
        <Container
          v-for="item in movies.popularTVShows?.results"
          :key="item.id"
          :id="item.id"
          :poster="item.poster_path"
          :title_tv="item.name"
          :year_tv="item.first_air_date"
          :year_movie="item.release_date"
          :rating="item.vote_average"
          :media_type="`tv`"
          :type="item.media_type"
        >
        </Container>
      </div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import Container from "@/components/Container.vue";
import { useHomeStore } from "@/store/homeStore";

const homeStore = useHomeStore();
const { movies } = storeToRefs(homeStore);

/**** Popular Movies *****/
if (homeStore.movies.popularMovies?.length == 0) {
  const page = 1;
  homeStore.getPopularMoviesHome(page);
}

/**** Popular TV Shows *****/
if (homeStore.movies.popularTVShows?.length == 0) {
  const page = 1;
  homeStore.getPopularTVHome(page);
}
</script>
