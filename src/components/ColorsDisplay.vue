<script setup lang="ts">
import type { DetailledColor } from "extract-colors/lib/types/Color";

defineProps<{
  name: string;
  colors: DetailledColor[];
}>();
</script>

<template>
  <div
    class="mb-3 ml-3 leading-[0] bg-white bg-opacity-40 backdrop-blur-sm rounded-md p-2 w-fit inline-block"
  >
    <strong class="block text-sm mb-1 italic first-letter:uppercase">{{
      name
    }}</strong>
    <ul
      class="flex justify-left w-fit"
      :class="{
        'flex-wrap': 1,
      }"
    >
      <li v-for="(color, index) of colors" :key="index" class="leading-[0]">
        <span
          class="tooltip"
          :data-tip="`${color.area > 0 ? `${parseFloat((color.area * 100).toFixed(3))}%` : 'generated'}  ${color.hexString}`"
        >
          <span
            class="h-6 w-6 block"
            :style="{
              backgroundColor: color.hexString,
            }"
          ></span>
        </span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.bg-checkerboard {
  background: conic-gradient(
    #cccccc40 90deg,
    #99999940 90deg 180deg,
    #cccccc40 180deg 270deg,
    #99999940 270deg
  );

  background-repeat: repeat;
  background-size: 10px 10px;
  background-position: top left;
}
</style>
