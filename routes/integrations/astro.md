# Astro Integration Guide

[`@lune-js/astro`](https://github.com/lune-js/astro) is an [Astro integration](https://docs.astro.build/en/guides/integrations/) that adds Lune to every page of your site. Astro renders the HTML, the integration boots a single Lune app on the client, and your directives work anywhere in your markup — no `<script>` tag, no `createApp()` call, no islands.

## Requirements

| Package   | Version     |
| --------- | ----------- |
| `astro`   | `^7.0.0`    |
| `lune-js` | `^1.0.0`    |
| Node.js   | `>=22.12.0` |

Both `astro` and `lune-js` are peer dependencies, so they live in your project — the version of Lune that ends up on the page is the one in your `package.json`.

## Installation

::: code-group

```sh [npm]
npm install @lune-js/astro lune-js
```

```sh [yarn]
yarn add @lune-js/astro lune-js
```

```sh [pnpm]
pnpm add @lune-js/astro lune-js
```

```sh [bun]
bun add @lune-js/astro lune-js
```

:::

Then register the integration in your Astro config:

```js
// astro.config.mjs
import { defineConfig } from "astro/config";
import lune from "@lune-js/astro";

export default defineConfig({
  integrations: [lune()]
});
```

That's the whole setup. Every page now ships Lune.

## Your First Page

Write directives directly in your `.astro` markup. Lune mounts to each top-level `lu-scope` on the page once the DOM is ready.

```astro
---
// src/pages/index.astro
---

<html>
  <head>
    <title>Lune 🌙 x Astro 🚀</title>
  </head>
  <body>
    <div lu-scope="{ count: 1 }">
      <p lu-text="count"></p>
      <button @click="count++">increment</button>
      <button @click="count--">decrement</button>
    </div>
  </body>
</html>
```

## How It Works

The integration injects a small page-level script into every route:

```js
import * as Lune from "lune-js";
import { createApp } from "virtual:@lune-js/astro/entrypoint";

window.Lune = { ...Lune, createApp };
document.addEventListener("DOMContentLoaded", () => createApp().mount());
```

The `createApp` imported there is not Lune's own. It comes from a virtual module the integration generates around your [entrypoint](#extending-lune-with-an-entrypoint), and it calls `Lune.createApp()` with your `data`, hands the result to your default export, and returns it.

Three consequences are worth internalizing:

- **You never call `Lune.createApp()` yourself.** The integration owns the app instance and configures it from the [entrypoint](#extending-lune-with-an-entrypoint).
- **`app.mount()` is called with no argument**, so Lune mounts to every top-level `lu-scope` element on the page. Elements outside a `lu-scope` are left alone.
- **`window.Lune` is exposed** as an [escape hatch](#window-lune), giving you `reactive`, `effect`, `nextTick`, and the integration's `createApp` from any inline script.

## The `window.Lune` Escape Hatch {#window-lune}

Inline scripts reach Lune through `window.Lune`. It carries everything the package exports, with one substitution: `createApp` is the integration's, not Lune's bare one.

That distinction matters. An app created with `window.Lune.createApp()` gets the same `data` and the same directives and plugins as the app the integration mounts for you — you do not have to reconstruct your setup by hand. Anything you pass takes precedence over your entrypoint's `data`, which is how you layer in state that only exists at that moment:

```js
window.Lune.createApp({ user }).mount(el);
```

## Interpolation and Astro's Braces

Astro's template syntax claims single braces, so Lune's <code v-pre>{{ }}</code> interpolation is parsed by Astro first and never reaches Lune. Writing <code v-pre>{{ count }}</code> in an `.astro` file compiles as an object literal expression and fails with a `ReferenceError`.

Two ways around it:

```astro
<div lu-scope="{ count: 7 }">
  <!-- Preferred: use lu-text -->
  <p lu-text="count"></p>

  <!-- Or escape the mustache as a string expression -->
  <p>{"{{ count }}"}</p>
</div>
```

> [!TIP]
> Prefer `lu-text`. It keeps the template valid Astro, avoids a flash of raw <code v-pre>{{ }}</code> before hydration, and reads better next to the rest of your directives.

This restriction applies to `.astro` files only. Interpolation works normally inside HTML that Astro emits verbatim — for example content injected with `set:html`, or markup rendered by a CMS.

> [!IMPORTANT]
> There is a third way around this, and it is the most thorough: pick [delimiters](/advanced/custom-delimiters) Astro does not claim. `$delimiters` is read from the object passed to `createApp()`, so setting it on your entrypoint's [`data`](#data) export makes interpolation work normally throughout your `.astro` files.

## Passing Server Data Into Scope

Anything you fetch in an Astro frontmatter block can be serialized straight into `lu-scope`:

```astro
---
// src/pages/product/[id].astro
const product = await getProduct(Astro.params.id);
---

<div lu-scope={JSON.stringify({ product, qty: 1 })}>
  <h1 lu-text="product.name"></h1>
  <p lu-text="'$' + product.price * qty"></p>

  <button @click="qty--" :disabled="qty <= 1">-</button>
  <span lu-text="qty"></span>
  <button @click="qty++">+</button>
</div>
```

Astro escapes the attribute for you, and Lune parses it back into a reactive scope on the client. Only serialize what the interactive part of the page actually needs — everything else should stay on the server.

> [!WARNING]
> `lu-scope` is evaluated as a JavaScript expression. Never interpolate unsanitized user input into it. See [Security](/advanced/security).

## Extending Lune With an Entrypoint

The `entrypoint` option points at a module that configures Lune before it mounts.

```js
// astro.config.mjs
import { defineConfig } from "astro/config";
import lune from "@lune-js/astro";

export default defineConfig({
  integrations: [lune({ entrypoint: "/src/entrypoint" })]
});
```

The path may be a root-relative import specifier (`/src/entrypoint`) or a path relative to your project root (`./src/entrypoint`). The module may provide either or both of the exports below. If it provides neither, the integration warns in development and mounts an unmodified app.

### `data`

A `data` export is passed straight to `createApp()` and becomes the app's root scope, which every `lu-scope` on the page inherits from. Because it is a real module export rather than serialized configuration, it can hold methods and getters — not just JSON.

#### Shared Scope Factories

Expressions cannot reach globals, so a function declared in a page `<script>` is invisible to your templates. Put reusable scope factories on `data` instead.

```ts
// src/entrypoint.ts
function Counter(start = 0) {
  return {
    count: start,
    get double() {
      return this.count * 2;
    },
    increment() {
      this.count++;
    }
  };
}

export const data = { Counter };
```

```astro
<div lu-scope="Counter(5)">
  <p lu-text="count"></p>
  <p lu-text="double"></p>
  <button @click="increment">increment</button>
</div>
```

This is the idiomatic place for getters and methods: an object literal written inline in `lu-scope` holds data only.

#### Custom Delimiters

`$delimiters` is read once, when the app is created, so `data` is the only place it can be set. Choosing a pair Astro leaves alone is what makes <code v-pre>{{ }}</code>-style interpolation usable in `.astro` files.

```ts
// src/entrypoint.ts
export const data = {
  $delimiters: ["[[", "]]"]
};
```

```astro
<div lu-scope="{ count: 7 }">
  <p>[[ count ]]</p>
</div>
```

### `default`

The default export receives the app instance after it is created but before it mounts. The module must have a default export to use this — otherwise the integration warns in development.

#### Custom Directives

```ts
// src/entrypoint.ts
import type { App } from "lune-js";

export default (app: App) => {
  app.directive("focus", ({ el }) => {
    el.focus();
  });
};
```

```astro
<div lu-scope="{ query: '' }">
  <input lu-focus lu-model="query" />
</div>
```

#### Plugins

```ts
// src/entrypoint.ts
import type { App } from "lune-js";
import i18n from "my-i18n-plugin";

export default (app: App) => {
  app.use(i18n, { locale: "en" });
};
```

See [Plugins](/advanced/plugins) and [Custom Directives](/advanced/custom-directives) for the full authoring API.

## Client-Side Routing

The injected script mounts on `DOMContentLoaded`, which fires once per full page load. If you use Astro's [`<ClientRouter />`](https://docs.astro.build/en/guides/view-transitions/), subsequent navigations swap the document without firing that event, and the new page's directives are never processed.

Re-mount on `astro:after-swap`, which fires after each client-side swap but not on the initial load:

```astro
---
// src/layouts/Layout.astro
import { ClientRouter } from "astro:transitions";
---

<html>
  <head>
    <ClientRouter />
  </head>
  <body>
    <slot />

    <script>
      if (!window.__luneRemount) {
        window.__luneRemount = true;
        document.addEventListener("astro:after-swap", () => window.Lune.createApp().mount());
      }
    </script>
  </body>
</html>
```

The guard matters: listeners on `document` survive swaps, so registering unconditionally would stack a new listener on every navigation.

> [!NOTE]
> The remounted app is built by the [integration's `createApp`](#window-lune), so your entrypoint's `data` and customizations survive client-side navigation — scope factories stay available on pages reached by a swap.

## Troubleshooting

**Nothing is reactive and no errors appear.** Check that the interactive markup is inside an element with `lu-scope`. Lune only walks elements it mounts to.

**A page renders <code v-pre>{{ }}</code> literally, or the build fails with `ReferenceError`.** Astro consumed the braces. Learn more about [Astro's syntax](https://docs.astro.build/en/reference/astro-syntax).

**An expression silently does nothing.** Expressions that reference `window`, `document`, `fetch`, `eval`, and similar globals are rejected for safety, with a warning in development. Move the logic into a scope method — see [Security](/advanced/security).

**Directives or scope factories from the entrypoint are missing.** Confirm the module has the export you need — `default` for directives and plugins, `data` for root-scope factories and `$delimiters` — and that the `entrypoint` path resolves from your project root, not from the config file's directory. An entrypoint that exports neither warns in development.
