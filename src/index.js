import { useReducer } from "react"

export const useValidateForm = formFields => {
  const form = Object.entries(formFields).reduce(
    (form, [key, { initialValue, validators }]) => {
      const { isValid: isFieldValid, errors, isDirty } = runValidators(
        initialValue,
        validators,
        false
      )
      return {
        ...form,
        fields: {
          ...form.fields,
          [key]: {
            value: initialValue,
            isValid: isFieldValid,
            isDirty,
            errors,
            name: key,
            validators
          }
        }
      }
    },
    { isDirty: false }
  )
  return useReducer(reducer, {
    ...form,
    isValid: Object.values(form.fields).every(field => field.isValid),
    hasErrors: Object.values(form.fields).some(field => field.errors.length > 0)
  })
}

const runValidators = (value, validators, isBlur) =>
  validators.reduce(
    (acc, { error, func }) => {
      const passed = func(value)

      return passed
        ? acc
        : {
            errors: isBlur ? [...acc.errors, error] : [],
            isValid: false,
            isDirty: isBlur
          }
    },
    { errors: [], isValid: true, isDirty: !isBlur }
  )

const reducer = (form, { type, payload: { name: fieldName, value } }) => {
  switch (type) {
    case "SET_VALUE":
      return updateForm(form, fieldName, value, false)
    case "VALIDATE":
      return updateForm(form, fieldName, value, true)
    default:
      throw new Error("Action must be of type SET_VALUE or VALIDATE")
  }
}

const updateForm = (form, fieldName, value, isBlur) => {
  const { validators } = form.fields[fieldName]
  const {
    isValid: isFieldValid,
    errors,
    isDirty: isFieldDirty
  } = runValidators(value, validators, isBlur)

  const updatedFormFields = {
    ...form,
    fields: {
      ...form.fields,
      [fieldName]: {
        value,
        isValid: isFieldValid,
        errors,
        isDirty: isFieldDirty,
        name: fieldName,
        validators
      }
    }
  }
  return {
    ...updatedFormFields,
    isDirty: Object.values(updatedFormFields.fields).some(
      field => field.name !== fieldName && field.isDirty
    )
      ? updatedFormFields.isDirty
      : isFieldDirty,
    isValid: isFieldValid
      ? Object.values(updatedFormFields.fields).every(field => field.isValid)
      : false,
    hasErrors: Object.values(updatedFormFields.fields).some(
      field => field.errors.length > 0
    )
  }
}

// validators

const emailAddressRegex = /[^@]+@[^.]+\..+/

export const isRequired = {
  func: value => !!value && value.length > 0,
  error: "This field is required"
}

export const isEmailAddress = {
  func: value => (value ? emailAddressRegex.test(value) : true),
  error: "Please enter a valid email address"
}

export const isEmailAddressList = {
  func: value => {
    return value.every(v => emailAddressRegex.test(v))
  },
  error: "Please enter valid email addresses"
}

export const minLength = min => ({
  func: value => (value ? value.length >= min : true),
  error: `This field has a minimum length of ${min}`
})

export const maxLength = max => ({
  func: value => (value ? value.length <= max : true),
  error: `This field has a maximum length of ${max}`
})
