# lu-cloak

Used to hide un-compiled templates until the component instance is ready.

## Usage

```css
[lu-cloak] {
  display: none !important;
}
```

```html
<div lu-cloak>{{ message }}</div>
```

> [!TIP]
> Adding `!important` ensures the rule isn't overridden by other styles.

## Details

This directive is only needed in no-build-step setups. When using Lune directly in the browser, there might be a brief moment where the raw template (e.g. <code v-pre>{{ message }}</code>) is visible before Lune compiles it.

`lu-cloak` will remain on the element until the associated component instance finishes compilation. Combined with CSS rules such as `[lu-cloak] { display: none }`, this directive can be used to hide un-compiled bindings until the component instance is ready.
