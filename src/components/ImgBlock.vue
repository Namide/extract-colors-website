<script setup lang="ts">
import { extractColors } from "extract-colors";
import { onMounted, ref } from "vue";
import { process } from "../helpers/process";
import type {
  ColorClassification,
  DetailledColor,
} from "extract-colors/lib/types/Color";
import ColorRound from "./ColorRound.vue";

const props = defineProps<{
  random: boolean;
  src: string;
  pixels: number;
  distance: number;
  fastDistance: number;
  classifiedColors: ColorClassification[];
}>();

const colors = ref<DetailledColor[]>([]);
const classified = ref<{ [key: string]: DetailledColor[] }>({});
const px = ref(0);
const time = ref(0);
const naturalPx = ref(0);
const loading = ref(true);
const random = ref(true);

const processCurrentId = ref("");

onMounted(() => {
  const image = new Image();
  const id = `${props.pixels}${props.distance}${props.fastDistance}${props.classifiedColors.join(",")}`;

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
      })
        .then((data) => {
          time.value = Date.now() - initTime;
          console.log(data);

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

      <div>
        <strong class="mt-3 mb-1 block">Full list</strong>
        <ul class="flex justify-left flex-wrap gap-2">
          <ColorRound
            v-for="(color, index) of colors"
            :color="color"
            :key="index"
          />
        </ul>
      </div>

      <details class="mt-4 bg-base-200 rounded-lg">
        <summary class="btn btn-sm w-full">Color classification</summary>

        <div class="px-4 pb-4">
          <template v-for="key of Object.keys(classified)" :key="key">
            <div v-if="classified[key].length">
              <strong class="mt-3 mb-1 block">{{ key }}</strong>
              <ul class="flex justify-left flex-wrap gap-2">
                <ColorRound
                  v-for="(color, index) of classified[key]"
                  :color="color"
                  :key="index"
                />
              </ul>
            </div>
          </template>
        </div>
      </details>
    </div>
  </div>
</template>
