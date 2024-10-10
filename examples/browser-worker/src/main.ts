import InlineWorker from "./worker.js?worker";

const worker = new InlineWorker();
worker.addEventListener("message", (message) => {
  console.log(message.data);
  document.body.innerHTML = JSON.stringify(
    message.data,
    null,
    "&nbsp;"
  ).replace(/\n/gi, "<br>");
});

const src = `https://picsum.photos/seed/${Math.round(Math.random() * Number.MAX_SAFE_INTEGER)}/640/480`;
worker.postMessage([src, { requestMode: "cors" }]);
