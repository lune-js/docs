# Directive Overview

This page provides a quick overview for all built-in directives available in Lune.

| Directive                              | Syntax                                    | Description                                            |
| -------------------------------------- | ----------------------------------------- | ------------------------------------------------------ |
| [**lu-scope**](/directives/lu-scope)   | `lu-scope="{ count: 0 }"`                 | Marks an element as a component and defines its scope. |
| [**lu-if**](/directives/lu-if)         | `lu-if="ok"`, `lu-else-if`, `lu-else`     | Conditionally render elements.                         |
| [**lu-show**](/directives/lu-show)     | `lu-show="ok"`                            | Toggles visibility using CSS `display`.                |
| [**lu-for**](/directives/lu-for)       | `lu-for="item in items"`                  | Iterate over arrays or objects.                        |
| [**lu-model**](/directives/lu-model)   | `lu-model="msg"`                          | Two-way data binding on form inputs.                   |
| [**lu-on**](/directives/lu-on)         | `@click="doThis"`, `lu-on:submit.prevent` | Attach event listeners.                                |
| [**lu-bind**](/directives/lu-bind)     | `:src="imageSrc"`, `lu-bind:class`        | Reactive attribute binding.                            |
| [**lu-effect**](/directives/lu-effect) | `lu-effect="console.log(count)"`          | Run reactive side effects.                             |
| [**lu-text**](/directives/lu-text)     | `lu-text="msg"`                           | Update element text content.                           |
| [**lu-html**](/directives/lu-html)     | `lu-html="rawHtml"`                       | Update element `innerHTML`.                            |
| [**lu-cloak**](/directives/lu-cloak)   | `lu-cloak`                                | Hides uncompiled templates until ready.                |
| [**lu-pre**](/directives/lu-pre)       | `lu-pre`                                  | Skip compilation for this element.                     |
| [**lu-once**](/directives/lu-once)     | `lu-once`                                 | Render once and skip future updates.                   |
| [**ref**](/directives/ref)             | `ref="myDiv"`                             | Register a reference to an element.                    |
