<script setup lang="ts">
import { useHead } from "@unhead/vue";
import CodeTabs from "../../components/CodeTabs.vue";
import installBrowserBashCode from "../code/install-browser.bash.txt";
import installBrowserJsCode from "../code/install-browser.js.txt";
import installNodeBashCode from "../code/install-node.bash.txt";
import installNodeJsCode from "../code/install-node.js.txt";
import outputJsCode from "../code/output.js.txt";
import moduleBrowserCode from "../code/module-browser.js.txt";
import moduleNodeCode from "../code/module-node.js.txt";
import workerCode from "../code/worker.js.txt";
import optionsBrowserCode from "../code/options-browser.js.txt";
import optionsNodeCode from "../code/options-node.js.txt";

useHead({
  title: "Extract colors | Guide",
  meta: [
    {
      name: "description",
      content: "Javascript library to extract color palette from images",
    },
  ],
});
</script>

<template>
  <h1 class="text-4xl font-bold relative">Getting Started</h1>

  <!-- INSTALL -->
  <h2 id="installation" class="text-2xl mt-8 mb-2">Installation</h2>
  <CodeTabs
    :browser="installBrowserBashCode"
    :node="installNodeBashCode"
  ></CodeTabs>

  <!-- SIMPLE USAGE -->
  <h2 id="usage" class="text-2xl mt-8 mb-2">Usage</h2>
  <CodeTabs
    :browser="installBrowserJsCode"
    :node="installNodeJsCode"
  ></CodeTabs>
</template>
