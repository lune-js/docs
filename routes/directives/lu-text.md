# lu-text

`lu-text` updates the element's text content. It is a one-way binding from a reactive property to the DOM.

## Basic Usage

```html
<div lu-scope="{ msg: 'Hello' }">
  <span lu-text="msg"></span>
</div>
```

## Comparison with Mustache Syntax

`lu-text` is equivalent to using mustache interpolations (<code v-pre>{{ }}</code>).

```html
<span lu-text="msg"></span>
<!-- is the same as -->
<span>{{ msg }}</span>
```

### Why use `lu-text`?

While mustache syntax is generally more flexible, `lu-text` can be useful in specific cases:

1.  **Avoiding FOUC**: When using mustache syntax, the raw <code v-pre>{{ msg }}</code> may be visible for a split second before Lune initializes. Using `lu-text` on an empty element avoids this flash of uncompiled content (you can also use `lu-cloak` to solve this).
2.  **Overwriting Content**: `lu-text` will completely overwrite all children inside the target element, whereas mustache syntax allows you to combine static text and reactive data within a single element.

## Details

`lu-text` works by setting the element's `textContent` property. This means all values are treated as plain text and will not be interpreted as HTML.

Values are stringified the same way mustache interpolation stringifies them: `null` and `undefined` render as an empty string, and objects and arrays are rendered as indented JSON, which is handy while debugging a scope.

```html
<div lu-scope="{ msg: '<b>Bold</b>' }">
  <!-- Renders as: &lt;b&gt;Bold&lt;/b&gt; -->
  <span lu-text="msg"></span>
</div>
```
