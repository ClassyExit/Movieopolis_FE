<template>
  <div class="flex flex-row w-full">
    <div class="flex flex-row w-full">
      <div class="sm:w-full sm:max-w-[18rem]">
        <input
          type="checkbox"
          id="sidebar-mobile-fixed"
          class="sidebar-state"
        />
        <label for="sidebar-mobile-fixed" class="sidebar-overlay"></label>
        <aside
          class="sidebar sidebar-mobile h-full justify-start max-sm:fixed max-sm:-translate-x-full"
        >
          <section class="sidebar-content">
            <nav class="menu rounded-md">
              <MovieOptions />
            </nav>
          </section>

          <section class="sidebar-footer justify-end bg-gray-2 pt-2">
            <div class="divider my-0"></div>
          </section>
        </aside>
      </div>
      <div class="flex w-full flex-col">
        <div
          class="flex flex-row items-center justify-between p-2 md:justify-end"
        >
          <div
            class="md:hidden flex flex-row space-x-2 overflow-auto scrollbar-hide"
          >
            <label
              for="sidebar-mobile-fixed"
              class="flex flex-row items-center space-x-1 w-fit text-secondary font-semibold p-2 border border-secondary rounded-lg cursor-pointer sm:hidden"
              ><Icon icon="carbon:filter" width="20" height="20" />
              <span>Filter</span></label
            >
            <div
              v-if="discoverStore.discoverMovies.length > 0"
              @click="discoverStore.clearDiscoverMovies()"
              class="flex flex-row items-center space-x-1 w-fit text-error p-2 border border-error rounded-lg cursor-pointer hover:bg-backgroundSecondary"
            >
              <Icon icon="fluent-mdl2:clear-filter" width="20" height="20" />
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
          <div
            @click="isListView = !isListView"
            class="w-24 h-12 rounded-lg border border-border cursor-pointer"
          >
            <div class="relative">
              <div
                class="absolute right-1 top-0.5 text-content1 p-2 rounded"
                :class="isListView ? 'bg-primary' : ''"
              >
                <Icon icon="ph:list-fill" width="25" height="25" />
              </div>
              <div
                class="absolute left-1 top-0.5 p-2 text-content1 rounded"
                :class="isListView ? '' : 'bg-primary '"
              >
                <Icon icon="bi:grid" width="25" height="25" />
              </div>
            </div>
          </div>
        </div>

        <div class="bg-backgroundPrimary flex-1 w-full">
          <div class="flex flex-row justify-between py-2 px-2 md:px-3 w-full">
            <div class="flex flex-row space-x-3 overflow-auto scrollbar-hide">
              <span
                @click="movieStore.getPopularMovies(1)"
                class="badge badge-outline-primary badge-sm md:badge-lg hover:badge-primary cursor-pointer"
                >Show Standard</span
              >
              <span
                @click="movieStore.getNowPlayingMovies(1)"
                class="badge badge-outline-primary badge-sm md:badge-lg hover:badge-primary cursor-pointer"
                >Show Now Playing</span
              >
              <span
                @click="movieStore.getTopRatedMovies(1)"
                class="badge badge-outline-success badge-sm md:badge-lg hover:badge-success cursor-pointer"
                >Show Top Rated</span
              >
            </div>
          </div>
          <div class="p-2">
            <div v-if="isLoadingMovies || isLoadingDiscover || isLoadingSearch">
              <Loading />
            </div>

            <div
              v-else-if="searchMovieResults.length > 0"
              class="flex gap-2"
              :class="
                isListView
                  ? 'w-full flex flex-col gap-2'
                  : 'justify-center gap-4 md:gap-2 md:justify-start flex-wrap'
              "
            >
              <Container
                v-for="item in searchMovieResults"
                :key="item.id"
                :id="item.id"
                :poster="`https://image.tmdb.org/t/p/w154/${item.poster_path}`"
                :title_movie="item.title"
                :year_movie="item.release_date"
                :rating="item.vote_average"
                :media_type="`movie`"
                :type="item.media_type"
                :listView="isListView"
                :overview="item.overview"
              >
              </Container>
            </div>

            <div
              v-else-if="discoverMovies.length > 0"
              class="flex gap-2"
              :class="
                isListView
                  ? 'w-full flex flex-col gap-2'
                  : 'justify-center gap-4 md:gap-2 md:justify-start flex-wrap '
              "
            >
              <Container
                v-for="item in discoverMovies"
                :key="item.id"
                :id="item.id"
                :poster="`https://image.tmdb.org/t/p/w154/${item.poster_path}`"
                :title_movie="item.title"
                :year_movie="item.release_date"
                :rating="item.vote_average"
                :media_type="`movie`"
                :type="item.media_type"
                :listView="isListView"
                :overview="item.overview"
              >
              </Container>
            </div>

            <div
              v-else
              class="flex"
              :class="
                isListView
                  ? 'w-full flex flex-col gap-2'
                  : 'justify-center gap-4 md:gap-2 md:justify-start flex-wrap '
              "
            >
              <Container
                v-for="item in popularMovies"
                :key="(item.id, item.media_type)"
                :id="item.id"
                :poster="`https://image.tmdb.org/t/p/w154/${item.poster_path}`"
                :title_movie="item.original_title"
                :year_movie="item.release_date"
                :rating="item.vote_average"
                :media_type="`movie`"
                :listView="isListView"
                :overview="item.overview"
              >
              </Container>
            </div>
          </div>

          <div
            class="pagination flex justify-center w-full pb-8 pt-4"
            :class="
              discoverMovies.length || searchMovieResults.length > 0
                ? 'hidden'
                : ''
            "
          >
            <div
              class="flex items-center rounded-lg p-2 bg-backgroundSecondary hover:bg-primary cursor-pointer"
              :class="
                prevPage < 1
                  ? 'cursor-not-allowed hover:bg-backgroundSecondary'
                  : ''
              "
              @click="loadMovies((page = 1))"
            >
              <Icon icon="ph:skip-back-bold" width="20" height="20" />
            </div>
            <div
              class="flex items-center rounded-lg p-2 space-x-2 bg-backgroundSecondary hover:bg-primary cursor-pointer"
              :class="
                prevPage < 1
                  ? 'cursor-not-allowed hover:bg-backgroundSecondary'
                  : ''
              "
              @click="loadMovies(prevPage)"
            >
              <Icon icon="icon-park-outline:back" width="20" height="20" />
              <span>Previous</span>
            </div>
            <div
              class="flex items-center rounded-lg p-2 space-x-2 bg-backgroundSecondary hover:bg-primary cursor-pointer"
              @click="loadMovies(nextPage)"
            >
              <span>Next </span>
              <Icon icon="charm:forward" width="20" height="20" />
            </div>
            <div
              class="flex items-center rounded-lg p-2 bg-backgroundSecondary hover:bg-primary cursor-pointer"
            >
              <Icon icon="ph:skip-forward-bold" width="20" height="20" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import MovieOptions from "./MovieOptions.vue";
import { useMovieStore } from "@/store/movies";
import { useDiscoverStore } from "@/store/discover";
import { useSearchStore } from "@/store/search";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import Container from "@/components/Container.vue";
import Loading from "@/components/Loading.vue";

let isListView = ref(false);
// Search
const searchStore = useSearchStore();
const { searchMovieResults, isLoadingSearch } = storeToRefs(searchStore);

// Movies
const movieStore = useMovieStore();
const { popularMovies, isLoadingMovies } = storeToRefs(movieStore);

movieStore.popularMovies = [];
let currentPage = ref(1);
let nextPage = ref(currentPage.value + 1);
let prevPage = ref(currentPage.value - 1);

// Load initial movie
movieStore.getPopularMovies(currentPage.value);

const loadMovies = (page) => {
  movieStore.getPopularMovies(page);

  // Update pages
  currentPage.value = page;
  nextPage.value = currentPage.value + 1;
  prevPage.value = currentPage.value - 1;
};

// ****** DICOVER ****** //
const discoverStore = useDiscoverStore();

const { discoverMovies, isLoadingDiscover } = storeToRefs(discoverStore);
</script>
