# Security

## The Expression Engine

Template expressions are not run through the `Function` constructor. Lune tokenizes, parses and
compiles each expression into a closure tree, caches it by source text, and reuses it on every
update. Two things follow from that: Lune runs under a Content Security Policy that forbids
`unsafe-eval`, and an expression can only do what the engine implements.

### Supported Syntax

The subset covers what bindings need:

- Literals and template literals.
- Arrays and objects, including spreads.
- Member access, optional chaining, calls, and `new`.
- The arithmetic, comparison, logical, bitwise, and assignment operators, plus `typeof`, `void`,
  `in` and `instanceof`.
- Arrow functions.
- The `if`, `return` and `throw` statements, and `let`/`const`/`var` declarations.

Loops, `function` and `class` declarations, `async`/`await`, and the `delete` operator are not part
of the subset. Keep anything that needs them in a scope method, where it is ordinary JavaScript.

Arrow parameters and declarations shadow scope properties of the same name, which is worth knowing
if you are moving from a `with`-based template engine:

```html
<!-- `item` here is the arrow parameter, not a scope property named `item` -->
<span>{{ items.filter((item) => item.done).length }}</span>
```

### Identifier Resolution

An identifier is looked up in this order:

1. Local bindings introduced by the expression (arrow parameters, `let`/`const`/`var`).
2. The current scope, including everything inherited from parent scopes.
3. The `$data` and `$el` aliases.
4. The allowed globals.

Anything else raises a `ReferenceError`. The built-in allow list is the standard library plus a few
conveniences:

`Array`, `BigInt`, `Boolean`, `Date`, `Error`, `Infinity`, `Intl`, `JSON`, `Map`, `Math`, `NaN`,
`Number`, `Object`, `Promise`, `RangeError`, `RegExp`, `Set`, `String`, `Symbol`, `TypeError`,
`WeakMap`, `WeakSet`, `alert`, `confirm`, `console`, `decodeURI`, `decodeURIComponent`, `encodeURI`,
`encodeURIComponent`, `isFinite`, `isNaN`, `parseFloat`, `parseInt`, `structuredClone`.

### Always Rejected

These are refused when the expression is compiled, whatever the scope contains:

- **Identifiers**: `Function`, `WebSocket`, `Worker`, `XMLHttpRequest`, `document`, `eval`,
  `exports`, `fetch`, `global`, `globalThis`, `importScripts`, `module`, `navigator`, `process`,
  `require`, `self`, `setInterval`, `setTimeout`, `top`, `window`.
- **Property keys**: `__proto__`, `constructor` and `prototype`, whether read or written.
- **The `delete` operator.**
- **Expressions longer than 1000 characters.**

Together these close the classic routes back to dynamic code evaluation and to prototype pollution.

In development, a rejected expression produces a console warning and the binding is skipped:

```console
[Lune] WARN - Potentially unsafe expression rejected: "return(document.cookie)" "document" is not available to expressions.
```

(Single expressions are compiled as `return(…)`, which is why the wrapper shows up in the message.)

## Application Globals

Applications that reference their own globals from a template register them first:

```js
import { allowGlobals } from "lune-js";
import dayjs from "dayjs";

allowGlobals({ dayjs });
```

```html
<span lu-scope="{ date: '2026-01-01' }">{{ dayjs(date).format('MMM D') }}</span>
```

A few things to know about the registry:

- It belongs to the expression engine, not to an app: every app created from the same copy of Lune
  resolves the registered names, and there is no way to unregister one.
- Names are resolved when a binding runs, so registration works before or after `mount()`.
- The scope still wins. A scope property shadows a registered global of the same name.
- Names on the rejected list above cannot be registered — `allowGlobals({ fetch })` throws.

It is available from every build. With a plain script tag it sits on the global `Lune` object:

```html
<script src="https://cdn.jsdelivr.net/npm/lune-js" defer init></script>
<script>
  Lune.allowGlobals({ dayjs });
</script>
```

App data is the alternative: reach for `allowGlobals` when a value is shared by every region on the
page, and for `createApp({ … })` when it belongs to one app.

## What the Engine Does Not Protect Against

The engine limits what a _template_ can reach. It is not a sandbox for untrusted templates, and it
is not a substitute for sanitizing input.

- **Scope methods are ordinary JavaScript.** A method on your scope can call `fetch`, touch
  `document`, or do anything else — only the attribute expression that calls it is restricted.
- **`lu-html` still renders raw HTML.** See the [warning on that page](/directives/lu-html#security-warning-xss-risks).

## XSS Vulnerabilities

Lune evaluates JavaScript expressions in the templates. This means **if** Lune is mounted on a region of the DOM that contains non-sanitized HTML from user data, it may lead to XSS attacks.

**If your page renders user-submitted HTML, you should prefer initializing Lune using [explicit mount target](/directives/lu-scope#explicit-mount-target) so that it only processes parts that are controlled by you**.

You can also sanitize any user-submitted HTML for the `lu-scope` attribute.
