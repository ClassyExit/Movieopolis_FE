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
              <div class="btn btn-ghost my-2 text-md">Home</div>
            </router-link>

            <router-link
              :to="{ name: 'MoviesLayout' }"
              class="btn btn-ghost my-2 text-md"
            >
              <span> Movies</span>
            </router-link>

            <router-link
              :to="{ name: 'TVLayout' }"
              class="btn btn-ghost my-2 text-md"
            >
              <span> TV Shows</span>
            </router-link>

            <router-link :to="{ name: 'List' }" class="flex items-center">
              <div class="btn btn-ghost my-2 text-md">My List</div>
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
          <div
            v-else
            class="avatar avatar-ring hover:avatar-ring-primary avatar-sm"
          >
            <div class="dropdown-container">
              <div class="dropdown">
                <label
                  class="btn btn-ghost flex cursor-pointer px-0 hover:bg-inherit"
                  tabindex="0"
                >
                  <Icon icon="iconamoon:profile" width="20" height="20" />
                </label>
                <div
                  class="dropdown-menu dropdown-menu-bottom-left bg-backgroundSecondary w-96 space-y-2"
                >
                  <div class="flex flex-col p-1 space-y-2">
                    <span class="text-content2 uppercase"
                      >Account & Security</span
                    >
                    <div class="grid grid-cols-3 gap-4">
                      <NavItemSlot title="Password" to="ChangePassword"
                        ><template #icon
                          ><svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 32 32"
                          >
                            <path
                              fill="currentColor"
                              d="M21 2a8.998 8.998 0 0 0-8.612 11.612L2 24v6h6l10.388-10.388A9 9 0 1 0 21 2m0 16a7.013 7.013 0 0 1-2.032-.302l-1.147-.348l-.847.847l-3.181 3.181L12.414 20L11 21.414l1.379 1.379l-1.586 1.586L9.414 23L8 24.414l1.379 1.379L7.172 28H4v-3.172l9.802-9.802l.848-.847l-.348-1.147A7 7 0 1 1 21 18"
                            />
                            <circle
                              cx="22"
                              cy="10"
                              r="2"
                              fill="currentColor"
                            /></svg></template
                      ></NavItemSlot>

                      <NavItemSlot title="Account" to="Delete"
                        ><template #icon
                          ><svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="-2 -3 24 24"
                          >
                            <path
                              fill="red"
                              d="m12.8 1.613l6.701 11.161c.963 1.603.49 3.712-1.057 4.71a3.213 3.213 0 0 1-1.743.516H3.298C1.477 18 0 16.47 0 14.581c0-.639.173-1.264.498-1.807L7.2 1.613C8.162.01 10.196-.481 11.743.517c.428.276.79.651 1.057 1.096m-2.22.839a1.077 1.077 0 0 0-1.514.365L2.365 13.98a1.17 1.17 0 0 0-.166.602c0 .63.492 1.14 1.1 1.14H16.7c.206 0 .407-.06.581-.172a1.164 1.164 0 0 0 .353-1.57L10.933 2.817a1.12 1.12 0 0 0-.352-.365zM10 14a1 1 0 1 1 0-2a1 1 0 0 1 0 2m0-9a1 1 0 0 1 1 1v4a1 1 0 0 1-2 0V6a1 1 0 0 1 1-1"
                            /></svg></template
                      ></NavItemSlot>
                    </div>
                  </div>

                  <div class="dropdown-divider" role="separator"></div>
                  <div
                    @click="useUserStore().logout"
                    class="dropdown-item text-sm flex flex-col items-center justify-center px-6 py-4 w-fit rounded hover:bg-backgroundPrimary transition ease-in-out duration-300"
                  >
                    <div class="w-6 h-6">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1024 1024"
                      >
                        <path
                          fill="red"
                          d="M116.832 543.664H671.28c17.696 0 32-14.336 32-32s-14.304-32-32-32H118.832l115.76-115.76c12.496-12.496 12.496-32.752 0-45.248s-32.752-12.496-45.248 0l-189.008 194l189.008 194c6.256 6.256 14.432 9.376 22.624 9.376s16.368-3.12 22.624-9.376c12.496-12.496 12.496-32.752 0-45.248zM959.664 0H415.663c-35.36 0-64 28.656-64 64v288h64.416V103.024c0-21.376 17.344-38.72 38.72-38.72h464.72c21.391 0 38.72 17.344 38.72 38.72l1.007 818.288c0 21.376-17.328 38.72-38.72 38.72h-465.71c-21.376 0-38.72-17.344-38.72-38.72V670.944l-64.416.08V960c0 35.344 28.64 64 64 64h543.984c35.36 0 64.016-28.656 64.016-64V64c-.015-35.344-28.671-64-64.015-64z"
                        />
                      </svg>
                    </div>

                    <div class="text-base pt-2">Sign out</div>
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
                    <router-link
                      :to="{ name: 'Settings' }"
                      class="flex flex-row space-x-4 py-4"
                    >
                      <Icon
                        icon="material-symbols:settings-outline"
                        width="20"
                        height="20"
                      />
                      <span> Settings</span>
                    </router-link>
                  </div>

                  <div class="px-4">
                    <div
                      @click="useUserStore().logout()"
                      class="flex flex-row space-x-4 py-4 text-error"
                    >
                      <Icon icon="circum:logout" width="20" height="20" />
                      <span> Logout</span>
                    </div>
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
import NavItemSlot from "@/components/Navigation/NavItemSlot.vue";

import { useUserStore } from "@/store/user";
import { storeToRefs } from "pinia";

const { user } = storeToRefs(useUserStore());
</script>

<style scoped></style>
