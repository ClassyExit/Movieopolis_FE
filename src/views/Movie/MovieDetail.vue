<template>
  <div class="w-full">
    <div
      class="flex flex-col items-center justify-center w-full h-full"
      v-if="isLoadingDetails"
    >
      <Loading />
    </div>

    <div v-else class="flex flex-col h-screen md:h-screen">
      <div
        id="backdrop-movie"
        class="relative inset-y-0 top-0 w-full h-2/5 z-0 pb-10"
      >
        <img
          class="h-full w-full object-cover blur-sm z-0"
          :src="`https://image.tmdb.org/t/p/original/${movieDetails.backdrop_path}`"
          :alt="`${movieDetails.original_title} backdrop`"
        />

        <div class="absolute left-4 top-2">
          <img
            class="h-full object-cover z-10"
            :src="`https://image.tmdb.org/t/p/w154/${movieDetails.poster_path}`"
            :alt="`${movieDetails.original_title} poster`"
          />
        </div>
        <div
          class="flex flex-row space-x-2 p-2 pt-6 md:pt-8 px-6 bg-backgroundSecondary text-content1 space-x-2"
        >
          <span class="text-bold text-xl">
            {{ movieDetails.original_title }}
          </span>

          <span class="text-xl text-content2"
            >({{ movieDetails.release_date.slice(0, 4) }})</span
          >
        </div>
      </div>

      <div id="mobile" class="md:hidden h-screen space-y-6">
        <div class="bg-backgroundPrimary text-content2 z-20 space-y-4 pt-8">
          <div class="px-6">
            <div
              class="w-full flex flex-row items-center justify-center space-x-2 p-2 rounded-lg bg-primary"
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

          <div class="grid grid-cols-2 px-6">
            <div class="flex flex-col text-left space-y-2 text-content1">
              <div class="text-bold">Release Date</div>
              <div class="text-bold">Runtime</div>
              <div class="text-bold">Budget</div>
              <div class="text-bold">Revenue</div>
              <div class="text-bold">Genre(s)</div>
            </div>

            <div class="flex flex-col text-left space-y-2">
              <div class="">{{ movieDetails.release_date }}</div>
              <div class="">{{ movieDetails.runtime }} minutes</div>
              <div class="">{{ USDollar.format(movieDetails.budget) }}</div>
              <div class="">{{ USDollar.format(movieDetails.revenue) }}</div>
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

          <div class="px-6 text-left">{{ movieDetails.overview }}</div>

          <!-- <div
            id="responsiveVideoWrapper"
            class="h-fit w-full aspect-video rounded-xl"
            v-if="movieVideos.length > 0"
          >
            <iframe
              class="w-full h-full rounded-4xl"
              :src="`https://www.youtube.com/embed/${movieVideos[0]?.key}`"
            ></iframe>
          </div> -->
        </div>

        <div class="px-6 rounded w-full max-w-md">
          <div class="accordion">
            <input type="checkbox" id="toggle-16" class="accordion-toggle" />
            <label for="toggle-16" class="accordion-title px-4"
              >Show Cast</label
            >
            <span class="accordion-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"
                ></path>
              </svg>
            </span>
            <div class="accordion-content">
              <div class="min-h-0 w-full flex flex-wrap">
                <div
                  v-for="person in movieCredits.cast"
                  class="w-1/3 drop-shadow-lg"
                >
                  <div class="flex flex-col w-full">
                    <img
                      :src="`https://image.tmdb.org/t/p/w92/${person.profile_path}`"
                      style="width: 92px; height: 138px"
                    />

                    <div
                      class="flex flex-col flex-wrap text-left text-md max-w-sm"
                    >
                      <span class="text-content1">{{ person.name }}</span>
                      <span class="text-sm text-content3">{{
                        person.character
                      }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="flex flex-col px-6">
          <div class="text-left text-2xl text-conent1 pb-2">
            Recommendations
          </div>
          <div class="w-full flex flex-wrap gap-2">
            <Container
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
            </Container>
          </div>
        </div>
      </div>

      <div
        id="screen"
        class="hidden mx-auto md:grid grid-cols-3 space-x-4 pt-10"
      >
        <div class="h-fit w-fit px-2">
          <div class="accordion-group accordion-group-bordered">
            <div class="accordion">
              <input
                type="checkbox"
                id="toggle-recommendations"
                class="accordion-toggle"
              />
              <label for="toggle-recommendations" class="accordion-title"
                >Recommendations</label
              >
              <span class="accordion-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"
                  ></path>
                </svg>
              </span>
              <div class="accordion-content text-content2">
                <div class="min-h-0">
                  <div class="w-full flex flex-wrap gap-2">
                    <Container
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
                    </Container>
                  </div>
                </div>
              </div>
            </div>
            <div class="accordion">
              <input
                type="checkbox"
                id="toggle-cast"
                class="accordion-toggle"
              />
              <label for="toggle-cast" class="accordion-title">Show Cast</label>
              <span class="accordion-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"
                  ></path>
                </svg>
              </span>
              <div class="accordion-content">
                <div class="min-h-0 w-full flex flex-wrap justify-center">
                  <div v-for="person in movieCredits.cast" class="w-32">
                    <div class="flex flex-col p-1">
                      <img
                        :src="`https://image.tmdb.org/t/p/w92/${person.profile_path}`"
                        style="width: 92px; height: 138px"
                      />

                      <div
                        class="flex flex-col flex-wrap text-left text-md max-w-sm"
                      >
                        <span class="text-content1">{{ person.name }}</span>
                        <span class="text-sm text-content3">{{
                          person.character
                        }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="bg-backgroundSecondary text-content2 space-y-8 rounded p-4 h-fit"
        >
          <div class="text-xl text-left space-y-4">
            <div class="text-4xl text-content1">Overview</div>
            <div class="">{{ movieDetails.overview }}</div>
          </div>
          <div
            id="responsiveVideoWrapper"
            class="h-fit w-full aspect-video rounded-xl"
            v-if="movieVideos.length > 0"
          >
            <iframe
              class="w-full h-full rounded-4xl"
              :src="`https://www.youtube.com/embed/${movieVideos[0]?.key}`"
            ></iframe>
          </div>
        </div>

        <div
          class="max-w-md h-fit bg-backgroundSecondary text-content2 rounded space-y-4 p-6"
        >
          <div
            class="w-full flex flex-row items-center justify-center space-x-2 p-2 rounded-lg bg-primary"
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

          <div class="grid grid-cols-2 space-x-8">
            <div class="flex flex-col text-left space-y-6 text-content1">
              <div class="text-bold">Release Date</div>
              <div class="text-bold">Runtime</div>
              <div class="text-bold">Budget</div>
              <div class="text-bold">Revenue</div>
              <div class="text-bold">Genre(s)</div>
            </div>

            <div class="flex flex-col text-left space-y-6">
              <div class="">{{ movieDetails.release_date }}</div>
              <div class="">{{ movieDetails.runtime }} minutes</div>
              <div class="">{{ USDollar.format(movieDetails.budget) }}</div>
              <div class="">{{ USDollar.format(movieDetails.revenue) }}</div>
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
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { useMovieStore } from "@/store/movies";
import Loading from "@/components/Loading.vue";
import { storeToRefs } from "pinia";
import Container from "@/components/Container.vue";

const movieStore = useMovieStore();
const {
  isLoadingDetails,
  movieDetails,
  movieCredits,
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
