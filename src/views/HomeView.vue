<script setup lang="ts">
import { useHead } from "@unhead/vue";
import { extractColors } from "extract-colors";
import CodeTabs from "../components/CodeTabs.vue";
import installBrowserBashCode from "./code/install-browser.bash.txt";
import installBrowserJsCode from "./code/install-browser.js.txt";
import installNodeBashCode from "./code/install-node.bash.txt";
import installNodeJsCode from "./code/install-node.js.txt";
import { onMounted, ref } from "vue";
import type { FinalColor } from "../types";

useHead({
  title: "Extract colors",
  meta: [
    {
      name: "description",
      content: "Javascript library to extract color palette from images",
    },
  ],
});

const imgEl = ref<HTMLImageElement>();
const isLoading = ref(true);
const colors = ref<FinalColor[]>([]);

const process: (() => void)[] = [];

async function updateImg() {
  // const container = document.body.querySelector("#ec-colors");
  // const restartEl = document.body.querySelector("#ec-restart");
  // const reloadEl = restartEl?.children[0] as SVGElement | undefined;

  // if (!imgEl || !container || !restartEl || !reloadEl || !noimgEl) {
  //   return;
  // }

  if (!imgEl.value) {
    return;
  }

  // container.classList.add("invisible");
  // restartEl.classList.add("loading");
  // restartEl.removeEventListener("click", updateImg);
  // reloadEl.style.display = "none";
  // noimgEl.style.opacity = "1";

  colors.value = [];
  isLoading.value = true;

  const src = `https://picsum.photos/seed/${Math.round(Math.random() * Number.MAX_SAFE_INTEGER)}/640/480`;

  imgEl.value.src = src;
  imgEl.value.crossOrigin = "anonymous";

  const nextProcess = () => {
    process.shift();
    if (process.length > 0) {
      process[0]();
    }
  };

  const list = await extractColors(src, {
    crossOrigin: "anonymous",
  });
  colors.value = list;
  isLoading.value = false;

  // container.append(
  //   ...colors.map((color) => {
  //     const colEl = el.cloneNode(true) as HTMLLIElement;
  //     const tooltip = colEl.querySelector(".tooltip") as HTMLSpanElement;
  //     const span = colEl.querySelector("span>span") as HTMLSpanElement;

  //     if (tooltip) {
  //       tooltip.dataset.tip = `${(color.area * 100).toFixed(2)}% - ${color.hex}`;
  //     }
  //     if (span) {
  //       span.style.backgroundColor = color.hex;
  //     }

  //     return colEl;
  //   })
  // );

  // restartEl.classList.remove("loading");
  // restartEl.addEventListener("click", updateImg);
  // reloadEl.style.display = "";
  // noimgEl.style.opacity = "0";

  await nextProcess();
}

onMounted(() => {
  updateImg();
});
</script>

