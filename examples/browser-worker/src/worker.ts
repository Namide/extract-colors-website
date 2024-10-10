import { extractColors } from "extract-colors";

onmessage = async (message) => {
  const list = await extractColors(
    ...(message.data as Parameters<typeof extractColors>)
  );
  postMessage(list);
};
