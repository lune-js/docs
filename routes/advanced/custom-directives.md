# Custom Directives

You can register custom directives using the `.directive()` method.

## Interface

A directive is a function that receives a context object:

```js
const myDirective = (ctx) => {
  // the element the directive is on
  ctx.el;
  // the raw value expression
  // e.g. lu-my-dir="x" then this would be "x"
  ctx.exp;
  // lu-my-dir:foo -> "foo"
  ctx.arg;
  // lu-my-dir.mod -> { mod: true }
  ctx.modifiers;
  // evaluate the expression and get its value
  ctx.get();
  // evaluate arbitrary expression in current scope
  ctx.get(`${ctx.exp} + 10`);

  // run reactive effect
  ctx.effect(() => {
    // this will re-run every time the get() value changes
    console.log(ctx.get());
  });

  return () => {
    // cleanup if the element is unmounted
  };
};

// register the directive
createApp().directive("my-dir", myDirective).mount();
```

## Example: lu-html implementation

Here is how the built-in `lu-html` is implemented:

```js
const html = ({ el, get, effect }) => {
  effect(() => {
    el.innerHTML = get();
  });
};
```

## Example: lu-focus

```js
const focus = ({ el }) => {
  el.focus();
};

createApp().directive("focus", focus).mount();
```

```html
<input lu-focus />
```
