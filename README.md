# use-validate-form

This package exposes `useFormValidation`, a custom react hook for validating form input.

## Usage

You can import and use `useValidateForm` like this:

```JSX
import {
  useValidateForm,
  isRequired
} from 'use-validate-form'

const fields = {
  name: {initialValue: '', validators: [isRequired], type: 'string'}
  age: {initialValue: '', validators: [isRequired], type: 'number'}
}

const [
  {
    fields: { name, age },
    isValid,
    hasErrors,
  },
  dispatch
] = useValidateForm(fields)

```

Each item in the `validators` arrays must be an objects with a) a `func` property which takes the new value, the field's type, and an object containing all fields as arguments, and returns `true` or `false` and b) an `error` property which is a string that will explain to a user why their input is invalid.

```js
(value, type, allFields) => value > allFields.otherField.value
```

Each of the field objects returned by `useValidateForm` (i.e. `name`, `age`) have the following properties:

```JSX
const {
  value, // value of field
  type, // string
  isValid, // boolean
  isDirty, // boolean
  errors, // array of strings
  name, // string
  validators // array of validtor objects
} = age
```

The `dispatch` function takes an action of type `SET_VALUE` or `VALIDATE`. This allows you to set the value of a field `onChange` event but only validate (show errors) `onBlur`.

```JSX
<input
  onChange={(event) => dispatch({type: 'SET_VALUE', {name: 'age', value: event.target.value}})}
  onBlur={(event) => dispatch({type: 'VALIDATE', {name: 'age', value: event.target.value}})}
/>
```

The `name` property of the action must match the `name` property from the field which was originally passed into `useValidateForm`.
