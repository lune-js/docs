# Introduction

Lune is a lightweight, progressive-first JavaScript framework that enables developers to add client-side interactivity to server-rendered applications without the overhead of a full Single Page Application (SPA) framework.

## What is Lune?

Lune is a fork of [petite-vue](https://github.com/vuejs/petite-vue), optimized for **Progressive Enhancement**. It provides the same template syntax and reactivity mental model as standard Vue, but is specifically optimized for "sprinkling" small amounts of interactions on existing HTML pages.

### Key Benefits

- **Lightweight**: Only ~44kb minified, ~15kb gzipped.
- **Progressive**: Designed to layer on top of your existing HTML.
- **No Build Step**: Works directly in the browser with a `<script>` tag.
- **Vue-Compatible**: Uses familiar Vue syntax (`lu-if`, `lu-for`, `@click`, etc.).
- **CSP-Friendly**: Template expressions are compiled by Lune's own engine, so no `unsafe-eval` is required.

## Comparison with full Vue

| Feature         | Lune                                   | Standard Vue                   |
| --------------- | -------------------------------------- | ------------------------------ |
| Target Use Case | Progressive Enhancement                | Single Page Application (SPA)  |
| Runtime Size    | ~44kb minified, ~15kb gzipped          | ~120kb minified, ~45kb gzipped |
| Virtual DOM     | No (uses real DOM)                     | Yes                            |
| Build Required  | No                                     | Recommended                    |
| Scoped CSS      | No                                     | Yes (SFC)                      |
| SSR Support     | No (it is the client-side enhancement) | Yes                            |

## Basic Example

```html
<script src="https://cdn.jsdelivr.net/npm/lune-js" defer init></script>

<div lu-scope="{ count: 0 }">
  <button @click="count--">-</button>
  <span>{{ count }}</span>
  <button @click="count++">+</button>
</div>
```

## Interactive Example: Toggle

Here is a common pattern: toggling visibility of an element.

```html
<div lu-scope="{ open: false }">
  <button @click="open = !open">{{ open ? 'Close' : 'Open' }} Content</button>

  <div lu-show="open" class="content">
    <p>This content is toggled!</p>
  </div>
</div>
```

## How it works

1. **Load the script**: The `<script>` tag loads Lune from a CDN. The `defer` attribute ensures it runs after the HTML is parsed. The `init` attribute tells it to automatically find and mount components.

2. **Define Scope**: `lu-scope="{ count: 0 }"` marks the `<div>` as a component and initializes its state with `count` set to 0. This state is **reactive** — if it changes, the UI updates automatically.

3. **Bind Events**: `@click="count--"` and `@click="count++"` are event listeners that modify the state.

4. **Display Data**: <code v-pre>{{ count }}</code> displays the current value of `count`.
