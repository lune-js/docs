# lu-effect

`lu-effect` is used to run a reactive side effect. This is Lune's equivalent of `effect()` but as an inline directive.

## Basic Usage

```html
<div lu-scope="{ count: 0 }">
  <div lu-effect="$el.textContent = 'Count is: ' + count"></div>
  <button @click="count++">Increment</button>
</div>
```

The expression inside `lu-effect` is executed immediately, and re-executed whenever any reactive dependencies it accesses change.

## Reactive Expressions

`lu-effect` automatically tracks any reactive state accessed within its expression. If you use a `ref` or a property from a `reactive` object, the effect will re-run whenever those values change.

```html
<div lu-scope="{ a: 1, b: 1 }">
  <p lu-effect="console.log('Sum is:', a + b)">Sum of {{ a }} + {{ b }} is computed in the console.</p>
  <button @click="a++">Change A</button>
  <button @click="b++">Change B</button>
</div>
```

## JavaScript Expressions Support

`lu-effect` accepts several statements, including conditionals, function calls, template literals, and `let`/`const` declarations. It is compiled by Lune's [expression engine](/advanced/security), so loops, `function` and `class` declarations, and `async`/`await` are not available, and browser globals such as `document` or `localStorage` have to be registered with `allowGlobals()` or reached from a scope method.

```html
<div lu-scope="{ show: true, msg: 'Hello' }">
  <div lu-effect="show ? $el.textContent = msg : $el.textContent = 'Hidden'"></div>
</div>
```

### Accessing DOM Elements

`lu-effect` has access to special variables:

- **`$el`**: The current element the directive is on. Also available in other directives (`lu-on`, `lu-bind`, etc.).

```html
<!-- $el: access the current element -->
<input lu-effect="if (shouldFocus) $el.focus()" />
```

## Edge Cases and Limitations

### 1. Deferred Setup, Synchronous Re-runs

The effect is registered on the next tick, after the surrounding template has been walked, so it sees a fully initialized scope on its first run. From then on it re-runs synchronously whenever a dependency changes. Avoid placing heavy computations directly in the template; for complex logic, call a method in your scope.

### 2. Infinite Loops

Be careful not to modify the same reactive state that the effect depends on, as this can trigger an infinite loop.

```html
<!-- BAD: This will cause an infinite loop -->
<div lu-effect="count++"></div>
```

### 3. Cleanup

Unlike `effect`, `lu-effect` in Lune doesn't provide an explicit `onCleanup` callback. However, all effects are automatically stopped when the element is removed from the DOM (e.g., via `lu-if`).

### 4. Direct DOM Mutation

While you can use `lu-effect` to mutate the DOM directly (like setting `innerHTML` or `className`), it's generally better to use built-in directives like `lu-html` or `:class` for these purposes whenever possible. Use `lu-effect` for things that don't have a dedicated directive.
