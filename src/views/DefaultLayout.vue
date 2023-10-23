<template>
  <div class="flex flex-col w-full min-h-screen bg-backgroundPrimary">
    <Navbar>
      <template #web-left>
        <div class="hidden md:flex flex-row items-center space-x-8">
          <router-link :to="{ name: 'Home' }" class="flex items-center">
            <img src="@/assets/logo.png" class="h-8 w-8" />
            <h1 class="tracking-wide font-bold text-xl pl-2">Movieopolis</h1>
          </router-link>

          <div class="flex flex-row">
            <router-link :to="{ name: 'Home' }" class="flex items-center">
              <div class="btn btn-ghost my-2 text-lg">Home</div>
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

            <router-link :to="{ name: 'List' }" class="flex items-center">
              <div class="btn btn-ghost my-2 text-lg">My List</div>
            </router-link>
          </div>
        </div>
      </template>

      <template #web-center></template>

      <template #web-right
        ><div class="hidden md:flex items-center space-x-2">
          <Theme />
          <div class="divider divider-vertical h-8"></div>

          <div v-if="!user">
            <div class="space-x-2">
              <router-link :to="{ name: 'Login' }" class="btn btn-ghost"
                ><span class="font-semibold">Log In</span></router-link
              >
              <router-link
                :to="{ name: 'Register' }"
                class="btn btn-primary hover:bg-primary2"
                ><span class="font-semibold">Sign Up</span></router-link
              >
            </div>
          </div>
          <div v-else class="avatar avatar-ring-primary avatar-md">
            <div class="dropdown-container">
              <div class="dropdown">
                <label
                  class="btn btn-ghost flex cursor-pointer px-0 hover:bg-inherit"
                  tabindex="0"
                >
                  <Icon icon="iconamoon:profile" width="30" height="30" />
                </label>
                <div
                  class="dropdown-menu dropdown-menu-bottom-left bg-backgroundSecondary"
                >
                  <router-link
                    class="dropdown-item text-sm"
                    :to="{ name: 'Settings' }"
                    >Settings</router-link
                  >
                  <div class="dropdown-divider" role="separator"></div>
                  <div
                    @click="useUserStore().logout"
                    class="dropdown-item text-sm text-error"
                  >
                    Logout
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>

      <template #mobile-drop>
        <input type="checkbox" id="drawer-left" class="drawer-toggle" />

        <label for="drawer-left"
          ><Icon icon="charm:menu-hamburger" height="30" width="30"
        /></label>
        <label class="overlay" for="drawer-left"></label>

        <div class="drawer">
          <div class="drawer-content px-0 pt-12 flex flex-col h-full">
            <label
              for="drawer-left"
              class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              >✕</label
            >
            <div
              class="py-8 flex flex-row items-center text-center px-4 space-x-4 border-b border-border"
            >
              <div class="w-full text-4xl">Movieopolis</div>
            </div>

            <div class="flex flex-col">
              <div
                class="flex flex-col divide-y divide-border border-b border-border"
              >
                <div class="px-4">
                  <router-link
                    :to="{ name: 'Home' }"
                    class="flex flex-row space-x-4 py-4"
                  >
                    <Icon icon="carbon:home" width="20" height="20" />
                    <span> Home</span>
                  </router-link>
                </div>

                <div class="px-4">
                  <router-link
                    :to="{ name: 'MoviesLayout' }"
                    class="flex flex-row space-x-4 py-4"
                  >
                    <Icon icon="mdi:movie-open" width="20" height="20" />
                    <span> Movies</span>
                  </router-link>
                </div>

                <div class="px-4">
                  <router-link
                    :to="{ name: 'TVLayout' }"
                    class="flex flex-row space-x-4 py-4"
                  >
                    <Icon icon="lucide:tv" width="20" height="20" />
                    <span> TV Shows</span>
                  </router-link>
                </div>

                <div class="px-4">
                  <router-link
                    :to="{ name: 'List' }"
                    class="flex flex-row space-x-4 py-4"
                  >
                    <Icon icon="pixelarticons:list" width="20" height="20" />
                    <span> My List</span>
                  </router-link>
                </div>

                <div v-if="user" class="divide-y divide-border">
                  <div class="px-4">
                    <section class="menu-section py-4 px-0">
                      <ul class="menu-items">
                        <li>
                          <input
                            type="checkbox"
                            id="menu-1"
                            class="menu-toggle"
                            v-model="openSettings"
                          />

                          <label
                            class="w-full flex flex-row justify-between"
                            for="menu-1"
                          >
                            <div class="flex flex-row space-x-4">
                              <Icon
                                icon="material-symbols:settings-outline"
                                width="20"
                                height="20"
                              />
                              <span> Settings</span>
                            </div>
                            <span class="menu-icon">
                              <Icon
                                v-if="!openSettings"
                                icon="formkit:arrowright"
                                width="20"
                                height="20"
                              />
                              <Icon
                                v-else
                                icon="formkit:arrowdown"
                                width="20"
                                height="20"
                              />
                            </span>
                          </label>

                          <div class="menu-item-collapse">
                            <div class="min-h-0 space-y-2">
                              <router-link
                                class="menu-item ml-6 pt-4"
                                :to="{ name: 'ChangePassword' }"
                                >Change Password</router-link
                              >
                              <router-link
                                class="text-error menu-item ml-6"
                                :to="{ name: 'Delete' }"
                                >Delete Account</router-link
                              >
                            </div>
                          </div>
                        </li>
                      </ul>
                    </section>
                  </div>

                  <div class="px-4">
                    <router-link
                      :to="{ name: 'TVLayout' }"
                      class="flex flex-row space-x-4 py-4 text-error"
                    >
                      <Icon icon="circum:logout" width="20" height="20" />
                      <span> Logout</span>
                    </router-link>
                  </div>
                </div>

                <div v-else class="py-4">
                  <div class="space-x-8">
                    <router-link :to="{ name: 'Login' }" class="btn btn-ghost"
                      ><span class="font-semibold">Log In</span></router-link
                    >
                    <router-link
                      :to="{ name: 'Register' }"
                      class="btn btn-primary hover:bg-primary2"
                      ><span class="font-semibold">Sign Up</span></router-link
                    >
                  </div>
                </div>
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
import { ref } from "vue";

import { useUserStore } from "@/store/user";
import { storeToRefs } from "pinia";

let openSettings = ref(false);

const { user } = storeToRefs(useUserStore());
</script>

<style scoped></style>
