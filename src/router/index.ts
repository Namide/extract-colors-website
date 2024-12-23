import HomeView from "../views/HomeView.vue";
import DemoView from "../views/DemoView.vue";
import GuideView from "../views/GuideView.vue";
import NotFoundView from "../views/NotFoundView.vue";
import GettingStartedView from "@/views/guide/GettingStartedView.vue";
import EssentialsView from "@/views/guide/EssentialsView.vue";
import AdvancedView from "@/views/guide/AdvancedView.vue";

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
    redirect: { name: "getting-started" },
    children: [
      {
        path: "getting-started",
        name: "getting-started",
        component: GettingStartedView,
      },
      {
        path: "essentials",
        name: "essentials",
        component: EssentialsView,
      },
      {
        path: "advanced",
        name: "advanced",
        component: AdvancedView,
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: NotFoundView,
  },
] as const;
