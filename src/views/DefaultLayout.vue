<template>
  <div class="flex flex-col w-full min-h-screen bg-backgroundPrimary">
    <Navbar>
      <template #web-left>
        <div class="hidden md:flex flex-row items-center space-x-8">
          <router-link :to="{ name: 'Home' }" class="flex items-center">
            <img src="@/assets/logo.png" class="h-8 w-8" />
            <h1 class="tracking-wide font-bold text-xl pl-2">Movieopolis</h1>
          </router-link>

          <div class="dropdown">
            <label class="btn btn-ghost my-2 text-lg" tabindex="0"
              >Browse</label
            >
            <div
              class="dropdown-menu dropdown-menu-bottom-right bg-backgroundSecondary"
            >
              <router-link
                :to="{ name: 'MoviesLayout' }"
                class="dropdown-item text-left justify-start btn btn-ghost flex flex-row items-center space-x-2 p-2 hover:bg-primary"
              >
                <Icon icon="mdi:movie-open" width="20" height="20" />
                <span> Movies</span>
              </router-link>

              <router-link
                :to="{ name: 'TVLayout' }"
                class="dropdown-item text-left justify-start btn btn-ghost flex flex-row items-center space-x-2 p-2 hover:bg-primary"
              >
                <Icon icon="lucide:tv" width="20" height="20" />
                <span> TV Shows</span>
              </router-link>
            </div>
          </div>
        </div>
      </template>

      <template #web-center></template>

      <template #web-right
        ><div class="hidden md:flex items-center">
          <Theme />
          <div class="divider divider-vertical mx-0 h-8"></div>

          <div class="space-x-2">Links</div>
        </div></template
      >

      <template #mobile-drop>
        <div class="dropdown">
          <label class="btn my-2" tabindex="0"
            ><Icon icon="charm:menu-hamburger" height="30" width="30"
          /></label>
          <div
            class="dropdown-menu dropdown-menu-bottom-right bg-backgroundSecondary"
          >
            <router-link
              :to="{ name: 'Home' }"
              class="dropdown-item text-left justify-start btn btn-ghost flex flex-row items-center space-x-2 p-2 hover:bg-primary"
            >
              <Icon icon="carbon:home" width="20" height="20" />
              <span> Home</span>
            </router-link>

            <router-link
              :to="{ name: 'MoviesLayout' }"
              class="dropdown-item text-left justify-start btn btn-ghost flex flex-row items-center space-x-2 p-2 hover:bg-primary"
            >
              <Icon icon="mdi:movie-open" width="20" height="20" />
              <span> Movies</span>
            </router-link>

            <router-link
              :to="{ name: 'TVLayout' }"
              class="dropdown-item text-left justify-start btn btn-ghost flex flex-row items-center space-x-2 p-2 hover:bg-primary"
            >
              <Icon icon="lucide:tv" width="20" height="20" />
              <span> TV Shows</span>
            </router-link>
          </div>
        </div>
      </template>
    </Navbar>

    <div class="flex flex-grow">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import Theme from "@/components/Theme/Theme.vue";
import Navbar from "@/components/Navigation/Navbar.vue";
</script>

<style scoped></style>
