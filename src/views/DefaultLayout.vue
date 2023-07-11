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
              <a
                class="dropdown-item text-left justify-start btn btn-ghost flex flex-row items-center space-x-2 p-2 hover:bg-primary"
                >Profile</a
              >
              <a
                tabindex="-1"
                class="dropdown-item text-left justify-start btn btn-ghost flex flex-row items-center space-x-2 p-2 hover:bg-primary"
                >Account settings</a
              >
              <a
                tabindex="-1"
                class="dropdown-item text-left justify-start btn btn-ghost flex flex-row items-center space-x-2 p-2 hover:bg-primary"
                >Subscriptions</a
              >
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
            <div class="dropdown-item text-sm">Links</div>
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
