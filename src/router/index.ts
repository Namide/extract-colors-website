import HomeView from "../views/HomeView.vue";
import DemoView from "../views/DemoView.vue";
import GuideView from "../views/GuideView.vue";

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
] as const;
