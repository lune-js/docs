# ref

Register a reference to an element or a component.

## Usage

```html
<div lu-scope>
  <input ref="input" />
  <button @click="$refs.input.focus()">Focus Input</button>
</div>
```

## Details

The `ref` attribute allows you to register a direct reference to a specific DOM element or child component instance. The reference will be accessible under the `$refs` object of the current scope.

Refs are populated after the component is mounted. They are not reactive, so you should not use them in templates for data binding.

## Refs Are Always Elements

`$refs` entries are DOM elements, never scope objects — Lune has no component instances to hand back. A `ref` on an element that also carries `lu-scope` is registered in both that element's own `$refs` and its parent's, so an outer scope can reach the element:

```html
<div lu-scope>
  <div lu-scope="{ count: 0 }" ref="counter">{{ count }}</div>

  <!-- $refs.counter is the <div>, so DOM APIs work -->
  <button @click="$refs.counter.scrollIntoView()">Scroll To Counter</button>
</div>
```

To call into a child's logic, share state instead of reaching for the element — put the value or method on a parent scope, or on a [store](/advanced/state-management) both scopes read.

## Dynamic Names

The `ref` value is an expression, so a name can be computed. When it changes, the old key is removed from `$refs` and the new one registered; when the element is unmounted, its key is removed.

```html
<div lu-scope="{ id: 1 }">
  <input :ref="'field-' + id" />
</div>
```
