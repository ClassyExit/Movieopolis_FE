import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home/Home.vue";
import NotFound from "@/views/NotFound.vue";

// Layouts
import HomeLayout from "@/views/Layouts/HomeLayout.vue";
import MoviesLayout from "@/views/Movies/MoviesLayout.vue";
import DiscoverLayout from "@/views/Discover/DiscoverLayout.vue";
import TVLayout from "@/views/TV/TVLayout.vue";

const routes = [
  {
    path: "/",
    redirect: "/home",
    name: "Layout",
    component: HomeLayout,
    children: [
      {
        path: "/home",
        name: "Home",
        component: Home,
      },
      {
        path: "/movies",
        name: "Movies",
        component: MoviesLayout,
      },
      {
        path: "/discover",
        name: "Discover",
        component: DiscoverLayout,
      },
      {
        path: "/tvshows",
        name: "TV",
        component: TVLayout,
      },
    ],
  },

  // Path not found
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Sets the title of each page
const DEFAULT_TITLE = "Movieopolis";
router.beforeEach((to, from, next) => {
  document.title = `${DEFAULT_TITLE} | ${to.name}`;
  next();
});

export default router;
