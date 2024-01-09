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
      </div>

      <div
        aria-label="layout"
        class="grid grid-cols-2 gap-4 justify-items-center"
      >
        <div
          class="flex flex-row space-x-4 mx-auto max-w-7xl w-full bg-backgroundSecondary p-2 rounded mt-10"
        >
          <div class="w-2/5">
            <img
              class="h-full object-cover z-10 rounded-lg"
              :src="`https://image.tmdb.org/t/p/w300/${tvDetails.poster_path}`"
              :alt="`${tvDetails.original_name} poster`"
            />
          </div>

          <div class="flex flex-col space-y-4">
            <div class="text-3xl">
              <div class="flex flex-row text-content1 space-x-2">
                <span class="text-bold">
                  {{ tvDetails.original_name }}
                </span>

                <span class="text-content2"
                  >({{ tvDetails.first_air_date.slice(0, 4) }})</span
                >
              </div>
            </div>

            <div class="flex flex-col space-y-4">
              <div class="text-left space-y-4 flex flex-row items-center">
                <div class="flex flex-row space-x-3">
                  <span class="badge badge-sm badge-primary">{{
                    tvDetails.status
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
                      tvDetails.vote_average.toFixed(2)
                    }}</span>
                  </div>
                </div>
              </div>
              <div class="text-left text-md text-content2">
                {{ tvDetails?.overview }}
              </div>
            </div>

            <div class="w-full">
              <div class="grid grid-cols-2 w-fit">
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

        <div
          aria-label="recommendations"
          class="flex flex-col bg-backgroundSecondary max-w-sm rounded p-2"
        >
          <div
            class="flex flex-row space-x-2 text-xl text-left p-1 text-content1"
          >
            <Icon icon="fluent-mdl2:show-time-as" />
            <span>You many also like...</span>
          </div>
          <div class="overflow-auto h-96">
            <div
              v-if="tvRecommendations.results.length"
              class="w-full flex flex-wrap gap-2"
            >
              <SmallContainer
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
              </SmallContainer>
            </div>

            <div v-else class="">Sorry, unable to get recommendations</div>
          </div>
        </div>
      </div>

      <div
        class="mx-auto flex flex-col space-y-6 md:space-y-0 md:grid grid-cols-3 space-x-4 pt-10"
      >
        <div
          aria-label="overview"
          class="bg-backgroundSecondary text-content2 space-y-8 rounded p-4 h-fit"
        >
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
        </div>

        <div
          aria-label="stats"
          class="max-w-md h-fit bg-backgroundSecondary text-content2 rounded space-y-4 p-6"
        ></div>

        <div class="">
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
import SmallContainer from "@/components/SmallContainer.vue";

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
