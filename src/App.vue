<script setup lang="ts">
import { RouterView } from "vue-router";
import MainHeader from "./components/MainHeader.vue";
import MainFooter from "./components/MainFooter.vue";
</script>

<template>
  <MainHeader />
  <RouterView />
  <MainFooter />
</template>

<style scoped></style>
