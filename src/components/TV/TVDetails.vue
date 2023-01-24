<template>
  <teleport to="body">
    <input type="checkbox" id="tv-details" class="modal-toggle" />
    <div class="modal modal-bottom sm:modal-middle">
      <div class="modal-box w-full max-w-5xl">
        <div v-if="isLoadingDetails" class=""><Loading /></div>

        <div v-else class="space-y-2">
          <div dev-hint="poster" class="flex flex-row shadow rounded space-x-2">
            <div class="hidden md:block items-center">
              <img
                :src="`https://image.tmdb.org/t/p/w154/${tvStore.tvDetails.poster_path}`"
              />
            </div>

            <div class="flex flex-col w-full">
              <span class="text-4xl md:text-2xl text-center">{{
                tvStore.tvDetails.name
              }}</span>

              <div class="flex flex-wrap justify-center w-full gap-1">
                <div
                  v-for="item in tvStore.tvDetails.genres"
                  class="text-xs text-primary-content w-fit bg-primary rounded p-1"
                >
                  {{ item.name }}
                </div>

                <div
                  v-for="item in tvStore.tvDetails.networks"
                  class="text-xs text-primary-content w-fit bg-secondary rounded p-1"
                >
                  {{ item.name }}
                </div>
              </div>

              <div class="stats">
                <div class="stat">
                  <div class="stat-figure text-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      class="inline-block w-8 h-8 stroke-current"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      ></path>
                    </svg>
                  </div>
                  <div class="stat-title">Average Rating</div>
                  <div class="stat-value text-primary">
                    {{ tvStore.tvDetails.vote_average }} / 10
                  </div>
                  <div class="stat-desc">
                    ({{ tvStore.tvDetails.vote_count }})
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="">
            <div class="text-left">
              <span>{{ tvStore.tvDetails.overview }}</span>
            </div>
          </div>

          <div class="divider"></div>
          <div class="">
            <div class="flex flex-row justify-between">
              <div class="text-info text-2xl">Reviews</div>
            </div>

            <vue-horizontal responsive>
              <div v-if="!tvStore.tvReviews.results?.length">
                <span class="">Looks like there are no reviews yet.</span>
              </div>
              <section
                v-for="item in tvStore.tvReviews.results"
                :key="item.id"
                class="px-1"
                v-else
              >
                <div class="">
                  <div class="card w-60 md:w-96 bg-base-200 shadow-xl h-48">
                    <div class="card-body">
                      <p
                        class="line-clamp-4 text-left text-ellipsis overflow-hidden"
                      >
                        {{ item.content }}
                      </p>
                      <label
                        for="review-modal"
                        @click="expandReview(item.content)"
                        class="btn btn-sm"
                        >View full</label
                      >
                    </div>
                  </div>
                </div>
              </section>
            </vue-horizontal>
          </div>

          <div class="divider"></div>

          <div dev-hint="recommendation" class="mx-1">
            <div class="text-left text-2xl text-base-content">
              More Like This
            </div>
            <div
              v-if="tvStore.tvRecommendations.results?.length !== 0"
              class=""
            >
              <vue-horizontal responsive>
                <section
                  v-for="item in tvStore.tvRecommendations.results"
                  :key="item.id"
                  class="px-1 cursor-pointer"
                  @click="tvStore.getTVDetails(item.id)"
                >
                  <label for="movie-details"
                    ><img
                      :src="`https://image.tmdb.org/t/p/w154/${item.poster_path}`"
                  /></label>
                </section>
              </vue-horizontal>
            </div>
            <div v-else class="nowrap space-x-2 text-left">
              <span
                >Sorry, unable to get recommendations
                <Icon icon="cil:sad" width="20" height="20"
              /></span>
            </div>
          </div>

          <div class="modal-action">
            <label for="tv-details" class="btn">Close</label>
          </div>
        </div>
      </div>
    </div>

    <!-- Expanded Review comments -->
    <input type="checkbox" id="review-modal" class="modal-toggle" />
    <div class="modal">
      <div class="modal-box relative bg-base-200" for="">
        <label
          for="review-modal"
          class="btn-sm btn-circle absolute right-2 top-2"
          >✕</label
        >
        <p class="pt-5 text-left">{{ reviewExpand }}</p>
        <div class="modal-action">
          <label for="review-modal" class="btn">Close</label>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useTVStore } from "@/store/tv";
import Loading from "../Loading.vue";

// Components
import VueHorizontal from "vue-horizontal";

const tvStore = useTVStore();

const { isLoadingDetails } = storeToRefs(tvStore);

/* Show the full review  */
const reviewExpand = ref("");

const expandReview = (content) => {
  reviewExpand.value = content;
};
</script>

<style scoped></style>
