<template>
  <div class="p-2">
    <div class="min-h-0 max-h-20 pb-2 flex flex-wrap space-x-2">
      <div
        v-if="discoverStore?.discoverMovies.length > 0"
        @click="discoverStore.clearDiscoverMovies()"
        class="flex flex-row items-center space-x-1 w-fit text-error p-2 border border-error rounded-lg cursor-pointer hover:bg-backgroundSecondary"
      >
        <Icon icon="fluent-mdl2:clear-filter" width="15" height="15" />
        <span>Clear</span>
      </div>
      <div
        v-if="searchStore?.searchMovieResults.length > 0"
        @click="searchStore.clearSearchResults"
        class="flex flex-row items-center space-x-1 w-fit text-error p-2 border border-error rounded-lg cursor-pointer hover:bg-backgroundSecondary"
      >
        <Icon icon="pajamas:cancel" width="15" height="15" />
        <span>Search</span>
      </div>
    </div>

    <div class="space-y-6">
      <div class="max-w-xs w-full space-y-1">
        <div class="text-left text-primary text-xl">Search</div>

        <SearchInput :placeholder="`Search for movie...`" searchType="movie" />
      </div>

      <div class="max-w-xs w-full space-y-1">
        <div class="text-left text-primary text-xl">Genre</div>

        <select
          v-model="movieGenre"
          class="flex select w-full focus:input-primary"
        >
          <option disabled selected>Select Genre...</option>
          <option
            v-for="item in movieGenres.genres"
            :value="item.id"
            @click="movieGenre = item.id"
          >
            {{ item.name }}
          </option>
        </select>
      </div>

      <div class="max-w-xs w-full space-y-1">
        <div class="text-left text-primary text-xl">Sort By</div>

        <div class="flex flex-row items-center">
          <select v-model="movieSortBy" class="select w-full">
            <option disabled selected>Sort By...</option>
            <option value="average_vote">Average Vote</option>
            <option value="popularity">Popularity</option>
            <option value="release_date">Release Date</option>
          </select>
        </div>
      </div>

      <div class="flex flex-col py-2 space-y-1">
        <div class="popover flex items-center text-left text-primary text-xl">
          <label
            class="flex items-center space-x-1 popover-trigger"
            tabindex="0"
            ><span>Rating</span>
            <Icon icon="fe:info" width="20" height="20" />
          </label>
          <div class="popover-content popover-top-right" tabindex="0">
            <div class="popover-arrow"></div>
            <div class="p-4 text-sm text-content1">
              Filter shows at selected rating or greater
            </div>
          </div>
        </div>

        <div class="w-full flex flex-col items-start space-y-2">
          <input
            type="range"
            min="0"
            max="10"
            class="range range-primary w-3/5"
            step="1"
            v-model="vote_average"
          />
          <span class="bg-primary text-content1 p-1 rounded">{{
            vote_average
          }}</span>
        </div>
      </div>
    </div>

    <div class="w-full">
      <button class="w-1/2 btn btn-secondary" @click="getMovieResults()">
        Discover!
      </button>
    </div>
  </div>
</template>

<script setup>
import { useDiscoverStore } from "@/store/discover";
import { useMovieStore } from "@/store/movies";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import SearchInput from "@/components/Search/SearchInput.vue";
import { useSearchStore } from "@/store/search";

const movieStore = useMovieStore();
const discoverStore = useDiscoverStore();
const searchStore = useSearchStore();

const { movieGenres } = storeToRefs(movieStore);

movieStore.getMovieGenres();

/*****  MOVIE *****/
// Sort By
const movieSortBy = ref("popularity");
const sort_order = ref("desc");

// Vote Average
const vote_average = ref(5);
const vote_sort = ref("gte");

//genre
const movieGenre = ref(28);

const getMovieResults = () => {
  // Get the results ranging from start_page to end_page from API
  const page = 1;

  discoverStore.getMovieDiscover(
    movieSortBy.value,
    sort_order.value,
    vote_average.value,
    vote_sort.value,
    movieGenre.value,
    page
  );
};
</script>
