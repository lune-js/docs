# lu-scope

`lu-scope` is the primary directive in Lune. It marks a region of the DOM that should be controlled by Lune.

## Usage

### Inline Scope

You can pass a JavaScript object directly to `lu-scope` to define the initial state:

```html
<div lu-scope="{ count: 0 }">{{ count }}</div>
```

> [!TIP]
> The expression inside `lu-scope` is evaluated once when the component is initialized. It should return an object.

### Server-Side Data Injection

One of the most powerful features of `lu-scope` is initializing it with data from your backend.

```html
<!-- In your server template (e.g., Blade, EJS, Jinja2) -->
<div
  lu-scope="{
  user: { id: 1, name: 'Rush' },
  settings: {{ json_encode($settings) }}
}"
>
  <p>Welcome, {{ user.name }}</p>
</div>
```

This allows you to pass initial state directly from your database without making an extra API call.

### Explicit Mount Target

If you don't use the `init` attribute on the script tag, you can manually mount Lune to specific elements. In this case, `lu-scope` serves as a marker.

```html
<div id="app" lu-scope>{{ count }}</div>

<script>
  Lune.createApp({ count: 0 }).mount("#app");
</script>
```

### Multiple Roots

A page can carry as many `lu-scope` regions as you like. Each one gets its own scope, and sibling regions are independent of each other:

```html
<div lu-scope="{ count: 1 }">Region 1: {{ count }}</div>

<div lu-scope="{ count: 2 }">Region 2: {{ count }}</div>
```

When Lune auto-mounts (or you call `mount()` without a target), every top-level `lu-scope` on the page becomes a root of the _same_ app instance — nested `lu-scope` elements are left to their parent region. Call `createApp()` more than once only when you want separately mounted apps, each with its own root data and directives.

## Scope Inheritance

Nested `lu-scope` regions create nested scopes. Child scopes can access properties from parent scopes, but writing to a property will check the current scope first.

```html
<div lu-scope="{ outer: 'outer' }">
  <p>{{ outer }}</p>

  <div lu-scope="{ inner: 'inner' }">
    <p>{{ outer }} - {{ inner }}</p>
  </div>
</div>
```

## Best Practices

### Function Factories

For anything more complex than a simple counter, it is recommended to use a function to return the initial state. This keeps your template clean and allows for reusable logic.

The factory has to be reachable from the expression, and a function declared in a `<script>` is not:
expressions see the scope and an allow list of globals, nothing else. Hand it to the app as data:

```html
<script type="module">
  import { createApp } from "lune-js";

  function Counter(initial = 0) {
    return {
      count: initial,
      inc() {
        this.count++;
      },
      dec() {
        this.count--;
      }
    };
  }

  createApp({ Counter }).mount();
</script>

<div lu-scope="Counter(10)">
  <button @click="dec">-</button>
  <span>{{ count }}</span>
  <button @click="inc">+</button>
</div>
```

`allowGlobals({ Counter })` is the alternative when a factory is shared by several apps. See
[Security](/advanced/security#application-globals).

### Grouping Components

Passing one namespace object keeps the root data tidy when a page has several components:

```html
<script type="module">
  import { createApp } from "lune-js";

  const App = {
    Counter() { ... },
    Todo() { ... }
  };

  createApp({ App }).mount();
</script>

<div lu-scope="App.Counter()">...</div>
```
