<script setup lang="ts">
import { extractColors } from "extract-colors";
import type { FinalColor } from "../types";
import { onMounted, ref } from "vue";
import { process } from "../helpers/process";

const props = defineProps<{
  random: boolean;
  src: string;
  pixels: number;
  distance: number;
  hueDistance: number;
  saturationDistance: number;
  lightnessDistance: number;
}>();

const colors = ref<FinalColor[]>([]);
const px = ref(0);
const time = ref(0);
const naturalPx = ref(0);
const loading = ref(true);
const random = ref(true);

const processCurrentId = ref("");

onMounted(() => {
  const image = new Image();
  const id = `${props.pixels}${props.distance}${props.hueDistance}${props.saturationDistance}${props.lightnessDistance}`;

  processCurrentId.value = id;

  random.value = props.random;

  image.crossOrigin = "anonymous";
  image.src = props.src;
  image.addEventListener("load", () => {
    px.value = Math.min(props.pixels, image.naturalWidth * image.naturalHeight);
    naturalPx.value = image.naturalWidth * image.naturalHeight;
  });

  const nextProcess = () => {
    process.shift();
    if (process.length > 0) {
      process[0]();
    }
  };

  const execProcess = () => {
    // To avoid old process calculations
    if (id !== processCurrentId.value) {
      nextProcess();
    }

    const run = () => {
      const initTime = Date.now();
      extractColors(image, {
        pixels: Number(props.pixels),
        distance: Number(props.distance),
        hueDistance: Number(props.hueDistance),
        saturationDistance: Number(props.saturationDistance),
        lightnessDistance: Number(props.lightnessDistance),
        crossOrigin: "anonymous",
      })
        .then((list) => {
          time.value = Date.now() - initTime;
          colors.value = list;
          loading.value = false;
        })
        .finally(nextProcess);
    };

    if (image.complete) {
      run();
    } else {
      image.addEventListener("load", run);
    }
  };

  process.push(execProcess);
  if (process.length < 2) {
    process[0]();
  }
});
</script>

<template>
  <div
    class="bg-base-100 card lg:w-[calc(50%-15px)] shadow-xl w-full xl:w-[calc(33%-15px)]"
  >
    <div class="relative rounded-xl mb-2 overflow-hidden">
      <figure>
        <img
          crossorigin="anonymous"
          :src="src"
          width="640"
          height="480"
          alt="image"
          class="w-full"
        />
      </figure>
      <div
        :style="{ opacity: loading ? 1 : 0 }"
        class="absolute flex justify-center items-center top-0 left-0 w-full h-full transition-opacity bg-primary"
      >
        <span class="text-white text-2xl font-bold">Loading image</span>
      </div>
    </div>

    <div v-if="loading" class="card-body text-base-content">
      <span class="card-title"> Loading </span>
    </div>
    <div v-else class="card-body text-base-content relative">
      <p
        v-if="random"
        class="absolute -top-3 left-2 text-shadow text-white text-sm -translate-y-full"
      >
        Random image from Unsplash
      </p>
      <h2 class="card-title">
        {{ colors.length }} colors
        <span
          class="tooltip font-normal"
          data-tip="Calculation time (image loading excluded)"
        >
          <div class="badge badge-accent align-text-top font-bold">
            {{ time }}ms
          </div>
        </span>
      </h2>
      <p>
        {{ px }} pixels for calculation (original image is
        {{ naturalPx }} pixels)<br />
      </p>
      <div class="card-actions justify-start">
        <ul class="flex justify-left flex-wrap gap-2">
          <li v-for="(color, index) of colors" class="leading-[0]" :key="index">
            <span
              class="tooltip"
              :data-tip="`${parseFloat((color.area * 100).toFixed(2))}%  ${color.hex}`"
            >
              <span
                class="w-6 h-6 rounded-xl block border border-black border-opacity-20"
                :style="`background-color: ${color.hex}`"
              ></span>
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
