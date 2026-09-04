# ASP.NET Core Integration Guide

Lune is an excellent choice for ASP.NET developers who want a lightweight way to add interactivity to their Razor views or pages without using a full-blown SPA.

## Installation

Add Lune to your `_Layout.cshtml` file.

```html
<!-- Views/Shared/_Layout.cshtml -->
<head>
  <script src="https://cdn.jsdelivr.net/npm/lune-js" defer init></script>
</head>
```

## Data Injection

Serializing C# objects to JSON and injecting them into your Razor views is simple using `JsonSerializer`.

### In your Controller:

```csharp
public IActionResult Profile()
{
    var userData = new {
        Username = User.Identity.Name,
        IsPremium = true,
        LastLogin = DateTime.Now
    };
    ViewBag.UserJson = System.Text.Json.JsonSerializer.Serialize(userData);
    return View();
}
```

### In your Razor View:

Use `@Html.Raw()` to output the JSON string directly into `lu-scope`.

```html
<div lu-scope="@Html.Raw(ViewBag.UserJson)">
  <p>Welcome, {{ Username }}</p>
  <p lu-if="IsPremium">You are a premium member!</p>
</div>
```

## Antiforgery Tokens (CSRF)

ASP.NET Core requires an antiforgery token for POST/PUT/DELETE requests.

### Option 1: Reading from Meta Tag

Add a meta tag with the antiforgery token to your `_Layout.cshtml`:

```html
<meta name="X-XSRF-TOKEN" content="@Html.AntiForgeryToken()" />
```

Then access it in your Lune methods:

```js
function saveData() {
  const token = document.querySelector('meta[name="X-XSRF-TOKEN"]').content;
  fetch("/api/save/", {
    method: "POST",
    headers: {
      RequestVerificationToken: token,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(this.formData)
  });
}
```

## Practical Examples

### 1. Progressive Form Validation

Enhance your ASP.NET forms with real-time validation.

```html
<script type="module">
  import { createApp } from "lune-js";

  function UsernameForm() {
    return {
      username: "",
      get isValid() {
        return this.username.length >= 5;
      }
    };
  }

  createApp({ UsernameForm }).mount();
</script>

<form method="post" lu-scope="UsernameForm()">
  @Html.AntiForgeryToken()
  <input type="text" name="Username" lu-model="username" />
  <span lu-show="username && !isValid" class="text-danger"> Username must be at least 5 characters. </span>
  <button :disabled="!isValid" type="submit">Submit</button>
</form>
```

> [!TIP]
> Derived values such as `isValid` live in a factory function: an object literal written inside
> `lu-scope` holds data only, so getters and methods go in JavaScript.

### 2. Dynamic Table Row Addition

Easily manage dynamic form sections where users can add or remove items.

```html
<div
  lu-scope="{
  items: [{ description: '', amount: 0 }]
}"
>
  <table class="table">
    <tr lu-for="(item, index) in items">
      <td><input type="text" :name="'Items[' + index + '].Description'" lu-model="item.description" /></td>
      <td><input type="number" :name="'Items[' + index + '].Amount'" lu-model="item.amount" /></td>
      <td><button type="button" @click="items.splice(index, 1)">Remove</button></td>
    </tr>
  </table>
  <button type="button" @click="items.push({ description: '', amount: 0 })">Add Row</button>
</div>
```

## Handling Razor Conflicts

Razor uses the `@` symbol, which Lune also uses for its event shorthand (`@click`).

### Escaping `@`

You can escape the `@` symbol in your Razor views by using `@@`.

```html
<button @@click="increment">+</button>
```

## Changing Lune Delimiters

If you'd like to use different delimiters to avoid confusion with Razor:

```js
createApp({
  $delimiters: ["[[", "]]"]
}).mount();
```

Razor View:

```html
<p>[[ my_data_from_server ]]</p>
```
