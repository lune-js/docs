# Plugins

Plugins are self-contained code that usually add global-level functionality to Lune.

## Using a Plugin

```js
import { createApp } from "lune-js";
import myPlugin from "./my-plugin";

createApp().use(myPlugin, {/* options */}).mount();
```

## Writing a Plugin

A plugin is an object with an `install` method:

```js
export default {
  install: (app, options) => {
    // add a global directive
    app.directive("my-directive", (ctx) => {
      // ...
    });
  }
};
```

A plain function works too, and is called with the same arguments:

```js
export default function myPlugin(app, options) {
  app.directive("my-directive", (ctx) => {
    // ...
  });
}
```

Anything else — or a plugin passed twice to the same app — logs a development warning and is
ignored. Since `install` receives the app instance, a plugin can register directives, read or extend
`app.scope`, and mount the app itself.

## Example

```html
<div lu-scope="{counter: 0}" lu-log="inside lune-js scope">
  <button @click="counter++">increase</button>
</div>

<script type="module">
  import log from "./log.js";
  import { createApp } from "lune-js";
  createApp().use(log).mount();
</script>
```

```js
// log.js
export default {
  install: (app, options) => {
    app.directive("log", ({ exp }) => {
      console.log(exp);
    });
  }
};
```
