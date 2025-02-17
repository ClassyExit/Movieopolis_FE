<template>
  <div class="flex flex-row w-full">
    <ul
      class="menu w-full space-y-4 md:space-y-0 md:menu-horizontal rounded-box px-0"
    >
      <li v-for="link in links">
        <router-link
          :to="{ name: link.name }"
          class="flex flex-row items-center"
          :class="link.showWeb ? 'flex' : 'md:hidden'"
        >
          <component :is="link.Icon" class="w-8 h-6 md:hidden" />
          {{ link.name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
import DashboardIcon from "@/assets/icons/DashboardIcon.vue";
import MovieIcon from "@/assets/icons/MovieIcon.vue";
import TVIcon from "@/assets/icons/TVIcon.vue";
import DiscoverIcon from "@/assets/icons/DiscoverIcon.vue";
import SettingIcon from "@/assets/icons/SettingIcon.vue";
import LibraryIcon from "@/assets/icons/LibraryIcon.vue";

const links = [
  {
    name: "Home",
    Icon: DashboardIcon,
    showWeb: true,
  },
  {
    name: "TV",
    Icon: TVIcon,
    showWeb: true,
  },
  {
    name: "Movie",
    Icon: MovieIcon,
    showWeb: true,
  },
  {
    name: "Discover",
    Icon: DiscoverIcon,
    showWeb: true,
  },
  {
    name: "Library",
    Icon: LibraryIcon,
    showWeb: true,
  },
  {
    name: "Settings",
    Icon: SettingIcon,
    showWeb: false,
  },
];
</script>
