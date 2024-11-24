<template>
  <div class="flex flex-col w-full md:justify-center md:items-center m-2">
    <div class="p-2 w-fit">
      <MobileReturn />
    </div>
    <div
      class="flex flex-row max-w-xl w-full scrollbar-hide md:scrollbar-default bg-backgroundSecondary rounded-lg md:shadow-xl p-4 overflow-auto"
    >
      <div class="flex flex-col w-full">
        <SettingHeaders>
          <template #title>Change Theme</template>

          <template #content>
            <div class="flex flex-row justify-between items-center px-4">
              <div class="text-xl">Theme</div>
              <div class=""><Theme /></div>
            </div>
          </template>
        </SettingHeaders>

        <div v-if="useUserStore().user" class="">
          <SettingHeaders>
            <template #title>Account Settings</template>

            <template #content>
              <div class="flex flex-col space-y-4">
                <router-link
                  :to="{ name: 'ChangePassword' }"
                  class="flex flex-row btn btn-ghost p-2 justify-between text-xl hover:bg-backgroundPrimary"
                >
                  <div class="flex flex-row space-x-2 items-center">
                    <Icon
                      class="text-primary"
                      icon="mdi:password-outline"
                      width="20"
                      height="20"
                    ></Icon>
                    <span>Change Password</span>
                  </div>
                </router-link>
              </div>
            </template>
          </SettingHeaders>

          <SettingHeaders>
            <template #title>Account Security</template>

            <template #content>
              <div class="flex flex-col space-y-2">
                <router-link
                  :to="{ name: 'Delete' }"
                  class="flex flex-row btn btn-ghost p-2 justify-between text-xl hover:bg-backgroundPrimary"
                >
                  <div class="flex flex-row space-x-2 items-center">
                    <Icon
                      class="text-error"
                      icon="pajamas:error"
                      width="20"
                      height="20"
                    ></Icon>
                    <span>Delete Account</span>
                  </div>
                </router-link>

                <div class="text-xl hover:bg-backgroundPrimary rounded">
                  <div
                    @click="useUserStore().logout()"
                    class="flex flex-row btn btn-ghost p-2 justify-start space-x-2 text-xl hover:bg-backgroundPrimary"
                  >
                    <Icon
                      class="text-error"
                      icon="gg:log-out"
                      width="20"
                      height="20"
                    />
                    <span> Logout</span>
                  </div>
                </div>
              </div>
            </template>
          </SettingHeaders>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import MobileReturn from "@/components/Actions/MobileReturn.vue";
import SettingHeaders from "./SettingHeaders.vue";
import Theme from "@/components/Theme/Theme.vue";
import { useUserStore } from "@/store/user";
</script>
