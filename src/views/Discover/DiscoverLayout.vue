<template>
  <div class="flex flex-col w-full">
    <div
      tabindex="0"
      class="w-full md:w-1/2 lg:w-1/3 collapse collapse-arrow border border-base-300 bg-base-300 rounded-box"
    >
      <input type="checkbox" />
      <div class="collapse-title text-xl font-medium">Filter Settings</div>
      <div class="flex flex-col collapse-content bg-base-300">
        <div class="flex flex-col py-2">
          <div class="text-left text-info text-xl">Type</div>
          <select v-model="selectedClass" class="select w-1/2 max-w-xs">
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
          <div class="text-left text-info text-xl">Sort By</div>
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

          <div class="flex flex-col py-2">
            <div class="flex items-center text-left text-info text-xl">
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
                <span>2</span>
                <span>4</span>
                <span>6</span>
                <span>8</span>
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
            <div class="text-left text-info text-xl">Genre</div>

            <select v-model="movieSortBy" class="select w-1/2 max-w-xs">
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

          <div class="divider"></div>
          <div @click="getMovieResults()" class="btn btn-primary">
            Discover!
          </div>
        </div>

        <div v-if="selectedClass == 'tv'" dev-hint="tv" class="flex flex-col">
          <div class="text-left text-info text-xl">Sort By</div>
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

          <div class="flex flex-col py-2">
            <div class="flex items-center text-left text-info text-xl">
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
                <span>2</span>
                <span>4</span>
                <span>6</span>
                <span>8</span>
                <span>10</span>
              </div>
            </div>
          </div>

          <div>
            <div class="text-left text-info text-xl">Genre</div>

            <select v-model="tvGenre" class="select w-1/2 max-w-xs">
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

          <div class="divider"></div>
          <div @click="getTVResults()" class="btn btn-primary">Discover!</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useMovieStore } from "@/store/movies";
import { useTVStore } from "@/store/tv";

const movieStore = useMovieStore();
const tvStore = useTVStore();

const { tvGenres } = storeToRefs(tvStore);
const { movieGenres } = storeToRefs(movieStore);

movieStore.getMovieGenres();
tvStore.getTVGenres();

const selectedClass = ref("movie");

/*****  MOVIE *****/
// Sort By
const movieSortBy = ref();
const sort_order = ref();

// Vote Average
const vote_average = ref(5);
const vote_sort = ref();

//genre
const movieGenre = ref();

const getMovieResults = () => {
  console.log("Getting movie discovery!");
};

/**** TV *****/
const tvSortBy = ref();
const tv_sort_order = ref();

// Vote Average
let tv_vote_average = ref(5);
const tv_vote_sort = "gte";

// genre
const tvGenre = ref();

const getTVResults = () => {
  console.log("Getting tv discovery!");
};
</script>

<style lang="scss" scoped></style>
