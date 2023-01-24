<template>
  <div class="flex flex-col w-full">
    <div
      tabindex="0"
      class="w-full md:w-1/2 lg:w-1/3 collapse collapse-arrow border border-base-300 bg-base-300 rounded-box"
    >
      <input type="checkbox" v-model="openFilter" />
      <div class="collapse-title text-xl font-medium">Filter Settings</div>
      <div class="flex flex-col collapse-content bg-base-300">
        <div class="flex flex-col py-2">
          <div class="text-left text-primary text-xl">Type</div>
          <select v-model="selectedClass" class="select w-full max-w-xs">
            <option disabled selected>Select...</option>
            <option value="movie">Movie</option>
            <option value="tv">TV</option>
          </select>
        </div>

        <div
          v-if="selectedClass == 'movie'"
          dev-hint="movie"
          class="flex flex-col py-2"
        >
          <div class="text-left text-primary text-xl">Sort By</div>
          <div class="flex flex-row items-center">
            <select v-model="movieSortBy" class="select w-1/2 max-w-xs">
              <option disabled selected>Sort By...</option>
              <option value="average_vote">Average Vote</option>
              <option value="popularity">Popularity</option>
              <option value="release_date">Release Date</option>
            </select>
            <div
              class="form-control flex flex-row w-1/2 items-center justify-center"
            >
              <label @click="sort_order = 'desc'" class="label cursor-pointer">
                <span class="label-text">Desc.</span>
                <input
                  type="radio"
                  name="radio-1"
                  class="radio checked:bg-red-500"
                  checked
                />
              </label>
              <label @click="sort_order = 'asc'" class="label cursor-pointer">
                <span class="label-text">Asc.</span>
                <input
                  type="radio"
                  name="radio-1"
                  class="radio checked:bg-blue-500"
                  checked
                />
              </label>
            </div>
          </div>

          <div class="flex flex-col py-2 space-y-1">
            <div class="flex items-center text-left text-primary text-xl">
              <span class="pr-2">Rating</span>
              <span
                ><Icon
                  icon="material-symbols:star-outline"
                  width="20"
                  height="20"
              /></span>
            </div>

            <div class="">
              <input
                type="range"
                min="0"
                max="10"
                class="range"
                step="1"
                v-model="vote_average"
              />
              <div class="w-full flex justify-between text-xs px-2">
                <span>0</span>
                <span>|</span>
                <span>2</span>
                <span>|</span>
                <span>4</span>
                <span>|</span>
                <span>6</span>
                <span>|</span>
                <span>8</span>
                <span>|</span>
                <span>10</span>
              </div>
            </div>

            <div class="">
              <div
                class="form-control flex flex-row w-1/2 items-center justify-center"
              >
                <label @click="vote_sort = 'lte'" class="label cursor-pointer">
                  <span class="label-text">Less Than</span>
                  <input
                    type="radio"
                    name="radio-10"
                    class="radio checked:bg-red-500"
                    checked
                  />
                </label>
                <label @click="vote_sort = 'gte'" class="label cursor-pointer">
                  <span class="label-text">Greater Than</span>
                  <input
                    type="radio"
                    name="radio-10"
                    class="radio checked:bg-blue-500"
                    checked
                  />
                </label>
              </div>
            </div>
          </div>

          <div>
            <div class="text-left text-primary text-xl">Genre</div>

            <select v-model="movieGenre" class="flex select w-full max-w-xs">
              <option disabled selected>Select Genre...</option>
              <option
                v-for="item in movieGenres.genres"
                :value="item.id"
                class=""
                @click="movieGenre = item.id"
              >
                {{ item.name }}
              </option>
            </select>
          </div>

          <div class="text-left pt-2 flex flex-col space-y-1">
            <span class="text-left text-primary text-xl"
              ># Pages to Display</span
            >
            <input
              type="range"
              min="1"
              max="5"
              v-model="displayPagesLimitMovie"
              class="range"
              step="1"
            />
            <div class="w-full flex justify-between text-xs px-2">
              <span>1</span>
              <span>2</span>
              <span>3</span>
              <span>4</span>
              <span>5</span>
            </div>
          </div>

          <div class="divider"></div>
          <div @click="getMovieResults()" class="btn btn-primary">
            Discover!
          </div>
        </div>

        <div v-if="selectedClass == 'tv'" dev-hint="tv" class="flex flex-col">
          <div class="text-left text-primary text-xl">Sort By</div>
          <div class="flex flex-row items-center">
            <select v-model="tvSortBy" class="select w-1/2 max-w-xs">
              <option disabled selected>Sort By...</option>
              <option value="average_vote">Average Vote</option>
              <option value="popularity">Popularity</option>
            </select>
            <div
              class="form-control flex flex-row w-1/2 items-center justify-center"
            >
              <label
                @click="tv_sort_order = 'desc'"
                class="label cursor-pointer"
              >
                <span class="label-text">Desc.</span>
                <input
                  type="radio"
                  name="radio-1"
                  class="radio checked:bg-red-500"
                  checked
                />
              </label>
              <label
                @click="tv_sort_order = 'asc'"
                class="label cursor-pointer"
              >
                <span class="label-text">Asc.</span>
                <input
                  type="radio"
                  name="radio-1"
                  class="radio checked:bg-blue-500"
                  checked
                />
              </label>
            </div>
          </div>

          <div class="flex flex-col py-2 space-y-1">
            <div class="flex items-center text-left text-primary text-xl">
              <span class="pr-2">Rating (or greater)</span>
              <span
                ><Icon
                  icon="material-symbols:star-outline"
                  width="20"
                  height="20"
              /></span>
            </div>

            <div class="">
              <input
                type="range"
                min="0"
                max="10"
                class="range"
                step="1"
                v-model="tv_vote_average"
              />
              <div class="w-full flex justify-between text-xs px-2">
                <span>0</span>
                <span>|</span>
                <span>2</span>
                <span>|</span>
                <span>4</span>
                <span>|</span>
                <span>6</span>
                <span>|</span>
                <span>8</span>
                <span>|</span>
                <span>10</span>
              </div>
            </div>
          </div>

          <div>
            <div class="text-left text-primary text-xl">Genre</div>

            <select v-model="tvGenre" class="flex select w-full max-w-xs">
              <option disabled selected>Select Genre...</option>
              <option
                v-for="item in tvGenres.genres"
                :value="item.id"
                class=""
                @click="tvGenre = item.id"
              >
                {{ item.name }}
              </option>
            </select>
          </div>

          <div class="text-left pt-2 flex flex-col space-y-1">
            <span class="text-left text-primary text-xl"
              ># Pages to Display</span
            >
            <input
              type="range"
              min="1"
              max="5"
              v-model="displayPagesLimitTV"
              class="range"
              step="1"
            />
            <div class="w-full flex justify-between text-xs px-2">
              <span>1</span>
              <span>2</span>
              <span>3</span>
              <span>4</span>
              <span>5</span>
            </div>
          </div>

          <div class="divider"></div>
          <div @click="getTVResults()" class="btn btn-primary">Discover!</div>
        </div>
      </div>
    </div>

    <div class="pt-4">
      <div v-if="isLoadingDiscover" class=""><Loading /></div>

      <div v-else>
        <div v-if="selectedClass == 'movie'" class="">
          <div
            v-if="discoverStore?.discoverMovies"
            class="grid grid-cols-2 place-items-center md:flex md:flex-wrap gap-1"
          >
            <div
              v-for="movie in discoverMovies"
              :key="movie.id"
              @click="getMovieStats(movie.id)"
              class="md:hover:scale-110"
            >
              <label for="movie-details" class="cursor-pointer"
                ><img
                  :src="`https://image.tmdb.org/t/p/w154/${movie.poster_path}`"
                  style="width: 156px; height: 225px"
              /></label>
            </div>
          </div>
        </div>

        <div v-if="selectedClass == 'tv'" class="">
          <div
            v-if="discoverStore?.discoverTV"
            class="grid grid-cols-2 place-items-center md:flex md:flex-wrap gap-1"
          >
            <div
              v-for="show in discoverTV"
              :key="show.id"
              @click="getTVStates(show.id)"
              class="md:hover:scale-110"
            >
              <label for="tv-details" class="cursor-pointer"
                ><img
                  :src="`https://image.tmdb.org/t/p/w154/${show.poster_path}`"
                  style="width: 156px; height: 225px"
              /></label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <MovieDetails />

  <TVDetails />
