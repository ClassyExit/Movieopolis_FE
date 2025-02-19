<template>
  <div class="w-full flex flex-col items-center justify-center">
    <div
      class="w-full bg-base-300 p-4 text-left space-y-4 rounded container mx-auto md:max-w-3xl lg:max-w-4xl text-base-content"
    >
      <div class="justify-start flex w-full"><MobileReturn /></div>
      <div class="text-2xl">Confirm Account Deletion</div>
      <div class="">
        Your personal data will be deleted immediately and you will no longer be
        able to sign in using your current credentials. Please note, after
        successful deletion, you will be signed out and returned to the home
        page.
      </div>

      <div
        class="flex flex-row w-full items-center justify-evenly space-x-8 text-center"
      >
        <!-- The button to open modal -->
        <button
          class="btn btn-error w-2/5 rounded cursor-pointer"
          onclick="delete_modal.showModal()"
          @click="resetDeleteInfo"
        >
          Continue
        </button>

        <div
          class="btn btn-ghost rounded w-2/5 p-2 text-base-content cursor-pointer"
          @click="cancel"
        >
          Cancel
        </div>
      </div>
    </div>
  </div>

  <!-- Modal for account delete -->

  <dialog id="delete_modal" class="modal">
    <div class="modal-box bg-base-200 flex flex-col space-y-6">
      <div
        class="alert alert-error"
        v-if="deleteAccountResults.result == 'error'"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>{{ deleteAccountResults.message }}</span>
      </div>
      <span class="text-left text-md text-content2"
        >Please enter your current password</span
      >
      <div class="w-full">
        <div class="relative w-full">
          <label class="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              class="h-4 w-4 opacity-70"
            >
              <path
                fill-rule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clip-rule="evenodd"
              />
            </svg>
            <input
              class="grow"
              value="password"
              autocomplete="off"
              :type="revealPassword ? 'text ' : 'password'"
              placeholder="Password"
              v-model="password"
            />
          </label>
          <span
            class="absolute right-3 top-2.5"
            @click="revealPassword = !revealPassword"
          >
            <Icon
              v-if="revealPassword"
              icon="mdi:eye-off"
              width="20"
              height="20"
            />
            <Icon v-else icon="mdi:eye" width="20" height="20" />
          </span>
        </div>
      </div>
      <!-- Actions -->
      <div class="flex flex-row justify-evenly items-center w-full">
        <div @click="deleteAccount()" class="flex justify-center w-3/4">
          <button class="btn btn-error w-3/4 rounded">Delete</button>
        </div>

        <div class="flex justify-center w-3/4">
          <form method="dialog" class="w-full">
            <button class="btn w-3/4 btn-outline">Close</button>
          </form>
        </div>
      </div>
    </div>
  </dialog>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "@/store/user";
import router from "@/router";
import { storeToRefs } from "pinia";
import MobileReturn from "@/components/Actions/MobileReturn.vue";

const { deleteAccountResults } = storeToRefs(useUserStore());

const resetDeleteInfo = () => {
  useUserStore().deleteAccountResults = {};
};

const password = ref("");

const cancel = () => {
  router.push({ name: "Settings" });
};

const revealPassword = ref(false);

const deleteAccount = () => {
  useUserStore().deleteUserAccount(password.value);
};
</script>

<style lang="scss" scoped></style>
