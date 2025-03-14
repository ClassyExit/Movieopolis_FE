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
// Library
import Library from "@/views/Library/Library.vue";
// Setting
import Setting from "@/views/Setting/Setting.vue";
// Discover
import Discover from "@/views/Discover/Discover.vue";
// Setting
import Password from "@/views/Setting/Password.vue";
import DeleteAccount from "@/views/Setting/DeleteAccount.vue";

import AdminDashboard from "@/views/Admin/AdminDashboard.vue";

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

  {
    path: "/saved",
    name: "Saved",
    component: DefaultLayout,
    children: [{ path: "/library", name: "Library", component: Library }],
  },

  {
    path: "/discover",
    name: "DiscoverLayout",
    component: DefaultLayout,
    children: [{ path: "/discover", name: "Discover", component: Discover }],
  },

  {
    path: "/setting",
    name: "SettingLayout",
    redirect: { name: "Settings" },
    component: DefaultLayout,
    children: [
      { path: "overview", name: "Settings", component: Setting },
      {
        path: "change-password",
        name: "Password",
        component: Password,
      },
      { path: "delete-account", name: "Delete", component: DeleteAccount },
    ],
  },

  {
    path: "/admin",
    name: "Admin",
    component: AdminDashboard,
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
