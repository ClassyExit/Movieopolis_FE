<template>
  <div class="w-full">
    <div
      class="flex flex-col items-center justify-center w-full h-full"
      v-if="isLoadingTV"
    >
      <Loading />
    </div>

    <div v-else class="flex flex-col h-screen">
      <div
        id="backdrop-tv"
        class="relative inset-y-0 top-0 w-full h-2/5 z-0 pb-10"
      >
        <img
          class="h-full w-full object-cover blur-sm z-0"
          :src="`https://image.tmdb.org/t/p/original/${tvDetails.backdrop_path}`"
          :alt="`${tvDetails.original_name} backdrop`"
        />

        <div class="absolute left-4 top-4">
          <img
            class="h-full object-cover z-10"
            :src="`https://image.tmdb.org/t/p/w154/${tvDetails.poster_path}`"
            :alt="`${tvDetails.original_name} poster`"
          />
        </div>

        <div
          class="flex flex-row p-2 pt-6 mb-4 px-6 bg-backgroundSecondary text-content1 space-x-2"
        >
          <span class="text-bold text-xl">
            {{ tvDetails.original_name }}
          </span>

          <span class="text-xl text-content2"
            >({{ tvDetails.first_air_date.slice(0, 4) }})</span
          >
        </div>
      </div>

      <div id="mobile" class="md:hidden w-full h-screen space-y-6">
        <div class="bg-backgroundPrimary text-content2 z-20 space-y-4 pt-8">
          <div class="px-6 text-left text-md text-content1">
            {{ tvDetails?.overview }}
          </div>
          <div class="px-6 max-w-lg">
            <div
              class="w-full flex flex-row items-center justify-center space-x-2 p-2 rounded-lg bg-primary"
            >
              <Icon
                icon="streamline:interface-favorite-heart-reward-social-rating-media-heart-it-like-favorite-love"
                width="20"
                height="20"
              />

              <span class="text-content1">{{
                tvDetails.vote_average.toFixed(2)
              }}</span>
            </div>
          </div>

          <div class="grid grid-cols-2 px-6 max-w-lg">
            <div class="flex flex-col text-left space-y-2 text-content1">
              <div class="text-bold">Release Date</div>
              <div class="text-bold">Language(s)</div>
              <div class="text-bold">Last Air Date</div>
              <div class="text-bold">Networks</div>
              <div class="text-bold">Season(s)</div>
              <div class="text-bold">Total Episodes</div>
              <div class="text-bold">Genre(s)</div>
            </div>

            <div class="flex flex-col text-left space-y-2 text-content2">
              <div class="">{{ tvDetails.first_air_date }}</div>
              <div class="flex flex-wrap gap-1">
                <div
                  v-for="item in tvDetails.languages"
                  class="flex flex-wrap badge w-fit uppercase"
                >
                  {{ item }}
                </div>
              </div>
              <div class="text-bold">{{ tvDetails.last_air_date }}</div>
              <div class="flex flex-wrap gap-1">
                <div
                  v-for="item in tvDetails.networks"
                  class="flex flex-wrap badge badge-secondary w-fit uppercase"
                >
                  {{ item.name }}
                </div>
              </div>
              <div class="">{{ tvDetails.number_of_seasons }}</div>
              <div class="">{{ tvDetails.number_of_episodes }}</div>
              <div class="flex flex-wrap gap-1">
                <div
                  v-for="item in tvDetails.genres"
                  class="flex flex-wrap badge badge-primary w-fit"
                >
                  {{ item.name }}
                </div>
              </div>
            </div>
          </div>

          <div class="">Season details here</div>
        </div>

        <div
          id="responsiveVideoWrapper"
          class="h-fit w-full aspect-video rounded-xl"
          v-if="tvVideos.length > 0"
        >
          <iframe
            class="w-full h-full rounded-4xl"
            :src="`https://www.youtube.com/embed/${tvVideos[0]?.key}`"
          ></iframe>
        </div>

        <div class="flex flex-col px-6 rounded">
          <div class="text-left text-2xl">Seasons</div>
          <div class="w-full flex flex-wrap gap-2">
            <div
              class="flex flex-col cursor-pointer"
              v-for="season in tvDetails.seasons"
              @click="getSeasonDetails(tvDetails.id, season.season_number)"
            >
              <label for="season-details">
                <img
                  :src="`https://image.tmdb.org/t/p/w154/${season.poster_path}`"
                  :title="season.seaon_number"
                  style="width: 154px; height: 231px"
                />
                <span>{{ season.name }}</span>
              </label>
            </div>
          </div>
        </div>

        <div class="flex flex-col px-6">
          <div class="text-left text-2xl text-conent1 pb-2">
            Recommendations
          </div>
          <div
            v-if="tvRecommendations.results.length"
            class="w-full flex flex-wrap gap-2"
          >
            <Container
              v-for="item in tvRecommendations.results"
              :key="item.id"
              :id="item.id"
              :poster="`https://image.tmdb.org/t/p/w154/${item.poster_path}`"
              :title_tv="item.original_name"
              :year_tv="item.first_air_date"
              :rating="item.vote_average"
              :media_type="`tv`"
              :type="item.media_type"
            >
            </Container>
          </div>

          <div v-else class="">Sorry, unable to get recommendations</div>
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
                id="toggle-recommendations-tv"
                class="accordion-toggle"
              />
              <label for="toggle-recommendations-tv" class="accordion-title"
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
                  <div
                    v-if="tvRecommendations.results.length"
                    class="w-full flex flex-wrap gap-2"
                  >
                    <Container
                      v-for="item in tvRecommendations.results"
                      :key="item.id"
                      :id="item.id"
                      :poster="`https://image.tmdb.org/t/p/w154/${item.poster_path}`"
                      :title_tv="item.original_name"
                      :year_tv="item.first_air_date"
                      :rating="item.vote_average"
                      :media_type="`tv`"
                      :type="item.media_type"
                    >
                    </Container>
                  </div>

                  <div v-else class="">
                    Sorry, unable to get recommendations
                  </div>
                </div>
              </div>
            </div>
            <div class="accordion">
              <input
                type="checkbox"
                id="toggle-cast-tv"
                class="accordion-toggle"
              />
              <label for="toggle-cast-tv" class="accordion-title"
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
                <div class="min-h-0 w-full flex flex-wrap justify-center">
                  <div v-for="person in tvCredits.cast" class="w-32">
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
          <div class="text-xl text-left space-x-4 flex flex-row items-center">
            <div class="text-4xl text-content1">Overview</div>
            <div class="flex flex-wrap gap-2">
              <span class="badge badge-primary">{{ tvDetails.status }}</span>
              <span class="badge">"{{ tvDetails.tagline }}"</span>
            </div>
          </div>
          <div class="text-left text-md text-content1">
            {{ tvDetails?.overview }}
          </div>
          <div
            id="responsiveVideoWrapper"
            class="h-fit w-full aspect-video rounded-xl"
            v-if="tvVideos.length > 0"
          >
            <iframe
              class="w-full h-full rounded-4xl"
              :src="`https://www.youtube.com/embed/${tvVideos[0]?.key}`"
            ></iframe>
          </div>
          <div class="flex flex-col rounded">
            <div class="text-left text-2xl">Seasons</div>
            <div class="w-full flex flex-wrap gap-2">
              <div
                class="flex flex-col"
                v-for="season in tvDetails.seasons"
                @click="getSeasonDetails(tvDetails.id, season.season_number)"
              >
                <label for="season-details" class="cursor-pointer">
                  <img
                    :src="`https://image.tmdb.org/t/p/w154/${season.poster_path}`"
                    :title="season.seaon_number"
                    style="width: 154px; height: 231px"
                  />
                  <span>{{ season.name }}</span>
                </label>
              </div>
            </div>
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
              tvDetails.vote_average.toFixed(2)
            }}</span>
          </div>

          <div class="grid grid-cols-2 px-6 max-w-lg">
            <div class="flex flex-col text-left space-y-2 text-content1">
              <div class="text-bold">Release Date</div>
              <div class="text-bold">Language(s)</div>
              <div class="text-bold">Last Air Date</div>
              <div class="text-bold">Networks</div>
              <div class="text-bold">Season(s)</div>
              <div class="text-bold">Total Episodes</div>
              <div class="text-bold">Genre(s)</div>
            </div>

            <div class="flex flex-col text-left space-y-2 text-content2">
              <div class="">{{ tvDetails.first_air_date }}</div>
              <div class="flex flex-wrap gap-1">
                <div
                  v-for="item in tvDetails.languages"
                  class="flex flex-wrap badge w-fit uppercase"
                >
                  {{ item }}
                </div>
              </div>
              <div class="text-bold">{{ tvDetails.last_air_date }}</div>
              <div class="flex flex-wrap gap-1">
                <div
                  v-for="item in tvDetails.networks"
                  class="flex flex-wrap badge badge-secondary w-fit uppercase"
                >
                  {{ item.name }}
                </div>
              </div>
              <div class="">{{ tvDetails.number_of_seasons }}</div>
              <div class="">{{ tvDetails.number_of_episodes }}</div>
              <div class="flex flex-wrap gap-1">
                <div
                  v-for="item in tvDetails.genres"
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
  <SeasonDetailModal />
</template>

<script setup>
import { useRoute } from "vue-router";
import { useTVStore } from "@/store/tv";
import Loading from "@/components/Loading.vue";
import { storeToRefs } from "pinia";
import Container from "@/components/Container.vue";
import SeasonDetailModal from "./SeasonDetailModal.vue";

const tvStore = useTVStore();
const { isLoadingTV, tvDetails, tvCredits, tvRecommendations, tvVideos } =
  storeToRefs(tvStore);

const route = useRoute();
const id = route.params.id;

// Get TV show details
tvStore.getTVDetails(id);

const getSeasonDetails = (tv_id, season_number) => {
  tvStore.getTVSeasonDetails(tv_id, season_number);
};
</script>
