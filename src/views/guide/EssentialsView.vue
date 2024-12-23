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
  <!-- OUTPUT -->
  <h2 id="output" class="text-2xl mt-8 mb-2">Output</h2>
  <p class="mb-2 mt-5">Array of colors object with the followed properties</p>
  <CodeTabs :browser="outputJsCode"></CodeTabs>

  <table class="table w-full my-5">
    <thead>
      <tr>
        <th>Field</th>
        <th>Example</th>
        <th>Type</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>hex</td>
        <td>#858409</td>
        <td>String</td>
        <td>Hexadecimal RGB string</td>
      </tr>
      <tr>
        <td>red</td>
        <td>133</td>
        <td>Integer</td>
        <td>red amount from 0 to 255</td>
      </tr>
      <tr>
        <td>green</td>
        <td>132</td>
        <td>Integer</td>
        <td>green amount from 0 to 255</td>
      </tr>
      <tr>
        <td>blue</td>
        <td>9</td>
        <td>Integer</td>
        <td>blue amount from 0 to 255</td>
      </tr>
      <tr>
        <td>hue</td>
        <td>0.1653</td>
        <td>Number</td>
        <td>color tone from 0 to 1</td>
      </tr>
      <tr>
        <td>intensity</td>
        <td>0.4862</td>
        <td>Number</td>
        <td>color intensity from 0 to 1</td>
      </tr>
      <tr>
        <td>lightness</td>
        <td>0.2784</td>
        <td>Number</td>
        <td>color lightness from 0 to 1</td>
      </tr>
      <tr>
        <td>saturation</td>
        <td>0.8732</td>
        <td>Number</td>
        <td>color saturation from 0 to 1</td>
      </tr>
      <tr>
        <td>area</td>
        <td>0.0004</td>
        <td>Number</td>
        <td>Abundance of the color and his neighbouring colors from 0 to 1</td>
      </tr>
    </tbody>
  </table>
</template>
