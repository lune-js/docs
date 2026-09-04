# Server Integrations

Lune is designed from the ground up for progressive enhancement. It's most powerful when used alongside server-side frameworks like Astro, Django, Laravel, Rails, or ASP.NET.

Instead of building a Single Page Application (SPA), you can keep your routing, authentication, and primary data fetching on the server and use Lune to "sprinkle" interactivity where it's needed.

## Core Integration Patterns

### 1. Initial State Injection

The most common pattern is injecting initial state directly into `lu-scope` during the server-side render.

```html
<div
  lu-scope="{
    user: {{ user_json|safe }},
    settings: {{ settings_json|safe }}
  }"
>
  <h1>Hello, {{ user.name }}</h1>
</div>
```

### 2. Handling CSRF Tokens

Any AJAX requests made from Lune must include a CSRF token.

**Option 1: Read from Meta Tag (Recommended)**

```js
const getToken = () => document.querySelector('meta[name="csrf-token"]').content;

function submit() {
  fetch("/api/save", {
    method: "POST",
    headers: {
      "X-CSRF-TOKEN": getToken(),
      "Content-Type": "application/json"
    },
    body: JSON.stringify(this.formData)
  });
}
```

### 3. Progressive Enhancement

Design your features to work without JavaScript first, then enhance them with Lune.

```html
<!-- Fully functional without JS -->
<form action="/search" method="GET" lu-scope="Search()" @submit.prevent="ajaxSearch">
  <input name="q" type="search" lu-model="query" />
  <button type="submit">Search</button>
</form>

<script type="module">
  import { createApp } from "lune-js";

  function Search() {
    return {
      query: "",
      results: [],
      ajaxSearch() {
        // If JS is enabled, this runs instead of the standard form submission
        fetch("/api/search?q=" + this.query)
          .then((res) => res.json())
          .then((results) => (this.results = results));
      }
    };
  }

  createApp({ Search }).mount();
</script>
```

> [!IMPORTANT]
> The handler has to live on the scope. A function declared in a `<script>` is not visible to a
> template expression — `fetch` is not either — so keep the request inside a scope method and let the
> template call it. See [Security](/advanced/security).

### 4. Avoiding Delimiter Conflicts

If your server-side template engine also uses <code v-pre>{{ }}</code>, you can change Lune's delimiters.

```js
createApp({
  $delimiters: ["[[", "]]"]
}).mount();
```

## Best Practices

- **Keep it Simple**: Use Lune for interactive "islands", not for the entire page structure unless necessary.
- **Server-Side Validation**: Always perform validation on the server, even if you have real-time validation on the client.
- **SEO First**: Render critical content on the server so it's accessible to search engines and users with JavaScript disabled.
- **Minimal State**: Only pass the data needed for interactivity to the client to keep page size small.
