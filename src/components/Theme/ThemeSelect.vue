<template>
  <div>
    <div class="flex items-center">
      <div class="dropdown dropdown-end">
        <label
          tabindex="0"
          class="btn btn-sm md:btn-md btn-ghost flex flex-row space-x-2"
          ><Icon icon="mdi:theme-light-dark" class="text-xl" />
          <Icon
            icon="material-symbols:keyboard-arrow-down-rounded"
            class="text-xl"
        /></label>
        <ul
          tabindex="0"
          class="flex flex-col dropdown-content menu p-2 shadow bg-base-300 rounded-box w-52 max-h-60 md:max-h-72"
        >
          <div class="max-w-80 overflow-auto space-y-1">
            <li>
              <button
                data-theme=""
                data-set-theme=""
                data-act-class="ACTIVECLASS"
                class="flex flex-row text-base-content"
                aria-label="Default Theme"
              >
                <Icon icon="ic:baseline-system-update-alt" />
                <span class="text-left w-1/2"> Default</span>
                <div class="flex flex-row space-x-1">
                  <div class="bg-primary h-6 w-2 rounded"></div>
                  <div class="bg-secondary h-6 w-2 rounded"></div>
                  <div class="bg-accent h-6 w-2 rounded"></div>
                  <div class="bg-neutral h-6 w-2 rounded"></div>
                </div>
              </button>
            </li>
            <li>
              <button
                data-theme="light"
                data-set-theme="light"
                data-act-class="ACTIVECLASS"
                class="flex flex-row text-base-content"
                aria-label="Light Theme"
              >
                <Icon icon="ic:outline-light-mode" />
                <span class="text-left w-1/2">Light</span>
                <div class="flex flex-row space-x-1">
                  <div class="bg-primary h-6 w-2 rounded"></div>
                  <div class="bg-secondary h-6 w-2 rounded"></div>
                  <div class="bg-accent h-6 w-2 rounded"></div>
                  <div class="bg-neutral h-6 w-2 rounded"></div>
                </div>
              </button>
            </li>
            <li>
              <button
                data-theme="dark"
                data-set-theme="dark"
                data-act-class="ACTIVECLASS"
                class="flex flex-row text-base-content"
                aria-label="Dark Theme"
              >
                <Icon icon="ic:outline-dark-mode" />
                <span class="text-left w-1/2">Dark</span>
                <div class="flex flex-row space-x-1">
                  <div class="bg-primary h-6 w-2 rounded"></div>
                  <div class="bg-secondary h-6 w-2 rounded"></div>
                  <div class="bg-accent h-6 w-2 rounded"></div>
                  <div class="bg-neutral h-6 w-2 rounded"></div>
                </div>
              </button>
            </li>
            <li>
              <button
                data-theme="corporate"
                data-set-theme="corporate"
                data-act-class="ACTIVECLASS"
                class="flex flex-row text-base-content"
                aria-label="Winter Theme"
              >
                <Icon icon="ic:outline-dark-mode" />
                <span class="text-left w-1/2">Winter</span>
                <div class="flex flex-row space-x-1">
                  <div class="bg-primary h-6 w-2 rounded"></div>
                  <div class="bg-secondary h-6 w-2 rounded"></div>
                  <div class="bg-accent h-6 w-2 rounded"></div>
                  <div class="bg-neutral h-6 w-2 rounded"></div>
                </div>
              </button>
            </li>
            <li>
              <button
                data-theme="business"
                data-set-theme="business"
                data-act-class="ACTIVECLASS"
                class="flex flex-row text-base-content"
                aria-label="Black Theme"
              >
                <Icon icon="ic:outline-dark-mode" />
                <span class="text-left w-1/2">Black</span>
                <div class="flex flex-row space-x-1">
                  <div class="bg-primary h-6 w-2 rounded"></div>
                  <div class="bg-secondary h-6 w-2 rounded"></div>
                  <div class="bg-accent h-6 w-2 rounded"></div>
                  <div class="bg-neutral h-6 w-2 rounded"></div>
                </div>
              </button>
            </li>
          </div>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { themeChange } from "theme-change";

onMounted(() => {
  themeChange(false);
});
</script>

<style lang="scss" scoped></style>
