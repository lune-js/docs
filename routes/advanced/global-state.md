# Global State Management

You can use the `reactive` method (re-exported from `@lune-js/core`) to create global state singletons.

## Creating Global State

```js
import { createApp, reactive } from "lune-js";

const store = reactive({
  count: 0,
  inc() {
    this.count++;
  }
});

// manipulate it here
store.inc();

createApp({
  // share it with app scopes
  store
}).mount();
```

## Using in Components

```html
<div lu-scope="{ localCount: 0 }">
  <p>Global {{ store.count }}</p>
  <button @click="store.inc">increment</button>

  <p>Local {{ localCount }}</p>
  <button @click="localCount++">increment</button>
</div>
```

## effect

Use `effect` to re-run a function every time its dependencies change.

```js
import { effect, reactive } from "lune-js";

const store = reactive({
  count: 0
});

effect(() => {
  console.log(store.count);
});

store.count++; // logs 1
```

## Sharing State Between Apps

Since the state is just a JavaScript object, you can share it between multiple `createApp` instances on the same page.

```js
const store = reactive({ count: 0 });

createApp({ store }).mount("#app1");
createApp({ store }).mount("#app2");
```

Now, updating `store.count` in `#app1` will automatically update `#app2`.
