import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import NotFound from "@/views/NotFound.vue";

// Layouts
import HomeLayout from "@/views/Layouts/HomeLayout.vue";
import MoviesLayout from "@/views/Movies/MoviesLayout.vue";
import TrendingLayout from "@/views/Trending/TrendingLayout.vue";
import TVLayout from "@/views/TV/TVLayout.vue";

const routes = [
  {
    path: "/",
    name: "Layout",
    component: HomeLayout,
    children: [
      {
        path: "/",
        name: "Home",
        component: Home,
      },
      {
        path: "/movies",
        name: "Movies",
        component: MoviesLayout,
      },
      {
        path: "/trending",
        name: "Trending",
        component: TrendingLayout,
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
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
