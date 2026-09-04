# lu-bind

`lu-bind` is used to dynamically bind one or more attributes to an expression. It's one of the most fundamental directives in Lune.

## Shorthand

The `:` character is a shorthand for `lu-bind`.

```html
<!-- full syntax -->
<a lu-bind:href="url">Link</a>

<!-- shorthand (preferred) -->
<a :href="url">Link</a>
```

## Attribute Binding

You can bind any HTML attribute to a reactive value.

```html
<div lu-scope="{ title: 'Hello World', isDisabled: true }">
  <div :title="title">Hover over me</div>
  <button :disabled="isDisabled">Cannot Click Me</button>
</div>
```

### Properties vs Attributes

Lune picks between setting a DOM property and setting an attribute:

- A name the element exposes as a property is set as a property. `spellcheck`, `draggable`, `form`, `list` and `type` are excluded and always written as attributes, as are `id`, `title`, `lang` and `dir`.
- Everything else is written with `setAttribute`: names the element has no property for (`data-*`, `aria-*`, and custom attributes) and every binding on an SVG element. On this path, `null` and `undefined` remove the attribute and any other value is stringified.

### Boolean Attributes

Boolean attributes like `disabled`, `checked` and `required` are DOM properties, so they follow the DOM's own rules: a truthy value adds the attribute and a falsy one drops it.

Attributes that are _not_ properties do not work this way — they are stringified, so `:data-open="false"` renders `data-open="false"`. Bind `null` when you want such an attribute gone:

```html
<div :data-open="isOpen || null"></div>
```

## Class Binding

### Object Syntax

Pass an object to `:class` to dynamically toggle classes. The key is the class name, and the value is a boolean that determines if the class should be applied.

```html
<div :class="{ active: isActive, 'text-danger': hasError }"></div>
```

### Array Syntax

Pass an array of class names. You can also nest objects inside the array.

```html
<div :class="[activeClass, { 'is-loading': isLoading }]"></div>
```

## Style Binding

### Object Syntax

Pass an object to `:style`. You can use either camelCase (recommended) or kebab-case for the CSS property names.

```html
<div :style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
```

### Array Syntax

Pass an array of style objects to apply multiple sets of styles.

```html
<div :style="[baseStyles, themeStyles]"></div>
```

### CSS Custom Properties

You can also bind to CSS variables.

```html
<div :style="{ '--main-color': color }"></div>
```

## Modifiers

### `.camel`

The `.camel` modifier converts the attribute name to camelCase. This is primarily useful for SVG attributes like `viewBox`.

```html
<!-- Renders as viewBox="0 0 100 100" -->
<svg :view-box.camel="viewBox"></svg>
```

## Dynamic Binding of Multiple Attributes

You can bind an entire object of attributes by using `lu-bind` without an argument.

```html
<div lu-scope="{ attrObj: { id: 'container', class: 'wrapper' } }">
  <div lu-bind="attrObj"></div>
</div>
```
