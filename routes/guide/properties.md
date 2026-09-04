# Properties

Available in all directive expressions:

- **`$el`**: The current element the directive is bound to. Available in all directives (`lu-on`, `lu-bind`, `lu-effect`, etc.).
- **`$root`**: The root element of the `lu-scope` component.
- **`$refs`**: A collection of elements marked with the `ref` directive.
- **`$nextTick`**: Function to defer a callback until after the next DOM update cycle.
- **`$data`**: The current scope object itself.

Names in an expression resolve in this order: local bindings the expression introduces (arrow
parameters and `let`/`const`/`var`), then the scope, then `$data` and `$el`, and finally the globals
the engine allows. A scope property named `$el` or `$data` therefore shadows the built-in.

## $el

Represents the current element that the directive is bound to.

### Usage

`$el` is available in all directive expressions, including event handlers (`@click`), `lu-bind`, `lu-effect`, and more.

#### In Event Handlers

```html
<button @click="console.log($el)">Log Me</button>
```

#### In lu-effect

```html
<div lu-scope="{ msg: 'hello' }">
  <div lu-effect="$el.textContent = msg"></div>
</div>
```

#### Auto-focus Input

```html
<input @lune:mounted="$el.focus()" />
```

#### Integrating 3rd Party Libraries

Templates cannot reach arbitrary application globals, so put the library in the app data:

```js
import Pikaday from "pikaday";

createApp({ Pikaday }).mount();
```

```html
<div @lune:mounted="new Pikaday({ field: $el })">
  <input type="text" />
</div>
```

Or register it once with `allowGlobals()`, which makes it available to every template
(see [Security](/advanced/security#application-globals)):

```js
import { allowGlobals } from "lune-js";
import Pikaday from "pikaday";

allowGlobals({ Pikaday });
```

### Difference from standard Vue

In standard Vue, `$el` typically refers to the component's root element. In Lune, `$el` always points to the current element the directive is on.

## $nextTick

A utility to wait for the next DOM update cycle.

### Usage

```html
<div lu-scope="{ count: 0 }">
  <div ref="counter">{{ count }}</div>
  <button
    @click="
    count++;
    $nextTick(() => {
      console.log($refs.counter.textContent) // logs updated value
    })
  "
  >
    Increment
  </button>
</div>
```

### Details

When you mutate state in Lune, the DOM updates asynchronously. If you need to perform an operation that depends on the updated DOM, use `$nextTick`.

#### Async Update Queue

Lune buffers all state changes and flushes them together in the next "tick". This ensures that you don't trigger unnecessary re-renders if you change the same data multiple times.

```js
count = 1;
count = 2;
count = 3;
// DOM updates only once with 3
```

## $data

The current scope object — the same object your expressions read from. It is useful for handing the
whole scope to a function at once, or for reading a property whose name is computed.

```html
<div lu-scope="{ count: 0, key: 'count' }">
  <p>{{ $data[key] }}</p>
  <button @click="console.log($data)">Log Scope</button>
</div>
```

## $refs

An object holding DOM elements that have the `ref` attribute registered.

### Usage

```html
<div lu-scope>
  <input ref="input" />
  <button @click="$refs.input.focus()">Focus Input</button>
</div>
```

### Details

Refs are populated after the component is mounted. They are not reactive, so you should not use them in templates for data binding.

`$refs` always holds the DOM element, never a scope object. A `ref` on an element that also carries
`lu-scope` is registered both in that element's own `$refs` and in its parent's, so the surrounding
scope can reach it too.

## $root

The root element of the current component (the element with `lu-scope`). This is set automatically when `lu-scope` initializes.

### Usage

```html
<div lu-scope>
  <button @click="console.log($root)">Log Component Root</button>
</div>
```
