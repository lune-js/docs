# Custom Delimiters

You can use custom delimiters by passing `$delimiters` to your root scope. This is useful when working alongside a server-side templating language that also uses mustaches (like Laravel Blade, Django, or Flask).

## Usage

```js
createApp({
  $delimiters: ["${", "}"]
}).mount();
```

## In Template

```html
<div lu-scope="{ msg: 'hello' }">${ msg }</div>
```
