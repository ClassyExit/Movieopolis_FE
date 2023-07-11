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
        <div class="flex flex-row space-x-2 items-center w-fit md:hidden p-2">
          <label
            for="sidebar-mobile-fixed"
            class="flex flex-row items-center space-x-1 w-fit text-secondary p-2 border border-secondary rounded-lg cursor-pointer hover:bg-backgroundSecondary sm:hidden"
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
        </div>
        <div class="bg-backgroundPrimary flex-1 w-full">
          <div class="p-2">
            <div v-if="isLoadingMovies || isLoadingDiscover"><Loading /></div>

            <div
              v-else-if="discoverMovies.length > 0"
              class="flex flex-wrap gap-2"
            >
              <Container
                v-for="item in discoverMovies"
                :key="item.id"
                :poster="`https://image.tmdb.org/t/p/w154/${item.poster_path}`"
                :title_movie="item.title"
                :year_tv="item.first_air_date"
                :year_movie="item.release_date"
                :rating="item.vote_average"
                :media_type="`movie`"
                :type="item.media_type"
              >
              </Container>
            </div>

            <div v-else class="flex flex-wrap gap-2">
              <Container
                v-for="item in popularMovies"
                :key="(item.id, item.media_type)"
                :poster="`https://image.tmdb.org/t/p/w154/${item.poster_path}`"
                :title_movie="item.original_title"
                :year_tv="item.first_air_date"
                :year_movie="item.release_date"
                :rating="item.vote_average"
                :media_type="`movie`"
              >
              </Container>
            </div>
          </div>

          <div
            class="pagination flex justify-center w-full pb-8 pt-4"
            :class="discoverMovies.length > 0 ? 'hidden' : ''"
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
import { storeToRefs } from "pinia";
import { ref } from "vue";
import Container from "@/components/Container.vue";
import Loading from "@/components/Loading.vue";

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
