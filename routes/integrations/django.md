# Django Integration Guide

Lune is an excellent companion for Django applications. It allows you to add interactivity to your templates while keeping your backend logic in Python.

## Installation

The easiest way to use Lune in Django is by adding a `<script>` tag to your base template.

```html
<!-- base.html -->
<head>
  <script src="https://cdn.jsdelivr.net/npm/lune-js" defer init></script>
</head>
```

## Data Injection

You can pass data from your Django views directly into `lu-scope` by serializing it as JSON.

### In your Django View:

```python
import json
from django.shortcuts import render

def profile_view(request):
    user_data = {
        'username': request.user.username,
        'email': request.user.email,
        'is_premium': True
    }
    return render(request, 'profile.html', {
        'user_json': json.dumps(user_data)
    })
```

### In your Django Template:

Use the `safe` filter to prevent Django from escaping the JSON string.

```html
<div lu-scope="{{ user_json|safe }}">
  <p>Username: {{ username }}</p>
  <p lu-if="is_premium">Premium User Badge</p>
</div>
```

## CSRF Token Handling

Django requires a CSRF token for any POST, PUT, or DELETE requests.

### Option 1: Reading from Meta Tag

Add the token to a meta tag in your `base.html`:

```html
<meta name="csrf-token" content="{{ csrf_token }}" />
```

Then access it in your Lune methods:

```js
function submitForm() {
  const token = document.querySelector('meta[name="csrf-token"]').content;
  fetch("/api/save/", {
    method: "POST",
    headers: {
      "X-CSRFToken": token,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(this.formData)
  });
}
```

## Practical Examples

### 1. Progressive Form Validation

Enhance your existing Django forms with real-time validation.

```html
<script type="module">
  import { createApp } from "lune-js";

  function UsernameForm() {
    return {
      username: "",
      get isValid() {
        return this.username.length >= 3;
      }
    };
  }

  createApp({ UsernameForm }).mount();
</script>

<form method="POST" lu-scope="UsernameForm()">
  {% csrf_token %}
  <input type="text" name="username" lu-model="username" />
  <p lu-show="username && !isValid" style="color: red;">Username must be at least 3 characters.</p>
  <button :disabled="!isValid">Submit</button>
</form>
```

> [!TIP]
> Derived values such as `isValid` live in a factory function: an object literal written inside
> `lu-scope` holds data only, so getters and methods go in JavaScript.

### 2. Dynamic Dependent Dropdowns

Update a second dropdown based on the selection of the first.

```html
<script type="module">
  import { createApp } from "lune-js";

  function CategoryPicker() {
    return {
      selectedCategory: "",
      categories: {
        fruits: ["Apple", "Banana"],
        veggies: ["Carrot", "Potato"]
      },
      get currentItems() {
        return this.categories[this.selectedCategory] || [];
      }
    };
  }

  createApp({ CategoryPicker }).mount();
</script>

<div lu-scope="CategoryPicker()">
  <select lu-model="selectedCategory">
    <option value="">Select Category</option>
    <option value="fruits">Fruits</option>
    <option value="veggies">Vegetables</option>
  </select>

  <select :disabled="!selectedCategory">
    <option lu-for="item in currentItems">{{ item }}</option>
  </select>
</div>
```

## Handling Template Conflicts

Since both Django and Lune use <code v-pre>{{ }}</code> for interpolation, you have two options:

### 1. Escape the braces

Wrap the Lune content in `{% verbatim %}` tags.

```html
{% verbatim %}
<div>{{ pico_vue_variable }}</div>
{% endverbatim %}
```

### 2. Change Lune delimiters

Configure Lune to use different delimiters.

```js
createApp({
  $delimiters: ["[[", "]]"]
}).mount();
```

Template:

```html
<div>[[ pico_vue_variable ]]</div>
```
