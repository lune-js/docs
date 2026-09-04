# Vue Compatibility

Lune uses Vue-style template syntax and a port of Vue's reactivity package, but it is not the full Vue runtime. Use this page to check which Vue features are supported, partially supported, or intentionally omitted.

## Supported

| Feature                                               | Notes                                                                                          |
| ----------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| Interpolation                                         | Text interpolation with <code v-pre>{{ }}</code> or custom delimiters.                         |
| `lu-scope`                                            | Creates a reactive scope for an element.                                                       |
| `lu-if`, `lu-else-if`, `lu-else`                      | Conditional rendering.                                                                         |
| `lu-for`                                              | Arrays, objects, numbers, and basic destructuring.                                             |
| `lu-model`                                            | Text inputs, textareas, checkboxes, radios, and selects.                                       |
| `lu-bind` / `:`                                       | Attribute, class, style, object, and `:ref` bindings.                                          |
| `lu-on` / `@`                                         | DOM event listeners, common modifiers, key modifiers, and `@lune:mounted` / `@lune:unmounted`. |
| `lu-show`                                             | Toggles inline `display`.                                                                      |
| `lu-text`, `lu-html`, `lu-cloak`, `lu-pre`, `lu-once` | Supported as lightweight directives.                                                           |
| `ref`                                                 | Stores DOM elements on `$refs`.                                                                |
| `reactive()`                                          | Re-exported from `@lune-js/core`, a port of `@vue/reactivity` built on Alien Signals.          |
| `effect()`                                            | Re-exported from `@lune-js/core`; returns the effect runner.                                   |

## Different from full Vue

| Area               | Lune behavior                                                                                                                                                                                                                                                                                                 |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Components         | Components are plain functions or objects returned from `lu-scope`; there are no SFCs, render functions, props validation, emits, slots, or `setup()`.                                                                                                                                                        |
| Refs               | `ref` stores DOM elements, including elements that also have `lu-scope`. It does not return a Vue component instance.                                                                                                                                                                                         |
| Reactivity exports | `reactive()`, `readonly()`, `shallowReactive()`, `shallowReadonly()`, `effect()` and `nextTick()` are exported from `lune-js`. There is no `ref()`, `computed()`, `watch()` or `effectScope()` — use getters for derived values and `effect()` for side effects, or install `@vue/reactivity` alongside Lune. |
| Event listeners    | `@event` listeners are attached to DOM elements. `app.unmount()` stops reactive effects and directive cleanup callbacks, but native event listeners remain attached until the DOM elements are removed or the browser releases them.                                                                          |
| Expressions        | Template expressions are parsed and compiled by Lune's own engine rather than `new Function()`, so Lune runs under a Content Security Policy without `unsafe-eval`. The engine implements a subset of JavaScript and resolves identifiers against an allow list — see [Security](/advanced/security).         |
| Mounting           | `app.mount(selector)` returns `undefined` if the selector does not match an element.                                                                                                                                                                                                                          |

## Unsupported Vue syntax

| Vue feature                                                   | What to use instead                                                                         |
| ------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| Single-file components (`.vue`)                               | Plain HTML plus `lu-scope` objects/functions.                                               |
| `createApp(Component)` root components                        | `createApp(initialData).mount(target)`.                                                     |
| `setup()`, `data()`, `methods`, `computed` options            | Return or pass a plain object with fields, methods, and JavaScript getters.                 |
| `props`, `emits`, `provide` / `inject`                        | Pass values through functions, parent scopes, or shared reactive stores.                    |
| Slots and scoped slots                                        | Use normal HTML/template fragments and `lu-scope` functions.                                |
| Transitions                                                   | Use CSS and lifecycle events manually.                                                      |
| `lu-on="object"`                                              | Use individual event bindings like `@click="onClick"`.                                      |
| Full Vue app config/plugins                                   | Lune plugins only receive the app instance and can register directives or mutate app state. |
| Loops, `function`/`class`, `async`/`await` inside expressions | Keep that logic in a scope method, where it is ordinary JavaScript.                         |
| Browser globals inside expressions                            | Register what the template needs with `allowGlobals()`, or pass it through the scope.       |

## When to choose full Vue instead

Use full Vue if you need SFCs, router-driven SPA behavior, rich component contracts, SSR hydration, or the full Composition API from the `vue` package.
