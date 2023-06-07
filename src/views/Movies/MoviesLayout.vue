<template>
  <div class="w-full h-sceen">
    <div v-if="movieStore.isLoadingMovies" class=""><Loading /></div>

    <div
      v-else
      class="grid grid-cols-2 place-items-center md:flex md:flex-wrap gap-2"
    >
      <Container
        v-for="item in popularMovies"
        :key="(item.id, item.media_type)"
        :poster="`https://image.tmdb.org/t/p/w154/${item.poster_path}`"
        :title_movie="item.original_title"
        :year="item.release_date"
        :rating="item.vote_average"
        :media_type="`movie`"
        @click="getMovieStats(item.id)"
      >
      </Container>
    </div>
  </div>

  <MovieModal />
</template>

<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useMovieStore } from "@/store/movies";
import Loading from "@/components/Loading.vue";
import MovieModal from "@/components/MovieModal.vue";
import Container from "@/components/Container.vue";

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
