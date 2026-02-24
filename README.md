# Framemaid

Don't want to bloat your app's bundle with extra scripts and styles for Mermaid nad KaTeX? Got you covered. Use iframe to render Mermaid and KaTeX.

## Usage

### Plain HTML

```html
<body>
  <iframe id="mermaidFrame" style="width: 100%; height: 50rem"></iframe>
  <iframe id="katexFrame" style="width: 100%; height: 50rem"></iframe>
  <script>
    const baseUrl = "https://framemaid.guarana.studio";
    const mermaidFrame = document.getElementById("mermaidFrame");
    const katexFrame = document.getElementById("katexFrame");

    const mermaidUrl = new URL(baseUrl);
    mermaidUrl.searchParams.append("method", "renderMermaid");
    mermaidUrl.searchParams.append(
      "params[]",
      btoa(`
        graph LR
            A --- B
            B-->C[fa:fa-ban forbidden]
            B-->D(fa:fa-spinner);
      `),
    );

    const katexUrl = new URL(baseUrl);
    katexUrl.searchParams.append("method", "renderKatex");
    katexUrl.searchParams.append("params[]", btoa("E = mc^2"));

    mermaidFrame.src = mermaidUrl.toString();
    katexFrame.src = katexUrl.toString();
  </script>
</body>
```

### JSX & TSX

```tsx
const FRAMEMAID_URL = "https://framemaid.guarana.studio";

export const Framemaid = () => {
  const mermaidUrl = new URL(FRAMEMAID_URL);
  mermaidUrl.searchParams.append("method", "renderMermaid");
  mermaidUrl.searchParams.append(
    "params[]",
    btoa(`
        graph LR
            A --- B
            B-->C[fa:fa-ban forbidden]
            B-->D(fa:fa-spinner);
      `),
  );

  const katexUrl = new URL(FRAMEMAID_URL);
  katexUrl.searchParams.append("method", "renderKatex");
  katexUrl.searchParams.append("params[]", btoa("E = mc^2"));

  return (
    <>
      <iframe src={mermaidUrl.toString()} style="width: 100%; height: 50rem"></iframe>
      <iframe src={katexUrl.toString()} style="width: 100%; height: 50rem"></iframe>
    </>
  );
};
```

### Svelte

```svelte
<script lang="ts">
    const FRAMEMAID_URL = "https://framemaid.guarana.studio";

    const mermaidUrl = new URL(FRAMEMAID_URL);
    mermaidUrl.searchParams.append("method", "renderMermaid");
    mermaidUrl.searchParams.append(
        "params[]",
        btoa(`
            graph LR
                A --- B
                B-->C[fa:fa-ban forbidden]
                B-->D(fa:fa-spinner);
        `),
    );

    const katexUrl = new URL(FRAMEMAID_URL);
    katexUrl.searchParams.append("method", "renderKatex");
    katexUrl.searchParams.append("params[]", btoa("E = mc^2"));
</script>

<iframe src={mermaidUrl.toString()} style="width: 100%; height: 50rem"></iframe>
<iframe src={katexUrl.toString()} style="width: 100%; height: 50rem"></iframe>
```
