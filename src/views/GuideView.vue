<script setup lang="ts">
import { useHead } from "@unhead/vue";
import CodeTabs from "../components/CodeTabs.vue";
import { RouterLink } from "vue-router";

useHead({
  title: "Extract colors | Guide",
  meta: [
    {
      name: "description",
      content: "Javascript library to extract color palette from images",
    },
  ],
});
</script>

<template>
  <div class="flex max-w-7xl mx-auto w-full flex-1">
    <!-- NAV -->
    <nav class="hidden lg:block bg-base-200">
      <div class="top-0 overflow-y-scroll my-6 sticky max-h-screen">
        <ul class="menu menu-compact bg-base-200 w-56 my-4">
          <li class="menu-title">
            <span>Getting Started</span>
          </li>
          <li>
            <RouterLink :to="{ name: 'getting-started' }">
              Installation
            </RouterLink>
          </li>
          <li>
            <RouterLink :to="{ name: 'getting-started' }"> Usage </RouterLink>
          </li>
          <li class="menu-title mt-5">
            <span>Essentials</span>
          </li>
          <li>
            <RouterLink :to="{ name: 'essentials' }"> Output </RouterLink>
          </li>
          <li class="menu-title mt-5">
            <span>Advanced</span>
          </li>
          <li>
            <RouterLink :to="{ name: 'advanced' }"> Module usage </RouterLink>
          </li>
          <li>
            <RouterLink :to="{ name: 'advanced' }"> Web Workers </RouterLink>
          </li>
          <li><RouterLink :to="{ name: 'advanced' }"> Options </RouterLink></li>
          <li>
            <RouterLink
              :to="{ name: 'advanced' }"
              class="ml-2 text-xs leading-3"
            >
              pixels
            </RouterLink>
          </li>
          <li>
            <RouterLink
              :to="{ name: 'advanced' }"
              class="ml-2 text-xs leading-3"
            >
              distance
            </RouterLink>
          </li>
          <li>
            <RouterLink
              :to="{ name: 'advanced' }"
              class="ml-2 text-xs leading-3"
            >
              colorValidator
            </RouterLink>
          </li>
          <li>
            <RouterLink
              :to="{ name: 'advanced' }"
              class="ml-2 text-xs leading-3"
            >
              crossOrigin
            </RouterLink>
          </li>
          <li>
            <RouterLink
              :to="{ name: 'advanced' }"
              class="ml-2 text-xs leading-3"
            >
              requestMode
            </RouterLink>
          </li>
          <li>
            <RouterLink
              :to="{ name: 'advanced' }"
              class="ml-2 text-xs leading-3"
            >
              saturationDistance
            </RouterLink>
          </li>
          <li>
            <RouterLink
              :to="{ name: 'advanced' }"
              class="ml-2 text-xs leading-3"
            >
              lightnessDistance
            </RouterLink>
          </li>
          <li>
            <RouterLink
              :to="{ name: 'advanced' }"
              class="ml-2 text-xs leading-3"
            >
              hueDistance
            </RouterLink>
          </li>
        </ul>
      </div>
    </nav>

    <!-- TEXT -->
    <article
      class="flex-1 bg-base-100 px-6 py-12 max-w-full lg:max-w-[calc(100%-14rem)] relative"
    >
      <div
        class="from-base-200 to-base-100 bg-gradient-to-b absolute top-0 left-0 w-full h-16 opacity-30"
      ></div>

      <RouterView></RouterView>
    </article>
  </div>
</template>
