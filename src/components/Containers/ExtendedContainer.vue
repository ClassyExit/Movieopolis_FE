<template>
  <div
    class="w-full max-w-3xl rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105"
  >
    <router-link
      :to="{ name: 'Movie-Details', params: { id: id } }"
      class="hover:cursor-pointer w-full"
    >
      <div class="relative">
        <!-- Movie Backdrop -->
        <div v-if="backdrop">
          <img
            class="w-full h-60 md:h-80 object-cover"
            :src="`https://image.tmdb.org/t/p/${
              isMobile ? 'w300' : 'w1280'
            }/${backdrop}`"
            :title="title"
          />
        </div>

        <!-- Overlay for readability -->
        <div
          class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"
        ></div>

        <!-- Movie Details -->
        <div class="absolute bottom-0 p-4 text-white w-full">
          <h3 class="text-xl font-bold truncate">{{ title }}</h3>
          <p
            class="text-sm text-gray-200 line-clamp-1 md:line-clamp-3 text-left"
          >
            {{ overview }}
          </p>

          <!-- Movie Meta Info -->
          <div class="flex items-center justify-between mt-2">
            <span class="text-sm text-gray-300">{{
              formatDate(release_date)
            }}</span>
            <span
              class="bg-accent text-accent-content px-2 py-1 text-xs font-semibold rounded-md"
            >
              ⭐ {{ rating.toFixed(1) }}
            </span>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script setup>
const props = defineProps({
  poster: String,
  backdrop: String,
  id: Number,
  title: String,
  overview: String,
  rating: Number,
  rating_count: Number,
  release_date: String,
  isMobile: Boolean,
});

function formatDate(dateString) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
    .format(date)
    .replace(/(\d+)(?=(st|nd|rd|th))/, "$1");
}
</script>

<style scoped></style>
