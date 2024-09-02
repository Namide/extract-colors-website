<script setup lang="ts">
import { useHead } from "@unhead/vue";
import { computed, ref } from "vue";
import ImgBlock from "../components/ImgBlock.vue";
// import "./parts/track"

const enum EXTRACTOR_DEFAULT {
  PIXELS = 64000,
  DISTANCE = 0.22,
}

/**
 * Default average values
 */
const enum AVERAGE_DEFAULT {
  HUE = 1 / 12,
  SATURATION = 1 / 5,
  LIGHTNESS = 1 / 5,
}

useHead({
  title: "Extract colors | Demo",
  meta: [
    {
      name: "description",
      content: "Javascript library to extract color palette from images",
    },
  ],
});

const getRandImg = () =>
  `https://picsum.photos/seed/${Math.round(Math.random() * Number.MAX_SAFE_INTEGER)}/640/480`;

const getRandImgs = (count: number) => Array(count).fill(1).map(getRandImg);

const pixels = ref(EXTRACTOR_DEFAULT.PIXELS);
const distance = ref(EXTRACTOR_DEFAULT.DISTANCE);
const hueDistance = ref(Math.round(AVERAGE_DEFAULT.HUE * 1000) / 1000);
const saturationDistance = ref(AVERAGE_DEFAULT.SATURATION);
const lightnessDistance = ref(AVERAGE_DEFAULT.LIGHTNESS);
const srcs = ref(getRandImgs(5));
const random = ref(true);

const list = computed(() =>
  srcs.value.map((src) => ({
    src,
    id:
      src +
      pixels.value +
      distance.value +
      hueDistance.value +
      saturationDistance.value +
      lightnessDistance.value,
  }))
);

function randomFiles() {
  srcs.value = getRandImgs(5);
  random.value = true;
}

function uploadFile(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target && target.files) {
    srcs.value = [...target.files].map((file) => URL.createObjectURL(file));
    random.value = false;
  }
}
</script>

<template>
  <div
    class="flex flex-col sm:flex-row items-start gap-5 my-10 w-11/12 max-w-7xl mx-auto"
  >
    <!-- SETTINGS -->
    <div
      class="bg-base-100 text-base-content rounded-box col-span-3 row-span-3 flex w-full sm:w-72 flex-shrink-0 flex-col justify-center gap-4 p-4 shadow-xl"
    >
      <div class="p-2">
        <h1 class="text-xl font-extrabold">Demo</h1>
        <div class="text-base-content/70 my-4 text-xs">
          You can test differents inputs to change time process or colors
          extracted.
        </div>

        <div class="divider text-sm mt-8">Config</div>

        <!-- Pixels -->
        <div class="form-control mt-2">
          <div class="tooltip" data-tip="small enough to escape casual notice">
            <label class="label">
              <span class="label-text opacity-60">Pixels amount max</span>
            </label>
          </div>

          <div class="join">
            <input
              type="number"
              step="1"
              v-model="pixels"
              class="input input-sm input-bordered join-item w-full"
            />
            <span class="btn btn-sm join-item rounded-r-full">px</span>
          </div>
        </div>

        <!-- Color distance -->
        <div class="form-control mt-2">
          <div
            class="tooltip"
            data-tip="From 0 to 1 is the color distance to not have near colors (1 distance is between white and black)"
          >
            <label class="label">
              <span class="label-text opacity-60">Color distance</span>
            </label>
          </div>
          <div class="flex items-center">
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              v-model="distance"
              class="range range-xs w-full"
            />
            <input
              type="number"
              min="0"
              max="1"
              step="0.01"
              v-model="distance"
              class="number number-xs w-16 text-right"
            />
          </div>
        </div>

        <!-- Hue distance -->
        <div class="form-control mt-2">
          <div class="tooltip" data-tip="from 0 to 1">
            <label class="label">
              <span class="label-text opacity-60">Hue distance</span>
            </label>
          </div>
          <div class="flex items-center">
            <input
              type="range"
              step="0.05"
              min="0"
              max="1"
              v-model="hueDistance"
              class="range range-xs w-full"
            />
            <input
              type="number"
              step="0.05"
              min="0"
              max="1"
              v-model="hueDistance"
              class="number number-xs w-16 text-right"
            />
          </div>
        </div>

        <!-- Saturation distance -->
        <div class="form-control mt-2">
          <div class="tooltip" data-tip="from 0 to 1">
            <label class="label">
              <span class="label-text opacity-60">Saturation distance</span>
            </label>
          </div>
          <div class="flex items-center">
            <input
              type="range"
              step="0.05"
              min="0"
              max="1"
              v-model="saturationDistance"
              class="range range-xs w-full"
            />
            <input
              type="number"
              step="0.05"
              min="0"
              max="1"
              v-model="saturationDistance"
              class="number number-xs w-16 text-right"
            />
          </div>
        </div>

        <!-- Lightness distance -->
        <div class="form-control mt-2">
          <div class="tooltip" data-tip="from 0 to 1">
            <label class="label">
              <span class="label-text opacity-60">Lightness distance</span>
            </label>
          </div>
          <div class="flex items-center">
            <input
              type="range"
              step="0.05"
              min="0"
              max="1"
              v-model="lightnessDistance"
              class="range range-xs w-full"
            />
            <input
              type="number"
              step="0.05"
              min="0"
              max="1"
              v-model="lightnessDistance"
              class="number number-xs w-16 text-right"
            />
          </div>
        </div>

        <div class="divider text-sm mt-8">Images</div>

        <!-- Upload -->
        <label class="btn btn-primary w-full">
          Upload images
          <input
            type="file"
            accept="image/*"
            @change="uploadFile"
            multiple
            class="hidden"
          />
        </label>

        <!-- Random -->
        <button @click="randomFiles" class="btn btn-secondary mt-2 w-full">
          Random images
        </button>
      </div>
    </div>

    <!-- IMAGES -->
    <div class="flex flex-wrap gap-5">
      <ImgBlock
        v-for="{ src, id } of list"
        :random="random"
        :src="src"
        :pixels="pixels"
        :distance="distance"
        :hueDistance="hueDistance"
        :saturationDistance="saturationDistance"
        :lightnessDistance="lightnessDistance"
        class="card w-full lg:w-[calc(50%-15px)] xl:w-[calc(33%-15px)] bg-base-100 shadow-xl"
        :key="id"
      ></ImgBlock>
    </div>
  </div>
</template>
