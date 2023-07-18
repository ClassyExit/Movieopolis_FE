<template>
  <div class="w-full space-y-12 p-4 md:px-16 rounded">
    <div class="w-full bg-backgroundSecondary rounded p-2 space-y-1">
      <div
        class="text-left text-3xl text-primary flex flex-row items-center space-x-4 pb-1"
      >
        <span>Popular Movies</span>

        <router-link
          :to="{ name: 'MoviesLayout' }"
          class="flex items-center badge badge-md text-sm text-content1"
        >
          <span> View more</span>
          <Icon icon="ic:twotone-arrow-right" width="20" height="20" />
        </router-link>
      </div>

      <div v-if="movieStore.isLoadingPopularHome" class=""><Loading /></div>

      <div v-else class="flex flex-wrap gap-2">
        <Container
          v-for="item in popularMoviesHome.results"
          :key="item.id"
          :id="item.id"
          :poster="`https://image.tmdb.org/t/p/w154/${item.poster_path}`"
          :title_movie="item.title"
          :year_tv="item.first_air_date"
          :year_movie="item.release_date"
          :rating="item.vote_average"
          :media_type="`movie`"
          :type="item.media_type"
        >
        </Container>
      </div>
    </div>

    <div class="w-full bg-backgroundSecondary rounded p-2 space-y-1">
      <div
        class="text-left text-3xl text-primary flex flex-row items-center space-x-4 pb-1"
      >
        <span>Popular Shows</span>

        <router-link
          :to="{ name: 'TVLayout' }"
          class="flex items-center badge badge-md text-sm text-content1"
        >
          <span> View more</span>
          <Icon icon="ic:twotone-arrow-right" width="20" height="20" />
        </router-link>
      </div>

      <div v-if="tvStore.isLoadingPopularHome" class=""><Loading /></div>

      <div v-else class="flex flex-wrap gap-2">
        <Container
          v-for="item in popularTVShowsHome?.results"
          :key="item.id"
          :id="item.id"
          :poster="`https://image.tmdb.org/t/p/w154/${item.poster_path}`"
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
import { useMovieStore } from "@/store/movies";
import { useTVStore } from "@/store/tv";

import Loading from "@/components/Loading.vue";

const movieStore = useMovieStore();
const tvStore = useTVStore();

/**** Popular Movies *****/
const { popularMoviesHome } = storeToRefs(movieStore);

if (movieStore.popularMoviesHome?.length == 0) {
  const page = 1;
  movieStore.getPopularMoviesHome(page);
}

/**** Popular TV Shows *****/
const { popularTVShowsHome } = storeToRefs(tvStore);

if (tvStore.popularTVShowsHome?.length == 0) {
  const page = 1;
  tvStore.getPopularTVHome(page);
}
</script>