<template>
  <!-- HERO -->
  <div
    class="hero bg-base-200 from-primary to-accent text-primary-content bg-gradient-to-br"
  >
    <div class="hero-content text-center">
      <div class="max-w-md my-20">
        <h1 class="mb-2 text-4xl font-extrabold md:text-6xl">Extract colors</h1>
        <p></p>
        <p class="py-6 leading-7">
          Javascript library to extract color palette from images
          <span class="badge badge-ghost">simple</span>,
          <span class="badge badge-ghost">fast</span> and
          <span class="badge badge-ghost">lightweight</span><br />
          support
          <span class="badge badge-ghost">browser</span>,
          <span class="badge badge-ghost">Web Workers</span> and
          <span class="badge badge-ghost">Node.js</span>
        </p>

        <div>
          <div class="relative">
            <div class="relative">
              <div class="relative rounded-xl mb-2 overflow-hidden">
                <img ref="imgEl" width="640" height="480" alt="Image example" />
                <div
                  class="absolute flex justify-center items-center top-0 left-0 w-full h-full transition-opacity bg-primary"
                  :class="{ 'opacity-0': !isLoading }"
                >
                  <span class="text-white text-2xl font-bold">
                    Loading image
                  </span>
                </div>
              </div>

              <p
                class="absolute bottom-2 left-3 text-shadow text-white text-sm"
              >
                Random image from Unsplash
              </p>
              <button
                @click="updateImg()"
                class="hover:rotate-[360deg] absolute top-4 right-4 btn btn-accent btn-circle"
                aria-label="Load a new image"
              >
                <span
                  class="w-[17px] h-[17px]"
                  :class="{ loading: isLoading }"
                ></span>
                <svg
                  v-if="!isLoading"
                  class="top-1/2 absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
                  width="16"
                  height="16"
                  viewBox="0 0 303.597 303.597"
                  xmlns="http://www.w3.org/2000/svg"
                  xml:space="preserve"
                >
                  <path
                    fill="black"
                    d="M57.866,268.881c25.982,19.891,56.887,30.403,89.369,30.402h0.002c6.545,0,13.176-0.44,19.707-1.308
                      c39.055-5.187,73.754-25.272,97.702-56.557c14.571-19.033,24.367-41.513,28.329-65.01c0.689-4.084-2.064-7.954-6.148-8.643
                      l-19.721-3.326c-1.964-0.33-3.974,0.131-5.595,1.284c-1.621,1.153-2.717,2.902-3.048,4.864
                      c-3.019,17.896-10.49,35.032-21.608,49.555c-18.266,23.861-44.73,39.181-74.521,43.137c-4.994,0.664-10.061,1-15.058,1
                      c-24.757,0-48.317-8.019-68.137-23.191c-23.86-18.266-39.18-44.73-43.136-74.519c-3.957-29.787,3.924-59.333,22.189-83.194
                      c21.441-28.007,54.051-44.069,89.469-44.069c24.886,0,48.484,7.996,68.245,23.122c6.55,5.014,12.43,10.615,17.626,16.754
                      l-36.934-6.52c-1.956-0.347-3.973,0.101-5.604,1.241c-1.631,1.141-2.739,2.882-3.085,4.841l-3.477,19.695
                      c-0.72,4.079,2.003,7.969,6.081,8.689l88.63,15.647c0.434,0.077,0.869,0.114,1.304,0.114c1.528,0,3.031-0.467,4.301-1.355
                      c1.63-1.141,2.739-2.882,3.084-4.841l15.646-88.63c0.721-4.079-2.002-7.969-6.081-8.69l-19.695-3.477
                      c-4.085-0.723-7.97,2.003-8.689,6.082l-6.585,37.3c-7.387-9.162-15.87-17.463-25.248-24.642
                      c-25.914-19.838-56.86-30.324-89.495-30.324c-46.423,0-89.171,21.063-117.284,57.787C6.454,93.385-3.878,132.123,1.309,171.178
                      C6.497,210.236,26.583,244.933,57.866,268.881z"
                  />
                </svg>
              </button>
            </div>

            <ul
              class="flex justify-left flex-wrap gap-2 min-h-6"
              :class="{ invisible: isLoading }"
            >
              <li
                class="leading-[0]"
                v-for="(color, index) of colors"
                :key="index"
              >
                <span
                  class="tooltip"
                  :data-tip="`${(color.area * 100).toFixed(2)}% - ${color.hex}`"
                >
                  <span
                    class="w-6 h-6 rounded-xl block border border-black border-opacity-20"
                    :style="{ backgroundColor: color.hex }"
                  ></span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div class="flex gap-5 justify-center mt-10">
          <RouterLink :to="{ name: 'demo' }" class="btn btn-secondary btn-lg"
            >Full demo
            <svg
              class="ml-2"
              fill="white"
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="10"
              viewBox="0 0 24 24"
            >
              <path
                d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z"
              ></path>
            </svg>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>

  <!-- INSTALL -->
  <section class="bg-base-100 py-20 text-base-content">
    <div class="w-full px-5 mx-auto max-w-4xl">
      <h2 class="text-5xl text-center">Getting started</h2>

      <!-- INSTALL - BROWSER -->
      <p class="mb-2 mt-16">Install Extract Colors on your project with NPM</p>
      <CodeTabs
        :browser="installBrowserBashCode"
        :node="installNodeBashCode"
      ></CodeTabs>

      <!-- USAGE - BROWSER -->
      <p class="mb-2 mt-16">Extract color palette with the followed code</p>
      <CodeTabs
        :browser="installBrowserJsCode"
        :node="installNodeJsCode"
      ></CodeTabs>
    </div>

    <div class="text-center my-10">
      <RouterLink :to="{ name: 'guide' }" class="btn btn-primary btn-lg"
        >Guide
        <svg
          class="ml-2"
          fill="black"
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="10"
          viewBox="0 0 24 24"
          data-v-76d4cf95=""
        >
          <path
            d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z"
          ></path>
        </svg>
      </RouterLink>
    </div>
  </section>

  <!-- GOOD THING -->
  <section class="bg-neutral py-20 text-neutral-content">
    <div
      class="w-full px-5 mx-auto max-w-4xl flex flex-wrap gap-12 justify-center text-center"
    >
      <div class="max-w-sm w-full md:max-w-[calc(50%-30px)]">
        <h3 class="text-4xl mb-3 mr-2">
          <span class="text-[0.9em] align-bottom">🚀</span>
          Performant
        </h3>
        <p class="text-base opacity-60 md:w-10/12 mx-auto">
          This script use two pass. The first optimize calculation to reduce
          time. The second sort colors with precise calculations.
        </p>
      </div>
      <div class="max-w-sm w-full md:max-w-[calc(50%-30px)]">
        <h3 class="text-4xl mb-3">
          <span class="mr-2">
            <span class="text-[0.9em]">🌐</span>
            <svg
              class="w-[1em] h-[1em] inline-block align-bottom"
              width="282"
              height="282"
              viewBox="-13 0 282 282"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMinYMin meet"
            >
              <g fill="#8CC84B">
                <path
                  d="M116.504 3.58c6.962-3.985 16.03-4.003 22.986 0 34.995 19.774 70.001 39.517 104.99 59.303 6.581 3.707 10.983 11.031 10.916 18.614v118.968c.049 7.897-4.788 15.396-11.731 19.019-34.88 19.665-69.742 39.354-104.616 59.019-7.106 4.063-16.356 3.75-23.24-.646-10.457-6.062-20.932-12.094-31.39-18.15-2.137-1.274-4.546-2.288-6.055-4.36 1.334-1.798 3.719-2.022 5.657-2.807 4.365-1.388 8.374-3.616 12.384-5.778 1.014-.694 2.252-.428 3.224.193 8.942 5.127 17.805 10.403 26.777 15.481 1.914 1.105 3.852-.362 5.488-1.274 34.228-19.345 68.498-38.617 102.72-57.968 1.268-.61 1.969-1.956 1.866-3.345.024-39.245.006-78.497.012-117.742.145-1.576-.767-3.025-2.192-3.67-34.759-19.575-69.5-39.18-104.253-58.76a3.621 3.621 0 0 0-4.094-.006C91.2 39.257 56.465 58.88 21.712 78.454c-1.42.646-2.373 2.071-2.204 3.653.006 39.245 0 78.497 0 117.748a3.329 3.329 0 0 0 1.89 3.303c9.274 5.259 18.56 10.481 27.84 15.722 5.228 2.814 11.647 4.486 17.407 2.33 5.083-1.823 8.646-7.01 8.549-12.407.048-39.016-.024-78.038.036-117.048-.127-1.732 1.516-3.163 3.2-3 4.456-.03 8.918-.06 13.374.012 1.86-.042 3.14 1.823 2.91 3.568-.018 39.263.048 78.527-.03 117.79.012 10.464-4.287 21.85-13.966 26.97-11.924 6.177-26.662 4.867-38.442-1.056-10.198-5.09-19.93-11.097-29.947-16.55C5.368 215.886.555 208.357.604 200.466V81.497c-.073-7.74 4.504-15.197 11.29-18.85C46.768 42.966 81.636 23.27 116.504 3.58z"
                />
                <path
                  d="M146.928 85.99c15.21-.979 31.493-.58 45.18 6.913 10.597 5.742 16.472 17.793 16.659 29.566-.296 1.588-1.956 2.464-3.472 2.355-4.413-.006-8.827.06-13.24-.03-1.872.072-2.96-1.654-3.195-3.309-1.268-5.633-4.34-11.212-9.642-13.929-8.139-4.075-17.576-3.87-26.451-3.785-6.479.344-13.446.905-18.935 4.715-4.214 2.886-5.494 8.712-3.99 13.404 1.418 3.369 5.307 4.456 8.489 5.458 18.33 4.794 37.754 4.317 55.734 10.626 7.444 2.572 14.726 7.572 17.274 15.366 3.333 10.446 1.872 22.932-5.56 31.318-6.027 6.901-14.805 10.657-23.56 12.697-11.647 2.597-23.734 2.663-35.562 1.51-11.122-1.268-22.696-4.19-31.282-11.768-7.342-6.375-10.928-16.308-10.572-25.895.085-1.619 1.697-2.748 3.248-2.615 4.444-.036 8.888-.048 13.332.006 1.775-.127 3.091 1.407 3.182 3.08.82 5.367 2.837 11 7.517 14.182 9.032 5.827 20.365 5.428 30.707 5.591 8.568-.38 18.186-.495 25.178-6.158 3.689-3.23 4.782-8.634 3.785-13.283-1.08-3.925-5.186-5.754-8.712-6.95-18.095-5.724-37.736-3.647-55.656-10.12-7.275-2.571-14.31-7.432-17.105-14.906-3.9-10.578-2.113-23.662 6.098-31.765 8.006-8.06 19.563-11.164 30.551-12.275z"
                />
              </g>
            </svg>
          </span>
          Browser & NodeJs
        </h3>
        <p class="text-base opacity-60 md:w-10/12 mx-auto">
          Core function are similar for NodeJs and browser. Extract Colors
          expose multiple export: browser, NodeJs and ECMAScript Modules.
        </p>
      </div>
      <div class="max-w-sm w-full md:max-w-[calc(50%-30px)]">
        <h3 class="text-4xl mb-3">
          <span class="mr-2">
            <svg
              class="w-[1em] h-[1em] inline-block align-bottom"
              viewBox="0 0 512 512"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect fill="#3178c6" height="512" rx="50" width="512" />
              <rect fill="#3178c6" height="512" rx="50" width="512" />
              <path
                clip-rule="evenodd"
                d="m316.939 407.424v50.061c8.138 4.172 17.763 7.3 28.875 9.386s22.823 3.129 35.135 3.129c11.999 0 23.397-1.147 34.196-3.442 10.799-2.294 20.268-6.075 28.406-11.342 8.138-5.266 14.581-12.15 19.328-20.65s7.121-19.007 7.121-31.522c0-9.074-1.356-17.026-4.069-23.857s-6.625-12.906-11.738-18.225c-5.112-5.319-11.242-10.091-18.389-14.315s-15.207-8.213-24.18-11.967c-6.573-2.712-12.468-5.345-17.685-7.9-5.217-2.556-9.651-5.163-13.303-7.822-3.652-2.66-6.469-5.476-8.451-8.448-1.982-2.973-2.974-6.336-2.974-10.091 0-3.441.887-6.544 2.661-9.308s4.278-5.136 7.512-7.118c3.235-1.981 7.199-3.52 11.894-4.615 4.696-1.095 9.912-1.642 15.651-1.642 4.173 0 8.581.313 13.224.938 4.643.626 9.312 1.591 14.008 2.894 4.695 1.304 9.259 2.947 13.694 4.928 4.434 1.982 8.529 4.276 12.285 6.884v-46.776c-7.616-2.92-15.937-5.084-24.962-6.492s-19.381-2.112-31.066-2.112c-11.895 0-23.163 1.278-33.805 3.833s-20.006 6.544-28.093 11.967c-8.086 5.424-14.476 12.333-19.171 20.729-4.695 8.395-7.043 18.433-7.043 30.114 0 14.914 4.304 27.638 12.912 38.172 8.607 10.533 21.675 19.45 39.204 26.751 6.886 2.816 13.303 5.579 19.25 8.291s11.086 5.528 15.415 8.448c4.33 2.92 7.747 6.101 10.252 9.543 2.504 3.441 3.756 7.352 3.756 11.733 0 3.233-.783 6.231-2.348 8.995s-3.939 5.162-7.121 7.196-7.147 3.624-11.894 4.771c-4.748 1.148-10.303 1.721-16.668 1.721-10.851 0-21.597-1.903-32.24-5.71-10.642-3.806-20.502-9.516-29.579-17.13zm-84.159-123.342h64.22v-41.082h-179v41.082h63.906v182.918h50.874z"
                fill="#fff"
                fill-rule="evenodd"
              />
            </svg>
          </span>
          Typescript support
        </h3>
        <p class="text-base opacity-60 md:w-10/12 mx-auto">
          Fully coded in Typescript to take advantage of typing.
        </p>
      </div>
      <div class="max-w-sm w-full md:max-w-[calc(50%-30px)]">
        <h3 class="text-4xl mb-3">
          <span class="text-[0.7em] align-bottom mr-2">🪡</span>
          Fine-grained control
        </h3>
        <p class="text-base opacity-60 md:w-10/12 mx-auto">
          All the options allow you to precisely parameterize the calculations.
        </p>
      </div>
    </div>
  </section>

  <!-- SUPPORT -->
  <section class="bg-base-100 py-20 text-base-content">
    <div
      class="w-full px-5 mx-auto max-w-4xl flex flex-wrap gap-12 justify-center text-center"
    >
      <div class="max-w-sm w-full">
        <h2 class="mb-10 text-5xl">Support</h2>
        <p class="text-2xl leading-10">
          <span class="text-primary">Firefox</span> 29+<br />
          <span class="text-primary">Chrome</span> 33+<br />
          <span class="text-primary">Edge</span> 12+<br />
          <span class="text-primary">Opera</span> 19+<br />
          <span class="text-primary">Safari</span> 8+<br />
          <span class="text-primary">Webview Android</span> 4.4.3+<br />
          <span class="text-primary">Samsung Internet</span> 2.0+<br />
          <span class="line-through opacity-60">Internet Explorer</span><br />
          <span class="text-primary">Node.js</span> 6.0+
        </p>
      </div>
    </div>
  </section>
</template>
