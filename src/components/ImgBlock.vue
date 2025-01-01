<script setup lang="ts">
import { extractColors } from "extract-colors";
import { onMounted, ref } from "vue";
import { process } from "../helpers/process";
import type {
  ColorClassification,
  DetailledColor,
} from "extract-colors/lib/types/Color";
import ColorsDisplay from "./ColorsDisplay.vue";

const props = defineProps<{
  random: boolean;
  src: string;
  pixels: number;
  distance: number;
  fastDistance: number;
  autoGenerate: boolean;
  classifiedColors: ColorClassification[];
  defaultMainColor: number;
}>();

const colors = ref<DetailledColor[]>([]);
const classified = ref<{ [key: string]: DetailledColor[] }>({});
const px = ref(0);
const time = ref(0);
const naturalPx = ref(0);
const loading = ref(true);
const random = ref(true);

const isDisplayingInfo = ref(false);

const processCurrentId = ref("");

onMounted(() => {
  const image = new Image();
  const id = `${props.pixels}${props.distance}${props.fastDistance}${props.classifiedColors.join(",")}${props.autoGenerate}${props.defaultMainColor}`;

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
        fastDistance: Number(props.fastDistance),
        colorClassifications: props.classifiedColors,
        crossOrigin: "anonymous",
        defaultColors: props.autoGenerate,
        defaultMainColor: props.defaultMainColor,
      })
        .then((data) => {
          time.value = Date.now() - initTime;

          const { list, ...other } = data;

          colors.value = list;
          classified.value = other;
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
    <div class="relative rounded-xl overflow-hidden">
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

      <div v-if="!loading" class="form-control absolute top-0 right-0">
        <label class="label cursor-pointer">
          <span class="label-text mr-2">informations</span>
          <input
            type="checkbox"
            class="toggle toggle-sm"
            v-model="isDisplayingInfo"
          />
        </label>
      </div>
    </div>

    <div v-if="loading" class="card-body text-base-content">
      <span class="card-title"> Loading </span>
    </div>
    <div v-else class="card-body text-base-content relative">
      <div class="absolute top-0 left-0 right-3 -translate-y-full">
        <p
          v-if="random"
          class="text-shadow text-white text-sm mb-1 italic opacity-80"
        >
          Random image from Unsplash
        </p>

        <ColorsDisplay name="Full list" :colors="colors" />

        <template v-for="key of Object.keys(classified)" :key="key">
          <ColorsDisplay
            v-if="classified[key].length"
            :name="key"
            :colors="classified[key]"
            class="inline-block"
          />
        </template>
      </div>
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

      <div>
        <strong class="mt-3 mb-1 block">Full color palette</strong>
        <ColorsDisplay name="Full color" :colors="colors" />
      </div>

      <details
        v-if="Object.values(classified).flat(2).length > 0"
        class="mt-4 bg-base-200 rounded-lg"
      >
        <summary class="btn btn-sm w-full">Color classification</summary>

        <div class="px-4 pb-4">
          <template v-for="key of Object.keys(classified)" :key="key">
            <div v-if="classified[key].length">
              <!-- <strong class="mt-3 mb-1 block">{{ key }}</strong> -->
              <ColorsDisplay :name="key" :colors="classified[key]" />
            </div>
          </template>
        </div>
      </details>

      <p class="text-xs opacity-50 italic mt-2">
        {{ px }} pixels for calculation (original image is
        {{ naturalPx }} pixels)<br />
      </p>
    </div>
  </div>
</template>
