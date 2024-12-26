import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home/Home.vue";
import NotFound from "@/views/NotFound.vue";

// Layouts
import DefaultLayout from "@/views/DefaultLayout.vue";
import Movie from "@/views/Movie/Movie.vue";
import TV from "@/views/TV/TV.vue";
import TVDetail from "@/views/TV/TVDetail.vue";
import MovieDetail from "@/views/Movie/MovieDetail.vue";

// Auth
import Login from "@/views/Auth/Login.vue";
import Register from "@/views/Auth/Register.vue";
import Reset from "@/views/Auth/Reset.vue";

// Settings
import SettingsLayout from "@/views/Settings/SettingLayout.vue";
import DeleteAccount from "@/views/Settings/DeleteAccount.vue";
import ChangePassword from "@/views/Settings/ChangePassword.vue";

import List from "@/views/Features/List.vue";
import Status from "../views/Status.vue";

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

  {
    path: "/auth",
    name: "Auth",
    redirect: { name: "Login" },
    component: DefaultLayout,
    children: [
      { path: "/login", name: "Login", component: Login },
      { path: "/register", name: "Register", component: Register },
      { path: "/reset", name: "Reset", component: Reset },
    ],
  },

  {
    path: "/saved",
    name: "Saved",
    component: DefaultLayout,
    children: [{ path: "/my-list", name: "List", component: List }],
  },

  {
    path: "/settingslayout",
    name: "SettingLayout",
    redirect: { name: "Settings" },
    component: DefaultLayout,
    children: [
      { path: "/settings", name: "Settings", component: SettingsLayout },
      {
        path: "/change-password",
        name: "ChangePassword",
        component: ChangePassword,
      },
      { path: "/delete", name: "Delete", component: DeleteAccount },
    ],
  },

  {
    path: "/status",
    name: "Status",
    component: Status,
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
