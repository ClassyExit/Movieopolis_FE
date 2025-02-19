<template>
  <div class="w-full">
    <div
      class="bg-base-100 text-base-content rounded text-xl md:text-2xl font-semibold p-1"
    >
      <slot name="title"></slot>
    </div>

    <div class="pt-2">
      <slot name="content"> </slot>
    </div>

    <div class="divider"></div>
  </div>
</template>
