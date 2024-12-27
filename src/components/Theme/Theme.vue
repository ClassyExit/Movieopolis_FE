<template>
  <div class="flex items-center cursor-pointer">
    <div
      class="tabs tabs-boxed gap-2 bg-backgroundPrimary"
      @click="onThemeChange"
    >
      <div
        class="text-left btn flex flex-row items-center space-x-2 p-2 hover:bg-primary"
        :class="currentTheme === 'light' ? 'btn-primary' : 'btn-ghost'"
        data-set-theme="light"
        data-act-class="ACTIVECLASS"
      >
        <Icon icon="ic:outline-light-mode" width="20" height="20" />
        <span>Light</span>
      </div>

      <div
        class="text-left btn flex flex-row items-center space-x-2 p-2 hover:bg-primary"
        :class="currentTheme === 'dark' ? 'btn-primary' : 'btn-ghost'"
        data-set-theme="dark"
        data-act-class="ACTIVECLASS"
      >
        <Icon icon="ic:outline-dark-mode" width="20" height="20" />
        <span>Dark</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { themeChange } from "theme-change";
import { ref } from "vue";

const currentTheme = ref("");

onMounted(() => {
  themeChange(false);

  currentTheme.value = localStorage.getItem("theme");
});

const onThemeChange = () => {
  // Update the theme value after each change
  currentTheme.value = localStorage.getItem("theme");
};
</script>

<style lang="scss" scoped></style>
