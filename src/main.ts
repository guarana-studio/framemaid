import './style.css'
import 'katex/dist/katex.min.css'
import mermaid from 'mermaid'
import katex from 'katex';
import { z } from 'zod'
import queryString from 'query-string';

const QueryParamsSchema = z.object({
  method: z.enum(["renderMermaid", "renderKatex"]),
  params: z.array(z.string())
})

let searchParams: z.infer<typeof QueryParamsSchema> | undefined = undefined

try {
  searchParams = QueryParamsSchema.parse(queryString.parse(window.location.search, {arrayFormat: 'bracket'}))
} catch (error) {
  if (error instanceof z.ZodError) {
    renderError(error.message)
  }
}

async function renderError(error: string) {
  const prettyError = JSON.stringify(JSON.parse(error), undefined, '\t')
  document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
    <div style="white-space: pre;">
      ${prettyError}
    </div>
  `
}

async function renderMermaid(graph: string) {
  mermaid.initialize({})
  document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
    <pre class="mermaid">
      ${graph}
    </pre>
  `
  await mermaid.run()
}

async function renderKatex(expression: string) {
  const html = katex.renderToString(expression)
  document.querySelector<HTMLDivElement>('#app')!.innerHTML = html
}

switch (searchParams?.method) {
  case "renderMermaid":
    renderMermaid(atob(searchParams.params[0]))
    break
  case "renderKatex":
    renderKatex(atob(searchParams.params[0]))
    break
}
