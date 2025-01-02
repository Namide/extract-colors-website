<script setup lang="ts">
import type { DetailledColor } from "extract-colors/lib/types/Color";

withDefaults(
  defineProps<{
    name: string;
    colors: DetailledColor[];
    size?: "xs" | "sm" | "md";
  }>(),
  {
    size: "md",
  }
);
</script>

<template>
  <div class="leading-[0] w-fit flex flex-col items-center">
    <strong
      class="block text-sm mb-1 italic font-normal first-letter:uppercase"
      >{{ name }}</strong
    >
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
            class="w-6 block aspect-square"
            :style="{
              backgroundColor: color.hexString,
            }"
            :class="{
              'w-2': size === 'xs',
              'w-4': size === 'sm',
              'w-6': size === 'md',
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
