import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";
import prism from "prismjs";

export async function ParseToHTML(text: string) {
  const marked = new Marked(
    markedHighlight({
      async: true,
      highlight: (code, lang) => {
        if (prism.languages[lang]) {
          return prism.highlight(code, prism.languages[lang], lang);
        } else {
          return code;
        }
      },
    }),
  );

  marked.use({
    async: true,
    pedantic: false,
    gfm: true,
  });

  return await marked.parse(text);
}