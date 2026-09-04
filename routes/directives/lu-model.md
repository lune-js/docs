# lu-model

`lu-model` is used to create a two-way data binding on form input elements. It automatically picks the right way to update the element based on the input type.

## Basic Usage: Text Inputs

For `<input type="text">`, `<textarea>`, and `<input type="email">`, `lu-model` binds to the `value` property and listens for the `input` event.

```html
<div lu-scope="{ message: '' }">
  <input lu-model="message" placeholder="Type something..." />
  <p>Message is: {{ message }}</p>

  <textarea lu-model="message" placeholder="Type more..."></textarea>
</div>
```

## Checkboxes

### Single Checkbox

Binds to the `checked` property and uses a boolean value.

```html
<div lu-scope="{ checked: true }">
  <input type="checkbox" id="checkbox" lu-model="checked" />
  <label for="checkbox">Checked: {{ checked }}</label>
</div>
```

### Multiple Checkboxes

Binds to the same array. Items are added/removed from the array based on the `value` attribute of the checkbox.

```html
<div lu-scope="{ selectedItems: [] }">
  <input type="checkbox" value="Apple" lu-model="selectedItems" />
  <input type="checkbox" value="Banana" lu-model="selectedItems" />
  <input type="checkbox" value="Cherry" lu-model="selectedItems" />

  <p>Selected: {{ selectedItems }}</p>
</div>
```

## Radio Buttons

Binds to the same property. The value will be set to the `value` attribute of the selected radio button.

```html
<div lu-scope="{ picked: '' }">
  <input type="radio" value="One" lu-model="picked" />
  <input type="radio" value="Two" lu-model="picked" />

  <p>Picked: {{ picked }}</p>
</div>
```

## Select Menus

### Single Select

Binds to the selected option's value.

```html
<div lu-scope="{ selected: '' }">
  <select lu-model="selected">
    <option disabled value="">Select one</option>
    <option>A</option>
    <option>B</option>
  </select>
  <p>Selected: {{ selected }}</p>
</div>
```

### Multiple Select

Binds to an array of selected option values.

```html
<div lu-scope="{ selected: [] }">
  <select lu-model="selected" multiple>
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>
  <p>Selected: {{ selected }}</p>
</div>
```

## Modifiers

### `.lazy`

By default, `lu-model` syncs the input on every `input` event. Use `.lazy` to sync after `change` events instead.

```html
<input lu-model.lazy="msg" />
```

### `.number`

Automatically cast the input value to a number. This is especially useful for `type="number"` or `type="range"`.

```html
<input lu-model.number="age" type="number" />
```

### `.trim`

Automatically trim any whitespace from the beginning and end of the input value.

```html
<input lu-model.trim="msg" />
```

## Dynamic Binding and Custom Values

You can bind the value of checkboxes or radio buttons to dynamic values using `lu-bind`.

```html
<div lu-scope="{ picked: '', first: 'A', second: 'B' }">
  <input type="radio" lu-model="picked" :value="first" />
  <input type="radio" lu-model="picked" :value="second" />
</div>
```

### True/False Value for Checkboxes

For checkboxes, you can customize the values used for checked and unchecked states using `:true-value` and `:false-value` bindings.

```html
<input type="checkbox" lu-model="toggle" :true-value="'yes'" :false-value="'no'" />
```

> [!NOTE]
> You must use the `:true-value` and `:false-value` binding syntax (with the `:` prefix), not plain HTML attributes.
