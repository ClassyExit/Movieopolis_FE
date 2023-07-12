<template>
  <div class="w-full flex flex-col space-y-4 overflow-none">
    <New />
    <Trending />

    <Popular />
  </div>

  <!-- TODO: Add option to display top rated movies | tv shows -->
  <!-- 
    <div class="w-full bg-base-200 rounded p-3">
      <div class="text-left text-3xl text-primary pb-1">Top Rated</div>

      <div v-if="movieStore.isLoadingTopRatedHome" class=""><Loading /></div>

      <div
        v-else
        class="grid grid-cols-2 place-items-center md:flex md:flex-wrap gap-2"
      >
        <Container
          v-for="item in topRatedMovies?.results"
          :key="item.id"
          :poster="`https://image.tmdb.org/t/p/w154/${item.poster_path}`"
          :title_movie="item.title"
          :year_tv="item.first_air_date"
          :year_movie="item.release_date"
          :rating="item.vote_average"
          :media_type="`movie`"
          :type="item.media_type"
          @click="getMovieStats(item.id)"
        >
        </Container>
      </div>
    </div>
  </div> -->
</template>

<script setup>
import Trending from "@/views/Home/Trending.vue";
import New from "@/views/Home/New.vue";
import Popular from "./Popular.vue";

/***** Top Rated Movies ******/
// const { topRatedMovies } = storeToRefs(movieStore);

// if (movieStore.topRatedMovies?.length == 0) {
//   const page = 1;
//   movieStore.getTopRatedMovies(page);
// }
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
