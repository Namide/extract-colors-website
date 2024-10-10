import { extractColors } from "extract-colors/lib/worker-wrapper";

const src = `https://picsum.photos/seed/${Math.round(Math.random() * Number.MAX_SAFE_INTEGER)}/640/480`;
extractColors(src, { crossOrigin: "anonymous" }).then((list) => {
  console.log(list);
  document.body.innerHTML = JSON.stringify(list, null, "&nbsp;").replace(
    /\n/gi,
    "<br>"
  );
});
