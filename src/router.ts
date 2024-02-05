import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
const Snake = () => import("./views/Game/Snake/index.vue");
const Snake1 = () => import("./views/Snake/index.vue");

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/snake1",
  },
  {
    path: "/snake",
    component: Snake,
  },
  {
    path: "/snake1",
    component: Snake1,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export { router, routes };
