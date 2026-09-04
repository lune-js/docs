# createApp API

The `createApp` function is the main entry point for creating a Lune application instance.

## Usage

### Simple Initialization

```js
import { createApp } from "lune-js";

const app = createApp({
  count: 0,
  increment() {
    this.count++;
  }
});

app.mount("#app");
```

### Script Tag Inclusion

Depending on the CDN build, `createApp` is available as a global `Lune` object.

::: code-group

```html [esm]
<!-- For the ES module build -->
<script type="module">
  import { createApp } from "https://esm.sh/lune-js";
  createApp({ count: 0 }).mount("#app");
</script>
```

```html [jsdelivr]
<script src="https://cdn.jsdelivr.net/npm/lune-js"></script>
<script>
  const { createApp } = Lune;
  createApp({ count: 0 }).mount("#app");
</script>
```

```html [unpkg]
<script src="https://unpkg.com/lune-js" defer init></script>
<script>
  const { createApp } = Lune;
  createApp({ count: 0 }).mount("#app");
</script>
```

:::

## Root Scope

The `createApp` function accepts a data object that serves as the root scope for all expressions. This is useful for bootstrapping simple apps or sharing state.

### Defining Root Scope

```js
createApp({
  // exposed to all expressions
  count: 0,

  // getters
  get plusOne() {
    return this.count + 1;
  },

  // methods
  increment() {
    this.count++;
  }
}).mount();
```

### Usage in Template

Properties defined in the root scope are available in all templates within the mounted app:

```html
<div lu-scope>
  <p>Count: {{ count }}</p>
  <p>Plus One: {{ plusOne }}</p>
  <button @click="increment">Increment</button>
</div>
```

Note that when using a root scope, `lu-scope` doesn't need a value; it just marks the element as a Lune region.

## API Reference

### `createApp(initialData?: object)`

Creates a new application instance.

- **`initialData`**: An optional object that defines the initial state of the application. This state is made reactive with `reactive()` from `@lune-js/core`, Lune's [reactivity package](/guide/reactivity).

**Returns:** An application instance object.

## Instance Methods

### `app.mount(el?: string | Element | null)`

Mounts the application to the DOM and returns the app instance. If a selector string does not match any element, it logs a development warning and returns `undefined`.

- **`el`**: An optional selector string, `Element`, or `null`. If not provided, Lune will search for and mount to all elements with the `lu-scope` directive. If no `lu-scope` is found, it will mount to the entire `document.documentElement` (not recommended for performance).

### `app.unmount()`

Unmounts the application and cleans up reactive effects and directive cleanup callbacks. Native DOM event listeners registered by `lu-on` are attached to their elements and are not explicitly removed unless the element is removed or a custom directive returns its own cleanup callback.

### `app.directive(name: string, def?: Directive)`

Registers a global custom directive, or reads one back when `def` is omitted.

- **`name`**: The name of the directive (without the `lu-` prefix).
- **`def`**: The directive definition function. When passed, the app instance is returned so calls can be chained; when omitted, the currently registered directive of that name is returned instead.

### `app.use(plugin, ...options)`

Installs a plugin. The plugin is either an object with an `install()` method or a plain function, which is called with the same arguments. Any extra arguments are forwarded to it after the app instance.

- **`plugin`**: A plugin object with an `install()` method, or a function.
- **`options`**: Optional arguments forwarded to the plugin.

Installing the same plugin twice logs a development warning and is otherwise ignored.

## Instance Properties

### `app.scope`

The reactive root scope object of the application.

### `app.rootBlocks`

An array of internal `Block` instances representing the mounted application roots.

## Global Configuration

### Custom Delimiters

You can change the default mustache delimiters (<code v-pre>{{ }}</code>) by providing a `$delimiters` property in your initial data.

```js
createApp({
  $delimiters: ["[[", "]]"],
  message: "Hello"
}).mount();
```

Template usage:

```html
<div>[[ message ]]</div>
```
