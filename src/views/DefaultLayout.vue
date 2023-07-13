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
        ><div class="hidden md:flex items-center space-x-2">
          <Theme />
          <div class="divider divider-vertical mx-0 h-8"></div>

          <div
            class="avatar flex items-center bg-backgroundSecondary border border-primary"
          >
            <Icon icon="teenyicons:ghost-solid" width="25" height="25" />
          </div></div
      ></template>

      <template #mobile-drop>
        <!-- <div class="dropdown">
          <label class="btn my-2" tabindex="0"
            ><Icon icon="charm:menu-hamburger" height="30" width="30"
          /></label>
          <div
            class="dropdown-menu dropdown-menu-bottom-right bg-backgroundSecondary"
          ></div>
        </div> -->

        <input type="checkbox" id="drawer-left" class="drawer-toggle" />

        <label for="drawer-left" class="btn"
          ><Icon icon="charm:menu-hamburger" height="30" width="30"
        /></label>
        <label class="overlay" for="drawer-left"></label>
        <div class="drawer">
          <div class="drawer-content pt-12 flex flex-col h-full">
            <label
              for="drawer-left"
              class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              >✕</label
            >
            <div
              class="bg-backgroundSecondary py-4 rounded-xl flex flex-row items-center px-4 space-x-4"
            >
              <div
                class="avatar flex items-center bg-backgroundPrimary border border-primary"
              >
                <Icon icon="teenyicons:ghost-solid" width="25" height="25" />
              </div>
              <div class="">Welcome to Movieopolis!</div>
            </div>

            <div class="divider"></div>
            <div class="flex flex-col space-y-2">
              <span class="text-left text-primary text-xl">Explore</span>
              <div class="flex flex-col space-y-2">
                <router-link
                  :to="{ name: 'Home' }"
                  class="bg-backgroundSecondary text-left justify-start btn btn-ghost flex flex-row items-center space-x-2 p-2 hover:bg-primary"
                >
                  <Icon icon="carbon:home" width="20" height="20" />
                  <span> Home</span>
                </router-link>

                <router-link
                  :to="{ name: 'MoviesLayout' }"
                  class="bg-backgroundSecondary text-left justify-start btn btn-ghost flex flex-row items-center space-x-2 p-2 hover:bg-primary"
                >
                  <Icon icon="mdi:movie-open" width="20" height="20" />
                  <span> Movies</span>
                </router-link>

                <router-link
                  :to="{ name: 'TVLayout' }"
                  class="bg-backgroundSecondary text-left justify-start btn btn-ghost flex flex-row items-center space-x-2 p-2 hover:bg-primary"
                >
                  <Icon icon="lucide:tv" width="20" height="20" />
                  <span> TV Shows</span>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </template>

      <template #mobile-right>
        <div class="flex flex-row space-x-4">
          <Theme />
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
