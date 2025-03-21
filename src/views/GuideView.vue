<script setup lang="ts">
import { useHead } from "@unhead/vue";
import CodeTabs from "../components/CodeTabs.vue";
import installBrowserBashCode from "./code/install-browser.bash.txt";
import installBrowserJsCode from "./code/install-browser.js.txt";
import installNodeBashCode from "./code/install-node.bash.txt";
import installNodeJsCode from "./code/install-node.js.txt";
import outputJsCode from "./code/output.js.txt";
import moduleBrowserCode from "./code/module-browser.js.txt";
import moduleNodeCode from "./code/module-node.js.txt";
import workerCode from "./code/worker.js.txt";
import optionsBrowserCode from "./code/options-browser.js.txt";
import optionsNodeCode from "./code/options-node.js.txt";

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
  <div class="flex max-w-7xl mx-auto w-full">
    <!-- NAV -->
    <nav class="hidden lg:block bg-base-200">
      <div class="top-0 overflow-y-scroll my-6 sticky max-h-screen">
        <ul class="menu menu-compact bg-base-200 w-56 my-4">
          <li class="menu-title">
            <span>Getting Started</span>
          </li>
          <li><a href="#installation">Installation</a></li>
          <li><a href="#usage">Usage</a></li>
          <li class="menu-title mt-5">
            <span>Essentials</span>
          </li>
          <li><a href="#output">Output</a></li>
          <li class="menu-title mt-5">
            <span>Advanced</span>
          </li>
          <li><a href="#module-usage">Module usage</a></li>
          <li><a href="#web-workers">Web Workers</a></li>
          <li><a href="#options">Options</a></li>
          <li><a href="#pixels" class="ml-2 text-xs leading-3">pixels</a></li>
          <li>
            <a href="#distance" class="ml-2 text-xs leading-3">distance</a>
          </li>
          <li>
            <a href="#color-validator" class="ml-2 text-xs leading-3"
              >colorValidator</a
            >
          </li>
          <li>
            <a href="#cross-origin" class="ml-2 text-xs leading-3"
              >crossOrigin</a
            >
          </li>
          <li>
            <a href="#request-mode" class="ml-2 text-xs leading-3"
              >requestMode</a
            >
          </li>
          <li>
            <a href="#saturation-distance" class="ml-2 text-xs leading-3"
              >saturationDistance</a
            >
          </li>
          <li>
            <a href="#lightness-distance" class="ml-2 text-xs leading-3"
              >lightnessDistance</a
            >
          </li>
          <li>
            <a href="#hue-distance" class="ml-2 text-xs leading-3"
              >hueDistance</a
            >
          </li>
        </ul>
      </div>
    </nav>

    <!-- TEXT -->
    <article
      class="flex-1 bg-base-100 px-6 py-12 max-w-full lg:max-w-[calc(100%-14rem)] relative"
    >
      <div
        class="from-base-200 to-base-100 bg-gradient-to-b absolute top-0 left-0 w-full h-16 opacity-30"
      ></div>

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

      <div class="divider mt-16">essentials</div>

      <!-- OUTPUT -->
      <h2 id="output" class="text-2xl mt-8 mb-2">Output</h2>
      <p class="mb-2 mt-5">
        Array of colors object with the followed properties
      </p>
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
            <td>
              Abundance of the color and his neighbouring colors from 0 to 1
            </td>
          </tr>
        </tbody>
      </table>

      <div class="divider mt-16">advanced</div>

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
            The NodeJs example use <code>get-pixels</code> but you can change
            the lib.<br />
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
      <CodeTabs
        :browser="optionsBrowserCode"
        :node="optionsNodeCode"
      ></CodeTabs>

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
        Total pixel number of the resized picture for calculation. Fewer pixels
        will produce a rougher but faster result. More pixels will produce a
        more accurate but slower result.
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
        black). Less distance will produce a faster result with less colors.
        More distance will produce more precise colors but slower result.
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
        Only for browser, can be 'Anonymous' to avoid client side CORS. (the
        server side images need authorizations too).
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
        requests lead to valid responses, and which properties of the response
        are readable
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
        Minimum hue value between two colors otherwise the colors will be
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
              <td>0.083333333</td>
            </tr>
          </tbody>
        </table>
      </div>
    </article>
  </div>
</template>
