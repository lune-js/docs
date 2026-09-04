# Form Handling

Forms are a crucial part of any application. Lune makes handling form inputs and submission straightforward with `lu-model`.

## Basic Bindings

### Text Input

```html
<div lu-scope="{ message: '' }">
  <input lu-model="message" placeholder="edit me" />
  <p>Message is: {{ message }}</p>
</div>
```

### Checkbox

```html
<div lu-scope="{ checked: true }">
  <input type="checkbox" id="checkbox" lu-model="checked" />
  <label for="checkbox">{{ checked }}</label>
</div>
```

### Radio

```html
<div lu-scope="{ picked: 'One' }">
  <input type="radio" id="one" value="One" lu-model="picked" />
  <label for="one">One</label>

  <input type="radio" id="two" value="Two" lu-model="picked" />
  <label for="two">Two</label>

  <p>Picked: {{ picked }}</p>
</div>
```

### Select

```html
<div lu-scope="{ selected: 'A' }">
  <select lu-model="selected">
    <option disabled value="">Please select one</option>
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>

  <p>Selected: {{ selected }}</p>
</div>
```

## Form Submission

You can use `lu-on:submit.prevent` (or `@submit.prevent`) to handle form submission via JavaScript.

```html
<script type="module">
  import { createApp } from "lune-js";

  function LoginForm() {
    return {
      email: "",
      password: "",
      isLoading: false,
      error: null,

      async submit() {
        this.isLoading = true;
        this.error = null;

        try {
          const res = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: this.email,
              password: this.password
            })
          });

          if (!res.ok) throw new Error("Login failed");

          window.location.href = "/dashboard";
        } catch (e) {
          this.error = e.message;
        } finally {
          this.isLoading = false;
        }
      }
    };
  }

  // the factory has to reach the template through the app data
  createApp({ LoginForm }).mount();
</script>

<form lu-scope="LoginForm()" @submit.prevent="submit">
  <div lu-if="error" class="error">{{ error }}</div>

  <input type="email" lu-model="email" required />
  <input type="password" lu-model="password" required />

  <button :disabled="isLoading">{{ isLoading ? 'Logging in...' : 'Login' }}</button>
</form>
```

## Validation

While you can use native HTML5 validation attributes (like `required`, `type="email"`), you might want custom validation logic.

Derived values belong in a factory, where they can be plain JavaScript getters — a template object
literal holds data only.

```html
<script type="module">
  import { createApp } from "lune-js";

  function UsernameField() {
    return {
      username: "",
      get isValid() {
        return this.username.length >= 3;
      },
      get errorMessage() {
        if (this.username.length === 0) return "Username is required";
        if (this.username.length < 3) return "Username must be at least 3 characters";
        return "";
      }
    };
  }

  createApp({ UsernameField }).mount();
</script>

<div lu-scope="UsernameField()">
  <input lu-model="username" />
  <span class="error">{{ errorMessage }}</span>

  <button :disabled="!isValid">Submit</button>
</div>
```
