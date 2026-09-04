# lu-html

`lu-html` is used to update an element's `innerHTML`.

## Basic Usage

```html
<div lu-scope="{ rawHtml: '<h1>Header</h1>' }">
  <div lu-html="rawHtml"></div>
</div>
```

## Security Warning: XSS Risks

> [!WARNING] SECURITY RISK
> Dynamically rendering arbitrary HTML on your website is **extremely dangerous** and is a primary cause of [Cross-Site Scripting (XSS)](https://owasp.org/www-community/attacks/xss/) vulnerabilities.

### Important Rules:

1.  **NEVER** use `lu-html` on content provided by users (e.g., from an input field or a public API).
2.  **ONLY** use `lu-html` on trusted content from your own backend that has been properly sanitized.
3.  **Prefer `lu-text`** or mustache syntax whenever possible. Only use `lu-html` if you specifically need to render HTML formatting.

## Use Cases

`lu-html` is typically used for rendering content from a CMS or a Markdown parser where the HTML structure is already determined and trusted.

```html
<div lu-scope="{ postContent: '<p>This is my post <em>body</em></p>' }">
  <article lu-html="postContent"></article>
</div>
```

## Behavior

`lu-html` works by setting the element's `innerHTML` property. This means all existing children in the element will be completely overwritten.

### Integration with Other Directives

Directives and interpolations inside the HTML string provided to `lu-html` will **not** be compiled by Lune. If you need a reusable chunk of template that _is_ compiled, give the scope a [`$template`](/advanced/#components-with-template) key pointing at a `<template>` element, or render the markup on the server.
