<template>
  <div v-if="!user" class="w-full mx-auto flex justify-center">
    <div class="flex flex-col space-y-8 p-4 max-w-xl w-full pt-10">
      <div class="alert alert-error">
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M24 4C12.96 4 4 12.96 4 24C4 35.04 12.96 44 24 44C35.04 44 44 35.04 44 24C44 12.96 35.04 4 24 4ZM24 26C22.9 26 22 25.1 22 24V16C22 14.9 22.9 14 24 14C25.1 14 26 14.9 26 16V24C26 25.1 25.1 26 24 26ZM26 34H22V30H26V34Z"
            fill="#E92C2C"
          />
        </svg>
        <div class="flex flex-col text-left">
          <span class="md:text-lg">Login Required</span>
          <span class="text-content2"
            >You must be logged in to view your list!</span
          >
        </div>
      </div>

      <router-link
        class="btn btn-outline-primary text-primary bg-backgroundSecondary rounded text-xl p-2"
        :to="{ name: 'Login' }"
        >Login here</router-link
      >
    </div>
  </div>

  <div v-else class="w-full flex flex-col p-4 md:px-16 pt-4 space-y-4">
    <div class="flex flex-row items-center space-x-2 25w-full">
      <span class="text-3xl">My List</span>

      <span
        class="tooltip tooltip-top"
        data-tooltip="If list does not load, manually re-sync"
      >
        <Icon
          @click="manualResync()"
          class="text-primary hover:cursor-pointer"
          icon="material-symbols:sync"
          width="25"
          height="25"
        />
      </span>
    </div>
    <div
      v-if="!list.length"
      class="flex h-2/5 items-center justify-center text-content2"
    >
      You haven't added any titles to your list yet.
    </div>

    <div v-else class="flex flex-col space-y-4">
      <div class="flex flex-row space-x-4 overflow-auto max-w-md">
        <div
          class="flex bg-backgroundSecondary p-2 rounded hover:cursor-pointer"
          :class="listFilter == 'all' ? 'bg-primary' : ''"
          @click="updateFilter('all')"
        >
          All
        </div>
        <div
          :class="listFilter == 'movie' ? 'bg-primary' : ''"
          class="flex bg-backgroundSecondary p-2 rounded hover:cursor-pointer"
          @click="updateFilter('movie')"
        >
          Movies
        </div>
        <div
          :class="listFilter == 'tv' ? 'bg-primary' : ''"
          class="flex bg-backgroundSecondary p-2 rounded hover:cursor-pointer"
          @click="updateFilter('tv')"
        >
          TV Shows
        </div>
      </div>

      <div
        class="flex flex-col py-2 space-y-2 md:space-y-0 md:flex-wrap md:flex-row gap-4 w-full"
      >
        <List
          v-for="item in filteredList"
          :key="item.id"
          :title="item.title"
          :overview="item.overview"
          :poster="item.poster"
          :type="item.type"
        >
          <template #options>
            <div class="text-primary uppercase">
              <router-link
                v-if="item.type == 'movie'"
                :to="{ name: 'Movie-Details', params: { id: item.id } }"
                class="hover:cursor-pointer"
                >More
              </router-link>

              <router-link
                v-else
                :to="{ name: 'TV-Details', params: { id: item.id } }"
                class="hover:cursor-pointer"
                >More
              </router-link>
            </div>
            <Icon
              @click="remove(item.id)"
              class="text-error"
              icon="material-symbols:cancel"
              width="20"
              height="20"
            />
          </template>
        </List>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useListStore } from "@/store/list";
import { useUserStore } from "@/store/user";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import List from "@/components/MyList/List.vue";

const { list, filteredList } = storeToRefs(useListStore());

const { user } = storeToRefs(useUserStore());

const listFilter = ref("all");

const updateFilter = (newValue) => {
  listFilter.value = newValue;

  useListStore().filterResults(newValue);
};

const remove = (id) => {
  useListStore().removeFromList(id);
};

if (useListStore().list.length > 0) {
} else {
  useListStore().getListFromDB();
}

const manualResync = () => {
  useListStore().getListFromDB();
};
</script>
