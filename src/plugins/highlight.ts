import fs from "fs";
import type { PluginOption } from "vite";
import { createHighlighter, type ThemeInput } from "shiki";
import theme from "./highlight-theme.json";

export default async function highlight(): Promise<PluginOption> {
  const jsRegex = /\.(js\.txt)$/;
  const bashRegex = /\.(bash\.txt)$/;

  const highlighter = await createHighlighter({
    themes: [],
    langs: ["javascript", "bash"],
  });

  await highlighter.loadTheme(theme as ThemeInput);

  return {
    name: "transform-file",
    async transform(_: string, id: any) {
      if (jsRegex.test(id) || bashRegex.test(id)) {
        const rawCode = fs.readFileSync(id, { encoding: "utf8", flag: "r" });

        let lang = "javascript";
        switch (true) {
          case bashRegex.test(id):
            lang = "bash";
            break;
        }

        const highlightedCode = highlighter.codeToHtml(rawCode, {
          lang,
          theme: "extract-colors",
        });

        const finalCode = `export default ${JSON.stringify(highlightedCode)}`;

        return {
          code: finalCode,
          map: null, // provide source map if available
        };
      }
    },
  };
}
