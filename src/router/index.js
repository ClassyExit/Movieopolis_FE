import { createRouter, createWebHistory } from "vue-router";
import NotFound from "@/views/NotFound.vue";

// Layouts
import DefaultLayout from "@/views/Layout/DefaultLayout.vue";

// Landing Pages
import Home from "@/views/Landing/Home.vue";

// Auth Pages
import Login from "@/views/Authentication/Login.vue";
import Register from "@/views/Authentication/Register.vue";
import Reset from "@/views/Authentication/Reset.vue";

// Movies Pages
import Movie from "@/views/Movie/Movie.vue";
import MovieDetail from "@/views/Movie/MovieDetail.vue";

// TV Pages
import TV from "@/views/TV/TV.vue";
import TVDetail from "@/views/TV/TVDetail.vue";

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
      { path: "/movies", name: "Movie", component: Movie },
      { path: "/movies/:id", name: "Movie-Details", component: MovieDetail },
    ],
  },

  {
    path: "/tv",
    name: "TVLayout",
    redirect: { name: "TV" },
    component: DefaultLayout,
    children: [
      { path: "/tv-shows", name: "TV", component: TV },
      { path: "/tv-shows/:id", name: "TV-Details", component: TVDetail },
    ],
  },

  {
    path: "/auth",
    name: "Auth",
    redirect: { name: "Login" },
    component: DefaultLayout,
    children: [
      { path: "login", name: "Login", component: Login },
      { path: "register", name: "Register", component: Register },
      { path: "reset", name: "Reset", component: Reset },
    ],
  },

  // {
  //   path: "/saved",
  //   name: "Saved",
  //   component: DefaultLayout,
  //   children: [{ path: "/library", name: "Library", component: List }],
  // },

  // {
  //   path: "/settingslayout",
  //   name: "SettingLayout",
  //   redirect: { name: "Settings" },
  //   component: DefaultLayout,
  //   children: [
  //     { path: "/settings", name: "Settings", component: SettingsLayout },
  //     {
  //       path: "/change-password",
  //       name: "ChangePassword",
  //       component: ChangePassword,
  //     },
  //     { path: "/delete", name: "Delete", component: DeleteAccount },
  //   ],
  // },

  // {
  //   path: "/status",
  //   name: "Status",
  //   component: Status,
  // },
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
