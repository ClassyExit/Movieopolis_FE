<template>
  <div class="w-full">
    <div
      class="flex flex-col items-center justify-center w-full h-full"
      v-if="isLoadingDetails"
    >
      <Loading />
    </div>

    <div v-else class="flex flex-col h-screen items-center mx-auto">
      <div
        id="backdrop-tv"
        class="relative inset-y-0 top-0 w-full h-2/5 z-0 md:pb-5"
      >
        <img
          class="h-full w-full object-cover blur-xs z-0"
          :src="`https://image.tmdb.org/t/p/original/${movieDetails.backdrop_path}`"
          :alt="`${movieDetails.original_title} backdrop`"
        />

        <div class="absolute top-2 left-2 z-40"><MobileReturn /></div>
      </div>

      <div
        aria-label="layout"
        class="w-full flex flex-col space-y-4 md:space-y-0 mx-auto"
      >
        <div class="w-full flex flex-col md:flex-row justify-center">
          <div aria-label="main channel" class="p-2 space-y-4">
            <div
              aria-label="main label"
              class="flex flex-row space-x-4 max-w-7xl w-full bg-backgroundSecondary p-2 rounded-xl mt-2 md:mt-0"
            >
              <div class="hidden md:block min-w-fit max-w-2/5">
                <img
                  class="h-full object-contain z-10 rounded-lg"
                  :src="`https://image.tmdb.org/t/p/w300/${movieDetails.poster_path}`"
                  :alt="`${movieDetails.original_title} poster`"
                />
              </div>

              <div class="flex flex-col space-y-4">
                <div class="text-3xl">
                  <div class="flex flex-row text-content1 space-x-2">
                    <div class="space-x-2">
                      <span class="text-bold">
                        {{ movieDetails.original_title }}
                      </span>
                      <span class="text-content2"
                        >({{ movieDetails.release_date.slice(0, 4) }})</span
                      >
                    </div>

                    <AddToList
                      class="md:px-2"
                      :id="movieDetails.id"
                      :poster="movieDetails.poster"
                      :title_movie="movieDetails.original_title"
                      :media_type="movieDetails.media_type"
                      :overview="movieDetails.overview"
                    />
                  </div>
                </div>

                <div class="flex flex-col space-y-4">
                  <div class="text-left space-y-4 flex flex-row items-center">
                    <div class="flex flex-row space-x-3">
                      <span class="badge badge-sm badge-primary">{{
                        movieDetails.status
                      }}</span>
                      <div
                        class="flex flex-row items-center justify-center space-x-2 p-2 rounded-lg"
                      >
                        <Icon
                          icon="streamline:interface-favorite-heart-reward-social-rating-media-heart-it-like-favorite-love"
                          width="20"
                          height="20"
                        />

                        <span class="text-content1">{{
                          movieDetails.vote_average.toFixed(2)
                        }}</span>
                      </div>
                    </div>
                  </div>
                  <div class="text-left text-md text-content2">
                    {{ movieDetails.overview }}
                  </div>
                </div>

                <div class="w-full">
                  <div class="grid grid-cols-2 w-fit">
                    <div
                      class="flex flex-col text-left space-y-2 text-content1"
                    >
                      <div class="text-bold">Release Date</div>
                      <div class="text-bold">Runtime</div>
                      <div class="text-bold">Budget</div>
                      <div class="text-bold">Revenue</div>
                      <div class="text-bold">Genre(s)</div>
                    </div>

                    <div
                      class="flex flex-col text-left space-y-2 text-content2"
                    >
                      <div class="">{{ movieDetails.release_date }}</div>
                      <div class="">{{ movieDetails.runtime }} minutes</div>
                      <div class="">
                        {{ USDollar.format(movieDetails.budget) }}
                      </div>
                      <div class="">
                        {{ USDollar.format(movieDetails.revenue) }}
                      </div>
                      <div class="flex flex-wrap gap-1">
                        <div
                          v-for="item in movieDetails.genres"
                          class="flex flex-wrap badge badge-primary w-fit"
                        >
                          {{ item.name }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="max-w-7xl w-full text-left">
              <span class="w-full text-2xl">Reviews</span>
              <div class="h-96 overflow-auto overflow-x-hidden">
                <div
                  v-if="movieReviews.results"
                  v-for="review in movieReviews.results"
                  class="py-2"
                >
                  <Reviews
                    :id="review.id"
                    :author="review.author"
                    :content="review.content"
                    :updated="review.created_at"
                    :url="review.url"
                  />
                </div>
              </div>
            </div>
          </div>

          <div aria-label="side channel" class="p-2">
            <div
              aria-label="recommendations"
              class="flex flex-col bg-backgroundSecondary max-w-sm rounded-xl p-2"
            >
              <div
                class="flex flex-row space-x-2 text-xl text-left p-1 text-content1"
              >
                <Icon icon="fluent-mdl2:show-time-as" />
                <span>You many also like...</span>
              </div>
              <div class="overflow-auto h-fit max-h-96 md:h-full md:max-h-none">
                <div
                  v-if="movieRecommendations.results.length"
                  class="w-full flex flex-wrap gap-2"
                >
                  <SmallContainer
                    v-for="item in movieRecommendations.results"
                    :key="item.id"
                    :id="item.id"
                    :poster="`https://image.tmdb.org/t/p/w154/${item.poster_path}`"
                    :title_movie="item.title"
                    :year_movie="item.release_date"
                    :rating="item.vote_average"
                    :media_type="`movie`"
                    :type="item.media_type"
                  >
                  </SmallContainer>
                </div>

                <div v-else class="">Sorry, unable to get recommendations</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <SeasonDetailModal />
</template>

<script setup>
import { useRoute } from "vue-router";
import { useMovieStore } from "@/store/movies";
import Loading from "@/components/Loading.vue";
import { storeToRefs } from "pinia";

import SmallContainer from "@/components/SmallContainer.vue";
import AddToList from "@/components/Actions/AddToList.vue";
import Reviews from "@/components/Reviews.vue";
import MobileReturn from "@/components/Actions/MobileReturn.vue";

const movieStore = useMovieStore();
const {
  isLoadingDetails,
  movieDetails,
  movieCredits,
  movieReviews,
  movieRecommendations,
  movieVideos,
} = storeToRefs(movieStore);

const route = useRoute();
const id = route.params.id; // read movie id from router

// Get movie details
movieStore.getMovieDetails(id);

let USDollar = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
</script>
