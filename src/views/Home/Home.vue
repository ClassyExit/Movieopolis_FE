<template>
  <div class="w-full space-y-4 mx-2">
    <div class="w-full">
      <div
        class="md:items-center text-left text-3xl text-primary flex flex-col space-y-1 md:flex-row md:space-x-2 pb-1"
      >
        <span>Trending</span>

        <div class="flex flex-row space-x-1">
          <div class="tabs tabs-boxed w-fit">
            <span
              @click="selectedTrendingOption('all', trendingTime)"
              class="tab tab-sm md:tab-md"
              :class="trendingOption == 'all' ? 'tab-active' : ''"
              >All</span
            >
            <span
              @click="selectedTrendingOption('movie', trendingTime)"
              class="tab tab-sm md:tab-md"
              :class="trendingOption == 'movie' ? 'tab-active' : ''"
              >Movie</span
            >
            <span
              @click="selectedTrendingOption('tv', trendingTime)"
              class="tab tab-sm md:tab-md"
              :class="trendingOption == 'tv' ? 'tab-active' : ''"
              >TV Shows</span
            >
          </div>

          <div class="tabs tabs-boxed w-fit" @click="">
            <span
              @click="selectedTrendingOption(trendingOption, 'day')"
              class="tab tab-sm md:tab-md"
              :class="trendingTime == 'day' ? 'tab-active' : ''"
              >Daily</span
            >
            <span
              @click="selectedTrendingOption(trendingOption, 'week')"
              class="tab tab-sm md:tab-md"
              :class="trendingTime == 'week' ? 'tab-active' : ''"
              >Weekly</span
            >
          </div>
        </div>
      </div>

      <div v-if="trendingStore.isLoadingTrending" class=""><Loading /></div>
      <div v-else>
        <vue-horizontal responsive snap="start">
          <section
            v-for="item in trending?.results"
            :key="(item.id, item.media_type)"
            class="px-1 md:hover:scale-105"
            @click="
              item.media_type == 'movie'
                ? getMovieStats(item.id)
                : getTVStats(item.id)
            "
          >
            <label
              for="movie-details"
              class="cursor-pointer"
              v-if="item.media_type == 'movie'"
            >
              <img
                :src="`https://image.tmdb.org/t/p/w154/${item.poster_path}`"
                style="width: 154px; height: 231px"
                :alt="`${item.original_title} Trending`"
              />
            </label>

            <label
              for="tv-details"
              class="cursor-pointer"
              v-if="item.media_type == 'tv'"
            >
              <img
                :src="`https://image.tmdb.org/t/p/w154/${item.poster_path}`"
                style="width: 154px; height: 231px"
                :alt="`${item.original_name} Trending`"
              />
            </label>
          </section>
        </vue-horizontal>
      </div>
    </div>

    <div class="w-full">
      <div
        class="text-left text-3xl text-primary flex flex-row items-center space-x-4 pb-1"
      >
        <span>Popular Movies</span>
      </div>

      <div v-if="movieStore.isLoadingPopularHome" class=""><Loading /></div>

      <div v-else>
        <vue-horizontal responsive snap="start">
          <section
            v-for="item in popularMoviesHome.results"
            :key="item.id"
            class="px-1 md:hover:scale-105"
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
      <div
        class="flex items-center space-x-2 text-left text-3xl text-primary pb-1"
      >
        <span>Upcoming Movies</span>
      </div>

      <div v-if="movieStore.isLoadingUpcomingHome" class=""><Loading /></div>
      <div v-else>
        <vue-horizontal responsive snap="start">
          <section
            v-for="item in upcomingMoviesHome.results"
            :key="item.id"
            class="px-1 md:hover:scale-105"
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
      <div class="text-left text-3xl text-primary pb-1">Popular Shows</div>

      <div v-if="tvStore.isLoadingPopularHome" class=""><Loading /></div>

      <div v-else>
        <vue-horizontal responsive>
          <section
            v-for="item in popularTVShowsHome?.results"
            :key="item.id"
            class="px-1 md:hover:scale-105"
            @click="getTVStats(item.id)"
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
      <div class="text-left text-3xl text-primary pb-1">Top Rated</div>

      <div v-if="movieStore.isLoadingTopRatedHome" class=""><Loading /></div>

      <div v-else>
        <vue-horizontal responsive snap="start">
          <section
            v-for="item in topRatedMovies?.results"
            :key="item.id"
            class="px-1 md:hover:scale-105"
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
import { ref } from "vue";

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

let trendingOption = ref("all");
let trendingTime = ref("week");

const selectedTrendingOption = (media_type, time_window) => {
  // Update ref value and fetch new results
  trendingOption = media_type;
  trendingTime = time_window;
  useTrendingStore().getTrendingContent(media_type, time_window);
};

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

const getTVStats = (tv_id) => {
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
