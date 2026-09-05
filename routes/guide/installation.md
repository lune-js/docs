# Installation

Lune is designed to be used without a build step. You can simply load it from a CDN.

## CDN

::: code-group

```html [esm]
<!-- For the ES module build -->
<script type="module">
  import { createApp } from "https://esm.sh/lune-js";
  createApp().mount();
</script>
```

```html [jsdelivr]
<script src="https://cdn.jsdelivr.net/npm/lune-js" defer init></script>
```

```html [unpkg]
<script src="https://unpkg.com/lune-js" defer init></script>
```

:::

> [!TIP] Production Tip
> For production, it is recommended to pin a specific version number to avoid unexpected breakage from newer versions.
>
> ```html
> <script src="https://cdn.jsdelivr.net/npm/lune-js@1.0.0" defer init></script>
> ```

## Package

You can also install Lune via your project's package manager:

::: code-group

```sh [npm]
npm install lune-js
```

```sh [yarn]
yarn add lune-js
```

```sh [pnpm]
pnpm add lune-js@latest
```

```sh [bun]
bun add lune-js
```

```sh [deno]
deno add npm:lune-js
```

:::

Then import it in your project:

```js
import { createApp } from "lune-js";
createApp().mount();
```

## Troubleshooting

### Loading Order

Always use `defer` when loading Lune in the `<head>` to ensure the DOM is ready before Lune tries to initialize. If you put the script at the end of `<body>`, `defer` is not strictly necessary but still good practice.
