<script setup lang="ts">
import { ref, computed } from "vue";

const props = defineProps<{
  browser?: string;
  node?: string;
}>();

const type = ref<"browser" | "node">("browser");

const count = computed(() => (props.browser ? 1 : 0) + (props.node ? 1 : 0));
</script>

<template>
  <div v-if="count > 1" class="tabs tabs-lifted mt-8 !block">
    <button
      v-if="browser"
      @click="type = 'browser'"
      class="tab tab-bordered [--tab-border-color:transparent]"
      :class="{
        'tab-active !bg-neutral !text-neutral-content   [--tab-bg:var(--fallback-n,oklch(var(--n)))] [--tab-border-color:var(--fallback-n,oklch(var(--n)))] [--tab-color:var(--fallback-nc,oklch(var(--nc)))]':
          type === 'browser',
      }"
    >
      Browser
    </button>
    <button
      v-if="node"
      @click="type = 'node'"
      class="tab tab-bordered [--tab-border-color:transparent]"
      :class="{
        'tab-active !bg-neutral !text-neutral-content   [--tab-bg:var(--fallback-n,oklch(var(--n)))] [--tab-border-color:var(--fallback-n,oklch(var(--n)))] [--tab-color:var(--fallback-nc,oklch(var(--nc)))]':
          type === 'node',
      }"
    >
      Node.js
    </button>
  </div>
  <div
    class="ec-code"
    :class="{ 'rounded-tl-none': type === 'browser' && count > 1 }"
  >
    <Transition mode="out-in">
      <div v-if="type === 'browser'" v-html="browser"></div>
      <div v-else-if="type === 'node'" v-html="node"></div>
    </Transition>
    <!-- <div
      class="col-start-1 row-start-1 flex items-start justify-end p-2 rtl:justify-start"
    >
      <div class="tooltip tooltip-left tooltip-accent" data-tip="copy">
        <button class="btn btn-square btn-sm btn-neutral">
          <svg
            class="h-5 w-5 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
          >
            <path
              d="M 16 3 C 14.742188 3 13.847656 3.890625 13.40625 5 L 6 5 L 6 28 L 26 28 L 26 5 L 18.59375 5 C 18.152344 3.890625 17.257813 3 16 3 Z M 16 5 C 16.554688 5 17 5.445313 17 6 L 17 7 L 20 7 L 20 9 L 12 9 L 12 7 L 15 7 L 15 6 C 15 5.445313 15.445313 5 16 5 Z M 8 7 L 10 7 L 10 11 L 22 11 L 22 7 L 24 7 L 24 26 L 8 26 Z"
            ></path>
          </svg>
          
        </button>
      </div>
    </div> -->
  </div>
</template>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
