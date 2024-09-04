import HomeView from "../views/HomeView.vue";
import DemoView from "../views/DemoView.vue";
import GuideView from "../views/GuideView.vue";
import NotFoundView from "../views/NotFoundView.vue";

export const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/demo",
    name: "demo",
    component: DemoView,
  },
  {
    path: "/guide",
    name: "guide",
    component: GuideView,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: NotFoundView,
  },
] as const;
