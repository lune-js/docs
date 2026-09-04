# State Management

As your application grows, you may need to share state between multiple components or persist state across page reloads. Lune provides a simple and effective way to manage global state using the `reactive` function.

## The Store Pattern

The simplest way to manage global state is to create a reactive object and share it between your components. This is often called the "Store Pattern".

### 1. Create a Store

Create a JavaScript file (e.g., `store.js`) to hold your global state.

```js
import { reactive } from "lune-js";

export const store = reactive({
  count: 0,
  user: null,

  increment() {
    this.count++;
  },

  setUser(user) {
    this.user = user;
  }
});
```

### 2. Use the Store in Components

You can now import this store and use it in your components.

```html
<script type="module">
  import { createApp } from "lune-js";
  import { store } from "./store.js";

  createApp({
    store
  }).mount();
</script>

<div lu-scope>
  <p>Count: {{ store.count }}</p>
  <button @click="store.increment()">Increment</button>
</div>

<div lu-scope>
  <p>Same Count: {{ store.count }}</p>
</div>
```

Because `store` is reactive, any change to `store.count` will automatically update all components that use it.

## Global State with `Lune.reactive`

If you are using the CDN build without ES modules, you can still achieve this pattern.

```html
<script src="https://cdn.jsdelivr.net/npm/lune-js"></script>

<script>
  const store = Lune.reactive({
    count: 0,
    increment() {
      this.count++;
    }
  });

  Lune.createApp({
    store
  }).mount();
</script>

<div lu-scope>
  {{ store.count }}
  <button @click="store.increment()">+</button>
</div>
```

## Persisting State

To persist state across page reloads (e.g., for a dark mode preference), you can use `localStorage` combined with `lu-effect` or `effect`.

### Using `lu-effect`

Template expressions cannot reach `localStorage` or `document` (see [Security](/advanced/security)),
so keep the persistence in a store method and let `lu-effect` call it. The method reads `darkMode`,
which is what makes the effect re-run when it changes.

```html
<script src="https://cdn.jsdelivr.net/npm/lune-js"></script>

<script>
  const store = Lune.reactive({
    darkMode: localStorage.getItem("darkMode") === "true",
    toggleTheme() {
      this.darkMode = !this.darkMode;
    },
    persist() {
      localStorage.setItem("darkMode", this.darkMode);
      document.body.classList.toggle("dark", this.darkMode);
    }
  });

  Lune.createApp({ store }).mount();
</script>

<div lu-scope lu-effect="store.persist()">
  <button @click="store.toggleTheme()">{{ store.darkMode ? 'Dark' : 'Light' }} Mode</button>
</div>
```

### Using `effect`

```html
<script type="module">
  import { createApp, reactive, effect } from "lune-js";

  const store = reactive({
    darkMode: localStorage.getItem("darkMode") === "true",
    toggleTheme() {
      this.darkMode = !this.darkMode;
    }
  });

  // React to darkMode changes and persist
  effect(() => {
    localStorage.setItem("darkMode", store.darkMode);
    document.body.classList.toggle("dark", store.darkMode);
  });

  createApp({ store }).mount();
</script>

<div lu-scope>
  <button @click="store.toggleTheme()">{{ store.darkMode ? 'Dark' : 'Light' }} Mode</button>
</div>
```

> [!TIP]
> `effect` runs immediately; `lu-effect` runs once the surrounding template has been walked. Both then
> re-run whenever a reactive dependency changes, which makes them a good fit for side effects like
> saving to `localStorage`.