</template>

<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useMovieStore } from "@/store/movies";
import { useTVStore } from "@/store/tv";
import { useDiscoverStore } from "@/store/discover";
import Loading from "@/components/Loading.vue";
import MovieDetails from "@/components/Movie/MovieDetails.vue";
import TVDetails from "@/components/TV/TVDetails.vue";

const movieStore = useMovieStore();
const tvStore = useTVStore();
const discoverStore = useDiscoverStore();

const { discoverTV, discoverMovies, isLoadingDiscover } =
  storeToRefs(discoverStore);
const { tvGenres } = storeToRefs(tvStore);
const { movieGenres } = storeToRefs(movieStore);

movieStore.getMovieGenres();
tvStore.getTVGenres();

const selectedClass = ref("movie");

const openFilter = ref(false);

/*****  MOVIE *****/
// Sort By
const movieSortBy = ref("popularity");
const sort_order = ref("desc");

// Vote Average
const vote_average = ref(5);
const vote_sort = ref("gte");

//genre
const movieGenre = ref(28);

// Pages to show
const displayPagesLimitMovie = ref(3);

const getMovieResults = () => {
  // Get the results ranging from start_page to end_page from API
  const start_page = 1;
  const end_page = displayPagesLimitMovie.value;

  for (let i = start_page; i <= end_page; i++) {
    const page = i;

    useDiscoverStore().getMovieDiscover(
      movieSortBy.value,
      sort_order.value,
      vote_average.value,
      vote_sort.value,
      movieGenre.value,
      page
    );
  }

  // Closes the filter after search for movies
  openFilter.value = false;
};

const getMovieStats = (movie_id) => {
  movieStore.getMovieDetails(movie_id);
};

/**** TV *****/
const tvSortBy = ref("popularity");
const tv_sort_order = ref("desc");

// Vote Average
let tv_vote_average = ref(5);
const tv_vote_sort = "gte";

// genre
const tvGenre = ref(10759);

const displayPagesLimitTV = ref(3);

const getTVResults = () => {
  // Get the results ranging from start_page to end_page from API
  const start_page = 1;
  const end_page = displayPagesLimitTV.value;

  for (let i = start_page; i <= end_page; i++) {
    const page = i;

    useDiscoverStore().getTVDiscover(
      tvSortBy.value,
      tv_sort_order.value,
      tv_vote_average.value,
      tv_vote_sort,
      tvGenre.value,
      page
    );
  }

  // Closes the filter after search for tv shows
  openFilter = false;
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
  width: 156px;
  height: 225px;
}
</style>
