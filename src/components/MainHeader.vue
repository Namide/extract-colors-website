<script setup lang="ts">
import { version } from "extract-colors/package.json";
</script>

<template>
  <header class="bg-base-100 text-base-content">
    <div class="navbar max-w-7xl mx-auto">
      <div class="navbar-start">
        <div tabindex="0" class="btn btn-ghost normal-case text-xl">
          <RouterLink :to="{ name: 'home' }">
            <span class="text-primary">Extract</span
            ><!--
              --><span class="text-base-content">Colors</span>
            <small class="ml-1 text-xs opacity-50 italic">{{ version }}</small>
          </RouterLink>
        </div>
      </div>
      <div class="navbar-end">
        <ul class="menu menu-horizontal p-0 hidden md:flex md:items-center">
          <li>
            <RouterLink
              :to="{ name: 'demo' }"
              class="btn btn-secondary mr-2 rounded-2xl text-white"
            >
              Demo
            </RouterLink>
          </li>
          <li>
            <RouterLink
              :to="{ name: 'guide' }"
              class="btn btn-primary mr-2 rounded-2xl text-white"
            >
              Guide
            </RouterLink>
          </li>
          <li>
            <span class="!bg-transparent p-0">
              <a
                href="https://www.npmjs.com/package/extract-colors"
                target="_blank"
                rel="noopener noreferrer"
                class="btn btn-circle btn-ghost !py-0"
              >
                <img src="../assets/npm.svg" class="w-9 h-6" alt="NPM" />
              </a>
            </span>
          </li>
          <li>
            <span class="!bg-transparent p-0 mr-4">
              <a
                href="https://github.com/Namide/extract-colors"
                target="_blank"
                rel="noopener noreferrer"
                class="btn btn-circle btn-ghost !py-0"
              >
                <img src="../assets/github.svg" class="w-6 h-6" alt="Github" />
              </a>
            </span>
          </li>
        </ul>

        <div class="dropdown dropdown-end md:hidden z-10">
          <label tabindex="0" class="btn btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16m-16 6h16"
              />
            </svg>
          </label>
          <ul
            tabindex="0"
            class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <RouterLink
                :to="{ name: 'demo' }"
                class="btn btn-secondary text-white mb-2"
              >
                Demo
              </RouterLink>
            </li>
            <li>
              <RouterLink
                :to="{ name: 'guide' }"
                class="btn btn-primary text-white mb-2"
              >
                Guide
              </RouterLink>
            </li>
            <li>
              <a
                href="https://www.npmjs.com/package/extract-colors"
                target="_blank"
                rel="noopener noreferrer"
                class="gap-1"
              >
                NPM
                <svg
                  class="opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  x="0px"
                  y="0px"
                  viewBox="0 0 100 100"
                  width="15"
                  height="15"
                  data-v-7ad94a48=""
                >
                  <path
                    fill="currentColor"
                    d="M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"
                  ></path>
                  <polygon
                    fill="currentColor"
                    points="45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"
                  ></polygon>
                </svg>
              </a>
            </li>
            <li>
              <a
                href="https://github.com/Namide/extract-colors"
                target="_blank"
                rel="noopener noreferrer"
                class="gap-1"
              >
                GitHub
                <svg
                  class="opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  x="0px"
                  y="0px"
                  viewBox="0 0 100 100"
                  width="15"
                  height="15"
                  data-v-7ad94a48=""
                >
                  <path
                    fill="currentColor"
                    d="M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"
                  ></path>
                  <polygon
                    fill="currentColor"
                    points="45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"
                  ></polygon>
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>
