# Laravel Integration Guide

Lune is an excellent alternative or companion to Livewire or Alpine.js in Laravel applications. It provides the same reactive benefits without the server-side overhead of Livewire.

## Installation

Add Lune to your `app.blade.php` layout.

```html
<!-- resources/views/layouts/app.blade.php -->
<head>
  <script src="https://cdn.jsdelivr.net/npm/lune-js" defer init></script>
</head>
```

## Data Injection

Laravel provides the `Js::from()` directive to safely serialize data into your Blade templates.

### In your Blade View:

```blade
<div lu-scope="{
  user: {{ Js::from($user) }},
  notifications: {{ Js::from($notifications) }}
}">
  <h1>Welcome, @{{ user.name }}</h1>
</div>
```

> [!TIP]
> Use the `@` prefix to escape Blade's mustache syntax (`@{{ }}`) so that Lune can process it on the client.

## CSRF Token Handling

Laravel automatically includes a CSRF token. Lune can read this for all AJAX requests.

### Option 1: Meta Tag Extraction

```js
function postData() {
  const token = document.querySelector('meta[name="csrf-token"]').content;
  fetch("/api/v1/posts", {
    method: "POST",
    headers: {
      "X-CSRF-TOKEN": token,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(this.postData)
  });
}
```

## Practical Examples

### 1. Livewire-like Table Search

Build a fast, client-side table search without an extra round-trip to the server.

```blade
<div lu-scope="{ query: '', posts: {{ Js::from($posts) }} }">
  <input lu-model="query" placeholder="Search posts...">

  <table>
    <tr lu-for="post in posts" lu-show="post.title.toLowerCase().includes(query.toLowerCase())">
      <td>@{{ post.title }}</td>
    </tr>
  </table>
</div>
```

### 2. Real-time Notifications

Easily manage a list of notifications from a WebSocket (like Laravel Echo).

```html
<!-- Echo implementation example -->
<div lu-scope @lune:mounted="setupEcho()">
  <ul>
    <li lu-for="message in notifications">{{ message }}</li>
  </ul>
</div>

<script type="module">
  import { createApp } from "lune-js";

  createApp({
    notifications: [],
    setupEcho() {
      Echo.channel("notifications").listen("NewNotification", (e) => {
        this.notifications.push(e.message);
      });
    }
  }).mount();
</script>
```

> [!NOTE]
> `notifications` lives on the root scope here, and `lu-scope` is left empty so the region inherits it.
> Declaring `lu-scope="{ notifications: [] }"` would shadow it with a second, empty array — the method
> would keep pushing into the root one while the template rendered the local one.

## Comparison with Alpine.js

Laravel developers often use Alpine.js. Here is how Lune compares:

| Feature            | Lune.js                            | Alpine.js                |
| ------------------ | ---------------------------------- | ------------------------ |
| **Syntax**         | Vue-compatible (`lu-if`, `lu-for`) | Custom (`x-if`, `x-for`) |
| **Reactivity**     | Full Vue reactivity                | Internal reactive engine |
| **Directives**     | ~16 directives                     | ~15 directives           |
| **Learning Curve** | Low (if you know Vue)              | Low                      |

## Blade Conflicts

If you find yourself constantly escaping mustaches with `@{{ }}`, you can change Lune's delimiters.

```js
createApp({
  $delimiters: ["[[", "]]"]
}).mount();
```

Blade template:

```html
<p>[[ message ]]</p>
```
