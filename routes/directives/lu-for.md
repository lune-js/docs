# lu-for

`lu-for` is used to render a list of elements by iterating over an array or an object.

## Basic Usage

```html
<div lu-scope="{ items: ['Apple', 'Banana', 'Cherry'] }">
  <ul>
    <li lu-for="item in items">{{ item }}</li>
  </ul>
</div>
```

## Array Iteration

### Accessing Index

You can access the current index by using the `(item, index)` syntax.

```html
<div lu-for="(item, index) in items">{{ index + 1 }}. {{ item }}</div>
```

### Array of Objects

Iteration works seamlessly with arrays of objects.

```html
<div lu-for="user in users">
  <p>{{ user.name }} ({{ user.email }})</p>
</div>
```

## Object Iteration

`lu-for` can also be used to iterate over the properties of an object. The order of iteration is consistent with `Object.keys()`.

```html
<div lu-scope="{ myObject: { title: 'Guide', author: 'Jane', year: 2025 } }">
  <div lu-for="(value, key, index) in myObject">{{ index }}. {{ key }}: {{ value }}</div>
</div>
```

## Iterating Over a Range

You can also use an integer with `lu-for`. The count starts at `1`.

```html
<span lu-for="n in 10">{{ n }} </span>
```

## Destructuring

Objects and arrays can be destructured in the alias position, one level deep.

```html
<div lu-scope="{ users: [{ id: 1, name: 'Rush' }] }">
  <p lu-for="{ id, name } in users" :key="id">{{ id }}: {{ name }}</p>
</div>
```

## Nested Loops

`lu-for` can be nested to iterate over multi-dimensional data structures.

```html
<div lu-for="category in categories">
  <h3>{{ category.name }}</h3>
  <ul>
    <li lu-for="item in category.items">{{ item.name }}</li>
  </ul>
</div>
```

## Using `lu-for` with `<template>`

Use a `<template>` tag if you need to repeat a block of multiple elements.

```html
<ul>
  <template lu-for="item in items">
    <li class="item">{{ item.text }}</li>
    <li class="divider" role="presentation"></li>
  </template>
</ul>
```

## Importance of `:key`

It is highly recommended to provide a unique `key` attribute for each item using `:key`. This allows Lune to efficiently track and reuse elements when the list changes.

```html
<div lu-for="item in items" :key="item.id">{{ item.text }}</div>
```

### How Key-Based Diffing Works

When you provide `:key`, Lune uses a key-based diffing algorithm to efficiently update the list:

1. **Reuse**: Existing DOM elements with matching keys are reused (their scope data is updated in-place) instead of being destroyed and recreated.
2. **Reorder**: Elements are moved in the DOM to match the new order, rather than being patched in-place.
3. **Add/Remove**: New elements are created for new keys, and old elements without matching keys are removed.

This is especially important for:

- Lists that can be reordered, filtered, or sorted
- Stateful elements like input fields inside list items
- Animations and transitions

Without a unique key, Lune will use index-based matching which can lead to unexpected behavior with stateful elements.

## Limitations

- **Deep Destructuring**: Lune supports a single level of destructuring — `lu-for="[id, name] in pairs"` and `lu-for="{ id, name } in users"` both work — but not nested patterns, renaming, or defaults.
- **`lu-for` with `lu-if`**: On the same element `lu-if` wins: it is evaluated once in the surrounding scope, and the list only renders if it passes. That means the condition cannot reference the loop variable. Filter the list in your scope instead, or move one of the two directives onto a wrapper.
