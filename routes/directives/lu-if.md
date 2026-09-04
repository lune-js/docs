# lu-if

`lu-if` is used to conditionally render an element based on the truthiness of an expression.

## Basic Usage

```html
<div lu-scope="{ ok: true }">
  <p lu-if="ok">Now you see me!</p>
  <button @click="ok = !ok">Toggle</button>
</div>
```

## lu-else-if and lu-else

You can chain `lu-else-if` and `lu-else` to handle multiple conditions. These directives **must** be placed immediately after a `lu-if` or another `lu-else-if` element.

```html
<div lu-scope="{ type: 'A' }">
  <div lu-if="type === 'A'">Type is A</div>
  <div lu-else-if="type === 'B'">Type is B</div>
  <div lu-else>Other</div>

  <button @click="type = 'A'">A</button>
  <button @click="type = 'B'">B</button>
  <button @click="type = 'C'">Other</button>
</div>
```

## Conditional Blocks with `<template>`

Use a `<template>` tag if you need to wrap multiple elements without adding an extra `<div>` to the DOM.

```html
<template lu-if="ok">
  <h1>Title</h1>
  <p>Paragraph 1</p>
  <p>Paragraph 2</p>
</template>
```

## lu-if vs lu-show

While both directives conditionally control what is displayed on the screen, they behave differently:

| Directive | Behavior                                                                      | Use Case                             |
| --------- | ----------------------------------------------------------------------------- | ------------------------------------ |
| `lu-if`   | **Lazy**: Element is only created/destroyed when the condition changes.       | Condition rarely changes at runtime. |
| `lu-show` | **Always Rendered**: Element is always in the DOM, but toggles CSS `display`. | Frequent toggling.                   |

### Why use `lu-if`?

`lu-if` has lower initial render cost but higher toggle cost. Use it when you have complex sections of your page that are only needed occasionally.

## Best Practices

### 1. Expect Branch State to Reset

Switching branches tears the old block down — its effects are stopped and its directive cleanups run — and builds the new one from a fresh clone of the template. Anything held in the DOM rather than in your scope, such as a typed-in input value or a scroll position, is lost on the switch. Keep that state in the scope if it has to survive.

Unlike `lu-for`, `lu-if` does not read a `key` attribute; branches are tracked by their order in the source.

### 2. Don't Combine with `lu-for`

It's generally not recommended to use `lu-if` and `lu-for` on the same element. In Lune, `lu-if` is evaluated first, and only if it passes does the list render — which also means the condition runs in the surrounding scope and cannot see the loop variable. For performance and clarity, filter the list in your data scope before iterating.

### 3. Avoid Empty Expressions

In development mode, Lune will warn you if a `lu-if` expression is empty or invalid.
