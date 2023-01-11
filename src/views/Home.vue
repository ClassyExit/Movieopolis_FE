<template>
  <div class="w-full space-y-4 mx-2">
    <div class="w-full">
      <div class="text-left text-3xl text-primary">Trending</div>

      <vue-horizontal responsive>
        <section
          v-for="item in trending.results"
          :key="item.id"
          class="px-1 cursor-pointer"
          @click="getMovieStats(item.id)"
        >
          <label for="movie-details"
            ><img :src="`https://image.tmdb.org/t/p/w154/${item.poster_path}`"
          /></label>
        </section>
      </vue-horizontal>
    </div>

    <div class="flex flex-col">
      <div class="flex flex-row">
        <span>Popular Movies</span>
        <div class="">View More</div>
      </div>

      <div class="">content here</div>
    </div>

    <div class="flex flex-col">
      <div class="flex flex-row">
        <span>Upcoming Movies</span>
        <div class="">View More</div>
      </div>

      <div class="">content here</div>
    </div>

    <div class="flex flex-col">
      <div class="flex flex-row">
        <span>Popular TV Shows</span>
        <div class="">View More</div>
      </div>

      <div class="">content here</div>
    </div>

    <div class="flex flex-col">
      <div class="flex flex-row">
        <span>Latest Movies</span>
        <div class="">View More</div>
      </div>

      <div class="">content here</div>
    </div>

    <div class="flex flex-col">
      <div class="flex flex-row">
        <span>Top Rated</span>
        <div class="">View More</div>
      </div>

      <div class="">content here</div>
    </div>
  </div>

  <MovieDetails />
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useTrendingStore } from "@/store/trending";
import { useMovieStore } from "@/store/movies";
import { useAPIStore } from "@/store/API";

// Components
import VueHorizontal from "vue-horizontal";

// Modals
import MovieDetails from "@/components/Movie/MovieDetails.vue";

// useTrendingStore().getTrendingContent();

const { trending } = storeToRefs(useTrendingStore());

const MovieStore = useMovieStore();
const APIStore = useAPIStore();

// Get the movie details - credits, recommendations, and details
const getMovieStats = (movie_id) => {
  MovieStore.getMovieDetails(movie_id);
};

// APIStore.getTrending();
</script>
