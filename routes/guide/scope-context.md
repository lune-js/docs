# Scope and Context

Lune uses a hierarchical scope system similar to JavaScript's lexical scoping. This allows components to inherit and share data efficiently.

## Scope Inheritance

When you nest `lu-scope` directives, a new child scope is created that inherits from the parent scope via JavaScript's prototype chain. This means child scopes can read parent properties, but writing to a property will check the current scope first.

<div lu-pre>

```html
<div lu-scope="{ outer: 'hello' }">
  <p>Outer: {{ outer }}</p>

  <div lu-scope="{ inner: 'world' }">
    <!-- Child scope can access parent properties -->
    <p>Inner: {{ outer }} {{ inner }}</p>
  </div>
</div>
```

</div>

### Property Overriding

If a child scope defines a property with the same name as a parent property, it will "shadow" the parent property.

<div lu-pre>

```html
<div lu-scope="{ name: 'Parent' }">
  <div lu-scope="{ name: 'Child' }">
    <p>{{ name }}</p>
    <!-- Displays 'Child' -->
  </div>
</div>
```

</div>

### Updating Parent State

When you assign a value to a property in a template, Lune will first check if the property exists on the current scope. If it doesn't, it will walk up the scope chain (prototype chain) and update the property on the first parent scope where it finds it.

<div lu-pre>

```html
<div lu-scope="{ count: 0 }">
  <p>{{ count }}</p>
  <div lu-scope="{ localMsg: 'hi' }">
    <!-- Modifies parent's count since 'count' is not on this scope -->
    <button @click="count++">Increment Parent Count</button>
    <p>{{ localMsg }} - {{ count }}</p>
  </div>
</div>
```

</div>

## Implicit Data Sharing (Scope Inheritance)

Since Lune uses prototype-based scope inheritance, any property defined in a parent scope is automatically accessible in all descendant scopes — no special API is needed.

```html
<div lu-scope="{ theme: 'dark' }">
  <p>Theme: {{ theme }}</p>

  <div lu-scope="{ title: 'Hello' }">
    <!-- Both 'theme' and 'title' are accessible here -->
    <p>{{ title }} ({{ theme }})</p>
  </div>
</div>
```

For sharing state across multiple independent apps or distant components, see the [Global State](/advanced/global-state) guide using the `reactive()` function.
