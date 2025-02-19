<template>
  <div class="flex flex-row w-full">
    <ul
      class="menu w-full space-y-4 md:space-y-0 md:menu-horizontal rounded-box px-0"
    >
      <li v-for="link in links">
        <router-link
          :to="{ name: link.name }"
          class="flex flex-row items-center"
          :class="link.showWeb ? 'flex' : 'md:hidden'"
        >
          <component :is="link.Icon" class="w-8 h-6 md:hidden" />

          {{ link.DisplayName }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
const links = [
  {
    name: "Home",
    DisplayName: "Home",
    Icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M16 20q-.425 0-.712-.288T15 19v-5q0-.425.288-.712T16 13h5q.425 0 .713.288T22 14v5q0 .425-.288.713T21 20zm-4-9q-.425 0-.712-.288T11 10V5q0-.425.288-.712T12 4h9q.425 0 .713.288T22 5v5q0 .425-.288.713T21 11zm-9 9q-.425 0-.712-.288T2 19v-5q0-.425.288-.712T3 13h9q.425 0 .713.288T13 14v5q0 .425-.288.713T12 20zm0-9q-.425 0-.712-.288T2 10V5q0-.425.288-.712T3 4h5q.425 0 .713.288T9 5v5q0 .425-.288.713T8 11zm10-2h7V6h-7zm-9 9h7v-3H4zm13 0h3v-3h-3zM4 9h3V6H4zm3 0"
        />
      </svg>
    ),
    showWeb: true,
  },
  {
    name: "TV",
    DisplayName: "Shows",
    Icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="m9.5 15.5l7-4.5l-7-4.5zM8 21v-2H4q-.825 0-1.412-.587T2 17V5q0-.825.588-1.412T4 3h16q.825 0 1.413.588T22 5v12q0 .825-.587 1.413T20 19h-4v2zm-4-4h16V5H4zm0 0V5z"
        />
      </svg>
    ),
    showWeb: true,
  },
  {
    name: "Movie",
    DisplayName: "Movies",
    Icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M3 22V6.25l12-4.8V6h2v4h-2V8H5v12h5.175l2 2zM9 6h4V4.45zm8 16q-2.075 0-3.537-1.463T12 17t1.463-3.537T17 12t3.538 1.463T22 17t-1.463 3.538T17 22m-1.25-2.5l4-2.5l-4-2.5zM5 20V8z"
        />
      </svg>
    ),
    showWeb: true,
  },
  {
    name: "Discover",
    DisplayName: "Discover",
    Icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="m14.75 20l2 2H6q-.825 0-1.412-.587T4 20V4q0-.825.588-1.412T6 2h9l5 6v12q0 .5-.213.913t-.587.687L14 16.45q-.425.275-.925.413T12 17q-1.65 0-2.825-1.175T8 13t1.175-2.825T12 9t2.825 1.175T16 13q0 .575-.137 1.075T15.45 15L18 17.6V8.7L14.05 4H6v16zM12 15q.825 0 1.413-.587T14 13t-.587-1.412T12 11t-1.412.588T10 13t.588 1.413T12 15m0-2"
        />
      </svg>
    ),
    showWeb: true,
  },
  {
    name: "Library",
    DisplayName: "Library",
    Icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M10 14h4v-2h-4zm0-3h8V9h-8zm0-3h8V6h-8zM6 18V2h16v16zm2-2h12V4H8zm-6 6V6h2v14h14v2zM8 4v12z"
        />
      </svg>
    ),
    showWeb: true,
  },
  {
    name: "Settings",
    DisplayName: "Settings",
    Icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="25"
        height="25"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M19.9 12.66a1 1 0 0 1 0-1.32l1.28-1.44a1 1 0 0 0 .12-1.17l-2-3.46a1 1 0 0 0-1.07-.48l-1.88.38a1 1 0 0 1-1.15-.66l-.61-1.83a1 1 0 0 0-.95-.68h-4a1 1 0 0 0-1 .68l-.56 1.83a1 1 0 0 1-1.15.66L5 4.79a1 1 0 0 0-1 .48L2 8.73a1 1 0 0 0 .1 1.17l1.27 1.44a1 1 0 0 1 0 1.32L2.1 14.1a1 1 0 0 0-.1 1.17l2 3.46a1 1 0 0 0 1.07.48l1.88-.38a1 1 0 0 1 1.15.66l.61 1.83a1 1 0 0 0 1 .68h4a1 1 0 0 0 .95-.68l.61-1.83a1 1 0 0 1 1.15-.66l1.88.38a1 1 0 0 0 1.07-.48l2-3.46a1 1 0 0 0-.12-1.17ZM18.41 14l.8.9l-1.28 2.22l-1.18-.24a3 3 0 0 0-3.45 2L12.92 20h-2.56L10 18.86a3 3 0 0 0-3.45-2l-1.18.24l-1.3-2.21l.8-.9a3 3 0 0 0 0-4l-.8-.9l1.28-2.2l1.18.24a3 3 0 0 0 3.45-2L10.36 4h2.56l.38 1.14a3 3 0 0 0 3.45 2l1.18-.24l1.28 2.22l-.8.9a3 3 0 0 0 0 3.98m-6.77-6a4 4 0 1 0 4 4a4 4 0 0 0-4-4m0 6a2 2 0 1 1 2-2a2 2 0 0 1-2 2"
        />
      </svg>
    ),
    showWeb: false,
  },
];
</script>
