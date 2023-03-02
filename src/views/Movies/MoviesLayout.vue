<template>
  <div class="w-full h-sceen">
    <div v-if="movieStore.isLoadingMovies" class=""><Loading /></div>

    <div
      v-else
      class="grid grid-cols-2 place-items-center md:flex md:flex-wrap gap-1"
    >
      <div
        v-for="item in popularMovies"
        :key="item.id"
        @click="getMovieStats(item.id)"
        class="md:hover:scale-110"
      >
        <label for="movie-details" class="cursor-pointer"
          ><img
            :src="`https://image.tmdb.org/t/p/w154/${item.poster_path}`"
            style="width: 154px; height: 231px"
            :alt="`${item.original_title}`"
            :title="`${item.original_title}`"
        /></label>
      </div>
    </div>
  </div>

  <MovieDetails />
</template>

<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useMovieStore } from "@/store/movies";
import MovieDetails from "@/components/Movie/MovieDetails.vue";
import Loading from "@/components/Loading.vue";

const movieStore = useMovieStore();

const { popularMovies } = storeToRefs(movieStore);

movieStore.popularMovies = [];
let page = ref(1);

// Get first three pages of movies to show
movieStore.getPopularMovies((page = 1));
movieStore.getPopularMovies((page = 2));
movieStore.getPopularMovies((page = 3));

page = 4;

// Get the movie details - credits, recommendations, and details
const getMovieStats = (movie_id) => {
  movieStore.getMovieDetails(movie_id);
};

/***** Infinite scroll *****/
/* Adds more movies when at the bottom of the viewport */
const showLoadingIcon = false; // Show the loading icon -> If true, it refreshes page and starts user at top

window.addEventListener("scroll", () => {
  if (
    window.scrollY + window.innerHeight >=
    document.documentElement.scrollHeight - 10
  ) {
    movieStore.getPopularMovies(page, showLoadingIcon);
    page = page + 1;
  }
});
</script>

<style scoped>
img:before {
  content: " ";
  background-image: url("@/assets/images/no-image.jpg");
  display: block;
  width: 156px;
  height: 225px;
}
</style>
