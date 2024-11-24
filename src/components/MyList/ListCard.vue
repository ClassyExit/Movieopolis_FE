<template>
  <div
    class="flex flex-col max-w-md md:w-fit bg-backgroundSecondary rounded shadow-xl"
  >
    <div
      class="order-0 flex h-[231px] w-[154px] md:items-center md:justify-end"
    >
      <router-link
        v-if="props.type == 'movie'"
        :to="{ name: 'Movie-Details', params: { id: props.id | null } }"
        class="hover:cursor-pointer"
        ><img
          v-if="props.poster"
          class="rounded object-contain"
          :src="`https://image.tmdb.org/t/p/w154/${props.poster}`"
          :title="props.title_tv"
        />

        <div
          v-else
          class="flex items-center justify-center bg-white opacity-50 h-[231px] w-[154px] rounded"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="96"
            height="96"
            viewBox="0 0 32 32"
          >
            <path
              fill="black"
              d="M30 3.414L28.586 2L2 28.586L3.414 30l2-2H26a2.003 2.003 0 0 0 2-2V5.414zM26 26H7.414l7.793-7.793l2.379 2.379a2 2 0 0 0 2.828 0L22 19l4 3.997zm0-5.832l-2.586-2.586a2 2 0 0 0-2.828 0L19 19.168l-2.377-2.377L26 7.414zM6 22v-3l5-4.997l1.373 1.374l1.416-1.416l-1.375-1.375a2 2 0 0 0-2.828 0L6 16.172V6h16V4H6a2.002 2.002 0 0 0-2 2v16z"
            />
          </svg>
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
          class="flex items-center justify-center bg-white opacity-50 h-[231px] w-[154px] rounded"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="96"
            height="96"
            viewBox="0 0 32 32"
          >
            <path
              fill="black"
              d="M30 3.414L28.586 2L2 28.586L3.414 30l2-2H26a2.003 2.003 0 0 0 2-2V5.414zM26 26H7.414l7.793-7.793l2.379 2.379a2 2 0 0 0 2.828 0L22 19l4 3.997zm0-5.832l-2.586-2.586a2 2 0 0 0-2.828 0L19 19.168l-2.377-2.377L26 7.414zM6 22v-3l5-4.997l1.373 1.374l1.416-1.416l-1.375-1.375a2 2 0 0 0-2.828 0L6 16.172V6h16V4H6a2.002 2.002 0 0 0-2 2v16z"
            />
          </svg>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  id: Number,
  title: String | undefined,
  overview: String | undefined,
  poster: String | undefined,
  type: String,
});
</script>
