# Reactivity APIs

Lune's reactivity comes from `@lune-js/core`, a focused port of `@vue/reactivity` built on
[Alien Signals](https://github.com/stackblitz/alien-signals). `lune-js` re-exports it, so you never
need to install it separately: `reactive()`, `readonly()`, `shallowReactive()`, `shallowReadonly()`
and `effect()` are the primitives you build with.

## Usage

When using the CDN build, these APIs are available on the global `Lune` object.

```html
<script src="https://cdn.jsdelivr.net/npm/lune-js"></script>
<script>
  const { effect, nextTick, reactive, readonly, shallowReactive, shallowReadonly } = Lune;
</script>
```

When using the ES module build, you can import them from `lune-js`.

```js
import { effect, nextTick, reactive, readonly, shallowReactive, shallowReadonly } from "lune-js";
```

## API Reference

### `reactive(object)`

Returns a reactive proxy of the given object. This is typically used for defining the initial state of your application.

```js
const state = reactive({ count: 0 });
```

Nested objects and arrays are proxied on access, so mutations at any depth are tracked.

### `readonly(object)`

Returns a deeply read-only proxy of the given object. Writes are rejected with a development warning, which makes it a good wrapper for state you want to share but not let templates mutate.

```js
const state = reactive({ count: 0 });
const frozen = readonly(state);
```

### `shallowReactive(object)` / `shallowReadonly(object)`

The same as `reactive()` and `readonly()`, except only top-level properties are tracked. Nested objects are handed back untouched, which is useful for holding large or foreign objects (a third-party instance, a big payload) without proxying their internals.

### `effect(fn)`

Runs a function immediately while reactively tracking its dependencies and re-runs it whenever the dependencies change. It returns the effect runner, whose `.effect` handle exposes `stop()` when you need to tear the effect down manually.

```js
const state = reactive({ count: 0 });
effect(() => console.log(state.count)); // prints 0
state.count++; // prints 1
```

Effects created by directives are stopped for you when the element is removed or `app.unmount()` runs. Effects you create yourself are not tied to any element, so stop them yourself if they should not outlive the page.

### `nextTick(fn?)`

Waits for the pending DOM updates to flush. See [`$nextTick`](/guide/properties#nexttick) for the template-facing form.

## What Lune does not include

`@lune-js/core` deliberately leaves out parts of `@vue/reactivity`: there is no `ref()` family, no `computed()`, no `watch()`, and no `effectScope()`, and collections such as `Map` and `Set` are not reactive sources. Use JavaScript getters for derived values, and `effect()` where you would reach for `watch()`. If you need the full API, install [`@vue/reactivity`](https://www.npmjs.com/package/@vue/reactivity) alongside Lune.

## Best Practices

- **Use `reactive` for state objects**: This is the most common pattern for defining your application state.
- **Use getters for derived values**: Use JavaScript getters in your reactive objects for computed-like behavior:
  ```js
  const state = reactive({
    count: 0,
    get double() {
      return this.count * 2;
    }
  });
  ```
- **Use `effect` for side effects**: Use it when you need to react to state changes with side effects like logging, network requests, or DOM manipulation.
