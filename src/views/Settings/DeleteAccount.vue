<template>
  <div
    class="w-full text-left px-4 space-y-4 pt-8 md:pt-20 container mx-auto md:max-w-3xl lg:max-w-4xl text-base-content"
  >
    <div class="text-2xl">Confirm Account Deletion</div>
    <div class="">
      Your personal data will be deleted immediately and you will no longer be
      able to sign in using your current credentials. Please note, after
      successful deletion, you will be signed out and returned to the home page.
    </div>
    <div class="">Are you sure you want to delete your account?</div>

    <div
      class="flex flex-row w-full items-center justify-evenly space-x-8 text-center"
    >
      <!-- The button to open modal -->
      <label
        for="delete-modal"
        class="btn btn-error w-2/5 rounded cursor-pointer"
        @click="resetDeleteInfo"
        >Continue
      </label>

      <div
        class="btn btn-ghost rounded w-2/5 p-2 text-base-content cursor-pointer"
        @click="cancel"
      >
        Cancel
      </div>
    </div>
  </div>

  <!-- Modal for account delete -->
  <input class="modal-state" id="delete-modal" type="checkbox" />
  <div class="modal w-screen">
    <label class="modal-overlay" for="modal-1"></label>
    <div class="modal-content flex flex-col gap-5 max-w-2xl w-full">
      <label
        for="delete-modal"
        class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >✕</label
      >
      <h2 class="text-xl">Account Deletion</h2>
      <div
        class="alert alert-error"
        v-if="deleteAccountResults.result == 'error'"
      >
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
        <div class="flex flex-col">
          <span>Error!</span>
          <span class="text-content2">{{ deleteAccountResults.message }}</span>
        </div>
      </div>
      <span class="text-md text-content2"
        >Please enter your current password</span
      >
      <div class="w-full">
        <div class="relative w-full">
          <input
            :type="revealPassword ? 'text ' : 'password'"
            autocomplete="off"
            placeholder="Password"
            v-model="password"
            class="input-block input"
          />
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
      <div class="flex gap-3 justify-between">
        <button @click="deleteAccount()" class="btn btn-error rounded w-2/5">
          Delete
        </button>

        <label for="delete-modal" class="btn btn-ghost rounded w-2/5"
          >Cancel</label
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "@/store/user";
import router from "@/router";
import { storeToRefs } from "pinia";

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
