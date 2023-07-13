import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home/Home.vue";
import NotFound from "@/views/NotFound.vue";

// Layouts
import DefaultLayout from "@/views/DefaultLayout.vue";
import Movie from "@/views/Movie/Movie.vue";
import TV from "@/views/TV/TV.vue";
import TVDetail from "@/views/TV/TVDetail.vue";
import MovieDetail from "@/views/Movie/MovieDetail.vue";

const routes = [
  {
    path: "/",
    redirect: "/home",
    name: "Layout",
    component: DefaultLayout,
    children: [
      {
        path: "/home",
        name: "Home",
        component: Home,
      },
    ],
  },
  {
    path: "/movies",
    name: "MoviesLayout",
    redirect: { name: "Movie" },
    component: DefaultLayout,
    children: [
      { path: "/movie", name: "Movie", component: Movie },
      { path: "/movie/:id", name: "Movie-Details", component: MovieDetail },
    ],
  },

  {
    path: "/tv",
    name: "TVLayout",
    redirect: { name: "TV" },
    component: DefaultLayout,
    children: [
      { path: "/tv-show", name: "TV", component: TV },
      { path: "/tv-show/:id", name: "TV-Details", component: TVDetail },
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
