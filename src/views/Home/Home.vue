<template>
  <div class="w-full space-y-4 mx-2">
    <div class="w-full">
      <div class="text-left text-3xl text-primary">Trending</div>

      <div v-if="trendingStore.isLoadingTrending" class=""><Loading /></div>
      <div v-else>
        <vue-horizontal responsive snap="start">
          <section
            v-for="item in trending[0]?.results"
            :key="item.id"
            class="px-1 md:hover:scale-110"
            @click="getMovieStats(item.id)"
          >
            <label for="movie-details" class="cursor-pointer">
              <img
                :src="`https://image.tmdb.org/t/p/w154/${item.poster_path}`"
                style="width: 154px; height: 231px"
                :alt="`${item.original_title} Trending`"
              />
            </label>
          </section>
        </vue-horizontal>
      </div>
    </div>

    <div class="w-full">
      <div
        class="text-left text-3xl text-primary flex flex-row items-center space-x-4"
      >
        <span>Popular Movies</span>
      </div>

      <div v-if="movieStore.isLoadingPopularHome" class=""><Loading /></div>

      <div v-else>
        <vue-horizontal responsive snap="start">
          <section
            v-for="item in popularMoviesHome.results"
            :key="item.id"
            class="px-1 md:hover:scale-110"
            @click="getMovieStats(item.id)"
          >
            <label for="movie-details" class="cursor-pointer"
              ><img
                :src="`https://image.tmdb.org/t/p/w154/${item.poster_path}`"
                style="width: 154px; height: 231px"
                :alt="`${item.original_title} Popular`"
            /></label>
          </section>
        </vue-horizontal>
      </div>
    </div>

    <div class="w-full">
      <div class="flex items-center space-x-2 text-left text-3xl text-primary">
        <span>Upcoming Movies</span>
      </div>

      <div v-if="movieStore.isLoadingUpcomingHome" class=""><Loading /></div>
      <div v-else>
        <vue-horizontal responsive snap="start">
          <section
            v-for="item in upcomingMoviesHome.results"
            :key="item.id"
            class="px-1 md:hover:scale-110"
            @click="getMovieStats(item.id)"
          >
            <label for="movie-details" class="cursor-pointer"
              ><img
                :src="`https://image.tmdb.org/t/p/w154/${item.poster_path}`"
                style="width: 154px; height: 231px"
                :alt="`${item.original_title} Upcoming`"
            /></label>
          </section>
        </vue-horizontal>
      </div>
    </div>

    <div class="w-full">
      <div class="text-left text-3xl text-primary">Popular Shows</div>

      <div v-if="tvStore.isLoadingPopularHome" class=""><Loading /></div>

      <div v-else>
        <vue-horizontal responsive>
          <section
            v-for="item in popularTVShowsHome?.results"
            :key="item.id"
            class="px-1 md:hover:scale-110"
            @click="getTVStates(item.id)"
          >
            <label for="tv-details" class="cursor-pointer"
              ><img
                :src="`https://image.tmdb.org/t/p/w154/${item.poster_path}`"
                style="width: 154px; height: 231px"
                :alt="`${item.original_name} TVPopular`"
            /></label>
          </section>
        </vue-horizontal>
      </div>
    </div>

    <div class="w-full">
      <div class="text-left text-3xl text-primary">Top Rated</div>

      <div v-if="movieStore.isLoadingTopRatedHome" class=""><Loading /></div>

      <div v-else>
        <vue-horizontal responsive snap="start">
          <section
            v-for="item in topRatedMovies?.results"
            :key="item.id"
            class="px-1 md:hover:scale-110"
            @click="getMovieStats(item.id)"
          >
            <label for="movie-details" class="cursor-pointer"
              ><img
                :src="`https://image.tmdb.org/t/p/w154/${item.poster_path}`"
                style="width: 154px; height: 231px"
                :alt="`${item.original_title} TopRated`"
            /></label>
          </section>
        </vue-horizontal>
      </div>
    </div>
  </div>

  <MovieDetails />

  <TVDetails />
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useTrendingStore } from "@/store/trending";
import { useMovieStore } from "@/store/movies";
import { useTVStore } from "@/store/tv";

// Components
import VueHorizontal from "vue-horizontal";
import Loading from "@/components/Loading.vue";

// Modals
import MovieDetails from "@/components/Movie/MovieDetails.vue";
import TVDetails from "@/components/TV/TVDetails.vue";

/*** Store Initializations ****/
const movieStore = useMovieStore();
const trendingStore = useTrendingStore();
const tvStore = useTVStore();

/*****Trending Sections *****/
const { trending } = storeToRefs(useTrendingStore());

if (trendingStore.trending?.length == 0) {
  useTrendingStore().getTrendingContent();
}

/***** Movie section *****/
const { popularMoviesHome } = storeToRefs(movieStore);

if (movieStore.popularMoviesHome?.length == 0) {
  const page = 1;
  movieStore.getPopularMoviesHome(page);
}

/***** Upcoming Movies section *****/
const { upcomingMoviesHome } = storeToRefs(movieStore);

if (movieStore.upcomingMoviesHome?.length == 0) {
  const page = 1;
  movieStore.getUpcomingMovies(page);
}

/***** Top Rated Movies ******/
const { topRatedMovies } = storeToRefs(movieStore);

if (movieStore.topRatedMovies?.length == 0) {
  const page = 1;
  movieStore.getTopRatedMovies(page);
}

/**** Popular TV Shows *****/
const { popularTVShowsHome } = storeToRefs(tvStore);

if (tvStore.popularTVShowsHome?.length == 0) {
  const page = 1;
  tvStore.getPopularTVHome(page);
}

// Get the movie details - credits, recommendations, and details
const getMovieStats = (movie_id) => {
  movieStore.getMovieDetails(movie_id);
};

const getTVStates = (tv_id) => {
  tvStore.getTVDetails(tv_id);
};
</script>

<style scoped>
img:before {
  content: " ";
  background-image: url("@/assets/images/no-image.jpg");
  display: block;
  width: 154px;
  height: 231px;
}
</style>
