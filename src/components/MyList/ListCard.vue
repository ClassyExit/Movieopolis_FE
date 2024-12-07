<template>
  <div
    class="flex flex-col max-w-md md:w-fit bg-backgroundSecondary rounded shadow-xl"
  >
    <div
      class="relative order-0 flex h-[231px] w-[154px] md:items-center md:justify-end"
    >
      <div class="absolute right-2 top-1 z-40 hover:cursor-pointer text-white">
        <AddToList
          :id="props.id"
          :poster="props.poster"
          :title_tv="props.title"
          :title_movie="props.title"
          :media_type="props.type"
          :overview="props.overview"
        />
      </div>
      <router-link
        v-if="props.type == 'movie'"
        :to="{ name: 'Movie-Details', params: { id: props.id | null } }"
        class="hover:cursor-pointer"
      >
        <img
          v-if="props.poster"
          class="rounded object-contain"
          :src="`https://image.tmdb.org/t/p/w154/${props.poster}`"
          :title="props.title_tv"
        />

        <div
          v-else
          class="flex items-center justify-center h-[231px] w-[154px] rounded"
        >
          <img src="../../assets/images/no-image.jpg" />
        </div>
      </router-link>

      <router-link
        v-if="props.type == 'tv'"
        :to="{ name: 'TV-Details', params: { id: props.id | null } }"
        class="hover:cursor-pointer"
        ><img
          v-if="props.poster"
          class="rounded object-contain"
          :src="`https://image.tmdb.org/t/p/w154/${props.poster}`"
          :title="props.title_tv"
        />

        <div
          v-else
          class="flex items-center justify-center h-[231px] w-[154px] rounded"
        >
          <img src="../../assets/images/no-image.jpg" />
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import AddToList from "@/components/Actions/AddToList.vue";

const props = defineProps({
  id: Number,
  title: String | undefined,
  overview: String | undefined,
  poster: String | undefined,
  type: String,
});
</script>
