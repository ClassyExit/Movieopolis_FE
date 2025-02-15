<template>
  <div class="flex flex-row justify-between items-center">
    <div class="">
      <router-link :to="{ name: 'Home' }" class="btn btn-ghost"
        >Home</router-link
      >

      <router-link :to="{ name: 'Login' }" class="btn btn-ghost"
        >Login</router-link
      >
      <router-link :to="{ name: 'Register' }" class="btn btn-ghost"
        >Register</router-link
      >
      <router-link :to="{ name: 'Reset' }" class="btn btn-ghost"
        >Reset</router-link
      >
    </div>

    <div class="flex flex-row items-center space-x-2">
      <ul class="menu menu-horizontal rounded-box">
        <li>
          <Theme />
        </li>
      </ul>
      <div class="divider text-neutral">|</div>
      <div class="">Auth here</div>
    </div>
  </div>
</template>

<script setup>
import Theme from "@/components/Theme/Theme.vue";
</script>
