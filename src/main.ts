import "./style.css";
import "katex/dist/katex.min.css";
import mermaid from "mermaid";
import katex from "katex";
import { z } from "zod";
import queryString from "query-string";

function renderError(error: string) {
  document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
    <div style="white-space: pre;">
      ${error}
    </div>
  `;
}

function renderJsonError(error: string) {
  const prettyError = JSON.stringify(JSON.parse(error), undefined, "\t");
  renderError(prettyError);
}

const QueryParamsSchema = z.object({
  method: z.enum(["renderMermaid", "renderKatex"]),
  params: z.array(z.string()),
});

let searchParams: z.infer<typeof QueryParamsSchema> | undefined = undefined;

try {
  searchParams = QueryParamsSchema.parse(
    queryString.parse(window.location.search, { arrayFormat: "bracket" }),
  );
} catch (error) {
  if (error instanceof z.ZodError) {
    renderJsonError(error.message);
  }
}

async function renderMermaid(graph: string) {
  mermaid.initialize({});
  document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
    <pre class="mermaid">
      ${graph}
    </pre>
  `;
  await mermaid.run();
}

async function renderKatex(expression: string) {
  try {
    const html = katex.renderToString(expression);
    document.querySelector<HTMLDivElement>("#app")!.innerHTML = html;
  } catch (error) {
    if (error instanceof Error) {
      renderError(error.message);
    }
  }
}

switch (searchParams?.method) {
  case "renderMermaid":
    renderMermaid(atob(searchParams.params[0]));
    break;
  case "renderKatex":
    renderKatex(atob(searchParams.params[0]));
    break;
}
