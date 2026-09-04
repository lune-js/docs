# lu-pre

Skip compilation for this element and all its children.

## Usage

```html
<span lu-pre>{{ this will not be compiled }}</span>
```

## Details

Inside the element with `lu-pre`, all Lune syntax (mustache tags, directives) will be ignored and rendered as-is. This is useful for displaying raw mustache tags.
