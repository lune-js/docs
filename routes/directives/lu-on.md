# lu-on

`lu-on` is used to attach event listeners to elements. It supports both inline expressions and method calls from your scope.

## Shorthand

The `@` character is a shorthand for `lu-on`.

```html
<!-- full syntax -->
<button lu-on:click="doSomething">Click Me</button>

<!-- shorthand (preferred) -->
<button @click="doSomething">Click Me</button>
```

## Event Handlers

### Inline Handlers

You can write JavaScript expressions directly in the `@` directive.

```html
<button @click="count++">Increment: {{ count }}</button>
```

### Method Handlers

If the logic is complex, use a method on the scope. Template object literals hold data only — they
cannot declare methods — so return the method from a factory and hand the factory to the app:

```html
<script type="module">
  import { createApp } from "lune-js";

  function Greeter() {
    return {
      greet(name) {
        alert("Hello " + name);
      }
    };
  }

  createApp({ Greeter }).mount();
</script>

<div lu-scope="Greeter()">
  <button @click="greet('User')">Greet</button>
</div>
```

## Accessing the Original Event

If you need the original DOM event object in an inline handler, you can pass the special `$event` variable.

```html
<button @click="handleClick($event)">Click Me</button>
```

If using a method handler, the event is automatically passed as the first argument if no arguments are provided in the template.

```html
<!-- handleClick(event) will be called -->
<button @click="handleClick">Click Me</button>
```

## Event Modifiers

Lune provides modifiers to simplify common event handling tasks. Modifiers are postfixed with a dot.

- `.stop`: Calls `event.stopPropagation()`
- `.prevent`: Calls `event.preventDefault()`
- `.self`: Only triggers the handler if the event was dispatched from the element itself (not a child)
- `.once`: The handler will be triggered at most once
- `.capture`: Adds the listener in capture mode
- `.passive`: Adds the listener with `{ passive: true }`
- `.exact`: Only triggers if no additional system modifier keys are pressed

`.once`, `.capture`, and `.passive` are forwarded to `addEventListener` as listener options; the rest are checked when the event fires.

```html
<!-- the click event's propagation will be stopped -->
<a @click.stop="doThis"></a>

<!-- the submit event will no longer reload the page -->
<form @submit.prevent="onSubmit"></form>

<!-- modifiers can be chained -->
<a @click.stop.prevent="doThat"></a>
```

### Keyboard Modifiers

You can use any valid key name (in kebab-case) as a modifier for keyboard events.

```html
<!-- Only call `submit` when the `key` is `Enter` -->
<input @keyup.enter="submit" />

<!-- Works with other keys too -->
<input @keyup.page-down="onPageDown" />
```

### System Modifier Keys

You can restrict handlers to specific keyboard modifier keys.

- `.ctrl`
- `.shift`
- `.alt`
- `.meta`

```html
<!-- Only triggers when Ctrl+Enter is pressed -->
<input @keyup.ctrl.enter="submit" />
```

### `.exact` Modifier

The `.exact` modifier ensures the event only triggers when exactly the specified modifier keys are pressed (no additional system keys).

```html
<!-- Only triggers when Ctrl is pressed, without Shift, Alt, or Meta -->
<button @click.ctrl.exact="onCtrlClick">Ctrl + Click</button>
```

### Mouse Button Modifiers

Restrict handlers to specific mouse buttons.

- `.left`
- `.right`
- `.middle`

```html
<button @click.right="showMenu">Right click for menu</button>
```

On a `click` binding these two also swap the event being listened to: `.right` listens for `contextmenu`, and `.middle` listens for `mouseup`.

## Special Lifecycle Events

Lune emits special events when an element is mounted or unmounted. These **must** be prefixed with `lune:` — the bare `@mounted` / `@unmounted` names log a development error telling you to add the prefix.

- `@lune:mounted`: Fired when the element is mounted to the DOM.
- `@lune:unmounted`: Fired when the element is removed from the DOM.

```html
<input @lune:mounted="$el.focus()" />
```

## Limitations

### Handlers Run Through the Expression Engine

Inline handlers are compiled by Lune's [expression engine](/advanced/security), not by `new Function()`. Everyday handler code is unaffected, but `window`, `document` and `fetch` are not reachable from the attribute, and `async`/`await` and loops are not part of the supported subset. Put that logic in a scope method and call it:

```html
<!-- will not run: `fetch` is not available to expressions -->
<button @click="fetch('/api/save', { method: 'POST' })">Save</button>

<!-- call a method instead, where it is ordinary JavaScript -->
<button @click="save">Save</button>
```

### Object Syntax Not Supported

The `lu-on="eventHandlers"` object syntax (passing an object of event handlers) is **not** supported in Lune. You must use individual `@event` bindings:

```html
<!-- NOT supported -->
<button lu-on="{ click: onClick, focus: onFocus }">...</button>

<!-- Use individual bindings instead -->
<button @click="onClick" @focus="onFocus">...</button>
```
