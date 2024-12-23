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
  <!-- MODULE USAGE -->
  <h2 id="module-usage" class="text-2xl mt-8 mb-2">Module usage</h2>
  <CodeTabs :browser="moduleBrowserCode" :node="moduleNodeCode"></CodeTabs>

  <div class="alert alert-info shadow-lg mt-5">
    <div>
      <p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="stroke-current flex-shrink-0 w-6 h-6 inline-block"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        The NodeJs example use <code>get-pixels</code> but you can change the
        lib.<br />
        Just send the ImageData object to
        <code>extractColors(imageData)</code> for NodeJs.
      </p>
    </div>
  </div>

  <!-- WORKER USAGE -->
  <h2 id="web-workers" class="text-2xl mt-8 mb-2">
    Web Workers (browser only)
  </h2>
  <CodeTabs :browser="workerCode"></CodeTabs>

  <!-- OPTIONS -->
  <h2 id="options" class="text-2xl mt-8 mb-2">Options</h2>
  <p class="mb-2 mt-5">Example of custom options</p>
  <CodeTabs :browser="optionsBrowserCode" :node="optionsNodeCode"></CodeTabs>

  <div class="alert alert-info shadow-lg mt-5">
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        class="stroke-current flex-shrink-0 w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
      <p>
        With browser you can use different types for src param (String for a
        path of image or ImageData).<br />
        NodeJs support only ImageData input.
      </p>
    </div>
  </div>

  <h3 id="pixels" class="text-xl mt-6 mb-2 font-bold">pixels</h3>
  <p class="my-5">
    Total pixel number of the resized picture for calculation. Fewer pixels will
    produce a rougher but faster result. More pixels will produce a more
    accurate but slower result.
  </p>
  <div class="overflow-x-auto">
    <table class="table w-auto">
      <thead>
        <tr>
          <th>Type</th>
          <th>Min</th>
          <th>Max</th>
          <th>Default</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Integer</td>
          <td>1</td>
          <td>2^53 - 1</td>
          <td>10000</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h3 id="distance" class="text-xl mt-6 mb-2 font-bold">distance</h3>
  <p class="my-5">
    Color distance to not have near colors (1 distance is between white and
    black). Less distance will produce a faster result with less colors. More
    distance will produce more precise colors but slower result.
  </p>
  <div class="overflow-x-auto">
    <table class="table w-auto">
      <thead>
        <tr>
          <th>Type</th>
          <th>Min</th>
          <th>Max</th>
          <th>Default</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Number</td>
          <td>0</td>
          <td>1</td>
          <td>0.22</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h3 id="color-validator" class="text-xl mt-6 mb-2 font-bold">
    colorValidator
  </h3>
  <p class="my-5">Test function to enable only some colors.</p>
  <div class="overflow-x-auto">
    <table class="table w-auto">
      <tbody>
        <tr>
          <th class="block">Type</th>
          <td>Function</td>
        </tr>
        <tr>
          <th class="block">Signature</th>
          <td>
            <code
              >(red: number, green: number, blue: number, alpha?: number) =>
              boolean</code
            >
          </td>
        </tr>
        <tr>
          <th class="block">Default</th>
          <td>(red, green, blue, alpha = 255) =&gt; alpha &gt; 250</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h3 id="cross-origin" class="text-xl mt-6 mb-2 font-bold">
    crossOrigin (browser)
  </h3>
  <p class="my-5">
    Only for browser, can be 'Anonymous' to avoid client side CORS. (the server
    side images need authorizations too).
  </p>
  <div class="overflow-x-auto">
    <table class="table w-auto">
      <thead>
        <tr>
          <th>Type</th>
          <th>Default</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>String</td>
          <td>""</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h3 id="request-mode" class="text-xl mt-6 mb-2 font-bold">
    requestMode (Web Workers in browser)
  </h3>
  <p class="my-5">
    Only for Web Workers in browser: it's used to determine if cross-origin
    requests lead to valid responses, and which properties of the response are
    readable
  </p>
  <div class="overflow-x-auto">
    <table class="table w-auto">
      <thead>
        <tr>
          <th>Type</th>
          <th>Default</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>String</td>
          <td>cors</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h3 id="saturation-distance" class="text-xl mt-6 mb-2 font-bold">
    saturationDistance
  </h3>
  <p class="my-5">
    Minimum saturation value between two colors otherwise the colors will be
    merged.
  </p>
  <div class="overflow-x-auto">
    <table class="table w-auto">
      <thead>
        <tr>
          <th>Type</th>
          <th>Min</th>
          <th>Max</th>
          <th>Default</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>String</td>
          <th>0</th>
          <th>1</th>
          <td>0.2</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h3 id="lightness-distance" class="text-xl mt-6 mb-2 font-bold">
    lightnessDistance
  </h3>
  <p class="my-5">
    Minimum lightness value between two colors otherwise the colors will be
    merged.
  </p>
  <div class="overflow-x-auto">
    <table class="table w-auto">
      <thead>
        <tr>
          <th>Type</th>
          <th>Min</th>
          <th>Max</th>
          <th>Default</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>String</td>
          <th>0</th>
          <th>1</th>
          <td>0.2</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h3 id="hue-distance" class="text-xl mt-6 mb-2 font-bold">hueDistance</h3>
  <p class="my-5">
    Minimum hue value between two colors otherwise the colors will be merged.
  </p>
  <div class="overflow-x-auto">
    <table class="table w-auto">
      <thead>
        <tr>
          <th>Type</th>
          <th>Min</th>
          <th>Max</th>
          <th>Default</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>String</td>
          <th>0</th>
          <th>1</th>
          <td>0.083333333</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
