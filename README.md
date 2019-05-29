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
  name: {initialValue: '', validators: [isRequired]}
  age: {initialValue: '', validators: [isRequired]}
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

Each of the field objects returned by `useValidateForm` (i.e. `name`, `age`) have the following properties:

```JSX
const {
  value, // value of field
  isValid, // boolean
  isDirty, // boolean
  errors, // array of strings
  name, // string
  validators // array of functions
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