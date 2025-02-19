<template>
  <div class="mx-auto w-full flex flex-col items-center justify-center">
    <div class="w-full max-w-xl p-4 shadow-lg space-y-8">
      <div class="flex">
        <router-link
          :to="{ name: 'Home' }"
          class="flex flex-row space-x-2 text-base-content hover:text-primary cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="m7.364 12l4.24 4.246q.14.14.153.342t-.153.366q-.16.16-.354.16t-.354-.16l-4.388-4.389q-.131-.13-.184-.267q-.053-.136-.053-.298t.053-.298t.184-.267l4.388-4.389q.14-.14.341-.153t.367.153q.16.16.16.354t-.16.354zm6.1 0l4.24 4.246q.14.14.153.342t-.153.366q-.16.16-.354.16t-.354-.16l-4.388-4.389q-.131-.13-.184-.267q-.053-.136-.053-.298t.053-.298t.184-.267l4.388-4.389q.14-.14.342-.153t.366.153q.16.16.16.354t-.16.354z"
            />
          </svg>
          <span> Back to home </span>
        </router-link>
      </div>
      <slot name="body"></slot>
    </div>
  </div>
</template>

<script setup></script>
