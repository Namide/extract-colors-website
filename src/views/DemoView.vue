<script setup lang="ts">
import { useHead } from "@unhead/vue";
import { computed, ref } from "vue";
import ImgBlock from "../components/ImgBlock.vue";
import type { ColorClassification } from "extract-colors/lib/types/Color";
import SelectTags from "@/components/SelectTags.vue";
// import "./parts/track"

const enum EXTRACTOR_DEFAULT {
  PIXELS = 64000,
  DISTANCE = 0.22,
  FAST_DISTANCE = 0.11,
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
const autoGenerate = ref(false);
const fastDistance = ref(
  Math.round(EXTRACTOR_DEFAULT.FAST_DISTANCE * 1000) / 1000
);
const srcs = ref(getRandImgs(5));
const random = ref(true);
const types = ref<ColorClassification[]>(["dominants", "accents"]);

const list = computed(() =>
  srcs.value.map((src) => ({
    src,
    id:
      src +
      pixels.value +
      distance.value +
      fastDistance.value +
      types.value.join(",") +
      autoGenerate.value,
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
              <span class="label-text opacity-60">Distance</span>
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

        <!-- Fast distance -->
        <div class="form-control mt-2">
          <div
            class="tooltip"
            data-tip="From 0 to 1 to reduce total calculation time by removing near colors"
          >
            <label class="label">
              <span class="label-text opacity-60">Fast distance</span>
            </label>
          </div>
          <div class="flex items-center">
            <input
              type="range"
              step="0.05"
              min="0"
              max="1"
              v-model="fastDistance"
              class="range range-xs w-full"
            />
            <input
              type="number"
              step="0.05"
              min="0"
              max="1"
              v-model="fastDistance"
              class="number number-xs w-16 text-right"
            />
          </div>
        </div>

        <!-- Color classification -->
        <SelectTags v-model="types" />

        <!-- Default colors -->
        <div class="form-control mt-2">
          <div
            class="tooltip"
            data-tip="generate colors for color classifications without extracted colors"
          >
            <label class="label mt-2 pb-0">
              <span class="label-text opacity-60">Default colors</span>
            </label>
          </div>
          <div class="flex items-center">
            <label class="label cursor-pointer">
              <span class="label-text mr-5">Auto generate</span>
              <input
                type="checkbox"
                class="toggle toggle-secondary toggle-sm"
                v-model="autoGenerate"
              />
            </label>
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
        :fast-distance="fastDistance"
        :classified-colors="types"
        :auto-generate="autoGenerate"
        class="card w-full lg:w-[calc(50%-15px)] xl:w-[calc(33%-15px)] bg-base-100 shadow-xl"
        :key="id"
      ></ImgBlock>
    </div>
  </div>
</template>
