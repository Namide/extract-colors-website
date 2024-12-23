<script setup lang="ts">
import { nextTick, ref, watch } from "vue";
import type { ColorClassification } from "extract-colors/lib/types/Color";
// import "./parts/track"

const fullTypes: ColorClassification[] = [
  "dominants",
  "accents",
  "dominantsLight",
  "dominantsMidtone",
  "dominantsDark",
  "accentsLight",
  "accentsMidtone",
  "accentsDark",
  "dullests",
  "vivids",
  "dullestsLight",
  "dullestsMidtone",
  "dullestsDark",
  "vividsLight",
  "vividsMidtone",
  "vividsDark",
  "lightests",
  "midtones",
  "darkests",
  "warmest",
  "coolest",
  "warmestLight",
  "warmestMidtone",
  "warmestDark",
  "coolestLight",
  "coolestMidtone",
  "coolestDark",
];

const props = defineProps<{ modelValue: ColorClassification[] }>();

const emit = defineEmits(["update:modelValue"]);

const addColorClassification = ref<ColorClassification | undefined>(undefined);

watch(addColorClassification, async (item) => {
  if (item) {
    emit("update:modelValue", [...new Set([...props.modelValue, item])]);
    await nextTick();
    addColorClassification.value = undefined;
  }
});

function remove(tag: ColorClassification) {
  const newModelValue = [...props.modelValue];
  newModelValue.splice(newModelValue.indexOf(tag), 1);
  emit("update:modelValue", newModelValue);
}

const types = ref<ColorClassification[]>(["dominants", "accents"]);
</script>

<template>
  <div class="mt-4">
    <div
      class="tooltip"
      data-tip="Add classification properties to extract some color types"
    >
      <label class="label"
        ><span class="label-text opacity-60">Color classification</span></label
      >
    </div>
    <div class="flex flex-wrap gap-2">
      <button
        @click="remove(sel)"
        class="after:content-['☓'] after:ml-1 bg-accent rounded-md px-2 text-accent-content"
        v-for="sel of modelValue"
      >
        {{ sel }}
      </button>
      <select
        v-model="addColorClassification"
        class="select select-sm select-primary"
      >
        <option :value="undefined" disabled>Add</option>
        <option
          v-for="type of fullTypes.filter(
            (type) => modelValue.indexOf(type) === -1
          )"
          :value="type"
        >
          {{ type }}
        </option>
      </select>
    </div>
  </div>
</template>
