<script setup lang="ts">
import { extractColors } from "extract-colors";
import { computed, onMounted, ref } from "vue";
import { process } from "../helpers/process";
import type {
  ColorClassification,
  DetailledColor,
} from "extract-colors/lib/types/Color";
import ColorsDisplay from "./ColorsDisplay.vue";
import { useNow } from "@vueuse/core";

const emits = defineEmits<{
  load: [event: Event];
}>();

const props = defineProps<{
  src: string;
  pixels?: number;
  distance?: number;
  fastDistance?: number;
  autoGenerate: boolean;
  classifiedColors: ColorClassification[];
  defaultMainColor: number;
  displayInfos: boolean;
}>();

const colors = ref<DetailledColor[]>([]);
const classified = ref<{ [key: string]: DetailledColor[] }>({});
const px = ref(0);
const time = ref(0);
const naturalPx = ref(0);
const loading = ref(true);

const isDisplayingInfo = ref(false);

const processCurrentId = ref("");

const now = useNow();

const classifiedGroups: ColorClassification[][] = [
  ["dominants", "accents"],
  ["dominantsLight", "dominantsMidtone", "dominantsDark"],
  ["accentsLight", "accentsMidtone", "accentsDark"],
  ["vivids", "dullests"],
  ["dullestsLight", "dullestsMidtone", "dullestsDark"],
  ["vividsLight", "vividsMidtone", "vividsDark"],
  ["lightests", "midtones", "darkests"],
  ["warmest", "coolest"],
  ["warmestLight", "warmestMidtone", "warmestDark"],
  ["coolestLight", "coolestMidtone", "coolestDark"],
];

const startDate = Date.now();
const count = computed(() =>
  Math.floor((now.value.getTime() - startDate) / 5000)
);

const colorSquareSize = computed(() => {
  if (colors.value.length > 50) {
    return "xs";
  } else if (colors.value.length > 20) {
    return "sm";
  }
  return "md";
});

const displayedColors = computed(() => {
  const list = classifiedGroups
    .map((list) =>
      list.map((name) =>
        classified.value[name]
          ? {
              enabled: true,
              name,
              colors: classified.value[name],
            }
          : { enabled: false, name, colors: [] }
      )
    )
    .filter((list) =>
      list.reduce((enabled, item) => enabled || item.enabled, false)
    )
    .map((list) =>
      list
        .filter((item) => item.colors.length > 0)
        .map((item) => ({
          name: item.name,
          colors: item.colors,
        }))
    )
    .filter(
      (list) => list.reduce((total, item) => total + item.colors.length, 0) > 0
    );

  return list;
});

onMounted(() => {
  const image = new Image();
  const id = `${props.pixels}${props.distance}${props.fastDistance}${props.classifiedColors.join(",")}${props.autoGenerate}${props.defaultMainColor}`;

  processCurrentId.value = id;

  image.crossOrigin = "anonymous";
  image.src = props.src;
  image.addEventListener("load", () => {
    px.value = Math.min(
      props.pixels || image.naturalWidth * image.naturalHeight,
      image.naturalWidth * image.naturalHeight
    );
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
        pixels: props.pixels !== undefined ? Number(props.pixels) : undefined,
        distance:
          props.distance !== undefined ? Number(props.distance) : undefined,
        fastDistance:
          props.fastDistance !== undefined
            ? Number(props.fastDistance)
            : undefined,
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
  <div class="relative shadow-xl rounded-xl">
    <div class="relative">
      <!-- Image -->
      <figure>
        <img
          crossorigin="anonymous"
          :src="src"
          width="640"
          height="480"
          alt="image"
          class="w-full rounded-xl"
          @load="emits('load', $event)"
        />
      </figure>

      <!-- Loading -->
      <div
        :style="{ opacity: loading ? 1 : 0 }"
        class="absolute flex justify-center items-center top-0 left-0 w-full h-full transition-opacity bg-primary rounded-xl"
      >
        <span class="text-white text-2xl font-bold">Loading image</span>
      </div>
    </div>

    <Transition>
      <div v-if="!loading && isDisplayingInfo" class="bg-over">
        <em
          v-if="displayInfos"
          class="mb-2 -mt-2 block text-right text-sm italic"
        >
          Random image from Unsplash
        </em>
        <h2 class="card-title">
          {{ colors.length }} colors found
          <span
            class="tooltip font-normal"
            data-tip="Calculation time (image loading excluded)"
          >
            <div class="badge badge-accent align-text-top font-bold">
              {{ time }}ms
            </div>
          </span>
        </h2>
        <p class="text-xs italic">
          {{ px }} pixels for calculation (original image is
          {{ naturalPx }} pixels)<br />
        </p>
        <ColorsDisplay
          name=""
          :colors="colors"
          :size="colorSquareSize"
          class="mt-2"
          key="full"
        />
      </div>
      <div v-else-if="!loading" class="bg-over">
        <em
          v-if="!displayInfos"
          class="absolute block text-xs italic left-1/2 -translate-x-1/2 -translate-y-full -mt-5 text-white text-shadow mb-1 opacity-80"
        >
          Random image from Unsplash
        </em>
        <TransitionGroup name="list" tag="div" class="flex flex-wrap gap-4">
          <template v-for="(list, index) of displayedColors" :key="index">
            <div
              v-if="index === count % displayedColors.length"
              class="flex flex-wrap gap-4"
            >
              <ColorsDisplay
                v-for="{ colors, name } of list"
                :name="name"
                :colors="colors"
                :size="colorSquareSize"
                class="inline-block"
              />
            </div>
          </template>
          <ColorsDisplay
            name="Full list"
            :colors="colors"
            :size="colorSquareSize"
            class="ml-auto"
            key="full"
          />
        </TransitionGroup>
      </div>
    </Transition>

    <!-- info CTA -->
    <div
      v-if="!loading && displayInfos"
      class="form-control absolute top-2 right-2"
    >
      <label class="btn btn-sm btn-accent btn-circle swap swap-rotate">
        <input type="checkbox" v-model="isDisplayingInfo" />

        <!-- info icon -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="swap-off stroke-current"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 16h-1v-4h-1m1-4h.01"
          ></path>
        </svg>

        <!-- close icon -->
        <svg
          class="swap-on fill-current"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 512 512"
        >
          <polygon
            points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49"
          />
        </svg>
      </label>
    </div>
  </div>
</template>

<style scoped>
/* BLOCK */

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

/* LIST */

.list-enter-active {
  transition: opacity 0.5s 0.5s ease;
}
.list-leave-active {
  transition: opacity 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
}

.list-leave-active {
  position: absolute;
}

/* BG */

.bg-over {
  @apply absolute bottom-0 left-0 w-full text-base-content backdrop-blur-sm bg-base-100 bg-opacity-40 p-4 rounded-b-xl;
}
</style>
