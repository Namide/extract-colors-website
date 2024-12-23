<script setup lang="ts">
import type { DetailledColor } from "extract-colors/lib/types/Color";

defineProps<{
  color: DetailledColor;
}>();
</script>

<template>
  <li class="leading-[0]">
    <span
      class="tooltip"
      :data-tip="`${parseFloat((color.area * 100).toFixed(2))}%  ${color.hexString}`"
    >
      <span
        class="w-6 h-6 rounded-xl block border border-black border-opacity-20"
        :style="`background-color: ${color.hexString}`"
      ></span>
    </span>
  </li>
</template>
