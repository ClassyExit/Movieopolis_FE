<template>
  <div class="flex items-center cursor-pointer">
    <div class="dropdown hover:bg-backgroundSecondary rounded-lg">
      <label class="cursor-pointer" tabindex="0"
        ><Icon icon="mdi:theme-light-dark" width="25" height="25"
      /></label>
      <div
        class="dropdown-menu dropdown-menu-bottom-left bg-backgroundSecondary w-fit"
      >
        <div
          class="dropdown-item text-left justify-start btn btn-ghost flex flex-row items-center space-x-2 p-2 w-32 hover:bg-primary"
          data-set-theme="light"
          data-act-class="ACTIVECLASS"
        >
          <Icon icon="ic:outline-light-mode" width="20" height="20" />
          <span>Light</span>
        </div>

        <div
          class="dropdown-item text-left justify-start btn btn-ghost flex flex-row items-center space-x-2 p-2 w-32 hover:bg-primary"
          data-set-theme="dark"
          data-act-class="ACTIVECLASS"
        >
          <Icon icon="ic:outline-dark-mode" width="20" height="20" />
          <span>Dark</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { themeChange } from "theme-change";

onMounted(() => {
  themeChange(false);
});
</script>

<style lang="scss" scoped></style>
