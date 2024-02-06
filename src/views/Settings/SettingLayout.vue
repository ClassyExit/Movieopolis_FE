<template>
  <div class="flex flex-col w-full md:justify-center md:items-center">
    <div class="p-4 w-fit">
      <MobileReturn />
    </div>
    <div
      class="flex max-w-5xl w-full flex flex-row h-3/5 md:bg-backgroundSecondary rounded-lg md:shadow-xl p-2"
    >
      <div class="flex flex-col p-1 space-y-2">
        <span class="text-left text-content2 uppercase"
          >Account & Security</span
        >
        <div class="flex flex-wrap gap-4">
          <NavItemSlot
            title="Password"
            to="ChangePassword"
            class="bg-backgroundSecondary shadow"
            ><template #icon
              ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                <path
                  fill="currentColor"
                  d="M21 2a8.998 8.998 0 0 0-8.612 11.612L2 24v6h6l10.388-10.388A9 9 0 1 0 21 2m0 16a7.013 7.013 0 0 1-2.032-.302l-1.147-.348l-.847.847l-3.181 3.181L12.414 20L11 21.414l1.379 1.379l-1.586 1.586L9.414 23L8 24.414l1.379 1.379L7.172 28H4v-3.172l9.802-9.802l.848-.847l-.348-1.147A7 7 0 1 1 21 18"
                />
                <circle
                  cx="22"
                  cy="10"
                  r="2"
                  fill="currentColor"
                /></svg></template
          ></NavItemSlot>

          <NavItemSlot
            title="Account"
            to="Delete"
            class="bg-backgroundSecondary shadow"
            ><template #icon
              ><svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -3 24 24">
                <path
                  fill="red"
                  d="m12.8 1.613l6.701 11.161c.963 1.603.49 3.712-1.057 4.71a3.213 3.213 0 0 1-1.743.516H3.298C1.477 18 0 16.47 0 14.581c0-.639.173-1.264.498-1.807L7.2 1.613C8.162.01 10.196-.481 11.743.517c.428.276.79.651 1.057 1.096m-2.22.839a1.077 1.077 0 0 0-1.514.365L2.365 13.98a1.17 1.17 0 0 0-.166.602c0 .63.492 1.14 1.1 1.14H16.7c.206 0 .407-.06.581-.172a1.164 1.164 0 0 0 .353-1.57L10.933 2.817a1.12 1.12 0 0 0-.352-.365zM10 14a1 1 0 1 1 0-2a1 1 0 0 1 0 2m0-9a1 1 0 0 1 1 1v4a1 1 0 0 1-2 0V6a1 1 0 0 1 1-1"
                /></svg></template
          ></NavItemSlot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import NavItemSlot from "@/components/Navigation/NavItemSlot.vue";
import MobileReturn from "@/components/Actions/MobileReturn.vue";
</script>
