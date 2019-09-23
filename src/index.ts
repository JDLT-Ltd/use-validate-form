import { useReducer } from 'react'

enum FieldType {
  'STRING' = 'string',
  'NUMBER' = 'number',
  'DATE' = 'date',
  'BOOLEAN' = 'boolean'
}

interface Validator {
  error: String
  func: (value: any, type: FieldType) => Boolean
}

interface FormField<T> {
  type: FieldType
  value: T
  initialValue: T
  isValid: Boolean
  isDirty: Boolean
  errors: Array<String>
  name: String
  validators: Array<Validator>
}

interface Form {
  fields: Array<FormField<any>>
  isDirty: Boolean
}

const createForm = (formFields: Array<FormField<any>>): Form => {
  const defaultFields: FormField<any>[] = []
  const defaultForm = {
    isDirty: false,
    fields: defaultFields
  }
  return Object.entries(formFields).reduce((form, [key, { initialValue, validators, type }]) => {
    if (!type || !(type in FieldType)) {
      throw new Error("Fields must have a type of 'string', 'number', 'date' or 'boolean' ")
    }
    const { isValid: isFieldValid, errors, isDirty } = runValidators(initialValue, type, validators, false)
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
          validators,
          type
        }
      }
    }
  }, defaultForm)
}

export const useValidateForm = (formFields: [FormField<any>]) => {
  const form = createForm(formFields)
  return useReducer(reducer, {
    ...form,
    isValid: Object.values(form.fields).every(field => field.isValid),
    hasErrors: Object.values(form.fields).some(field => field.errors.length > 0)
  })
}

const runValidators = (value: any, type: FieldType, validators: Array<Validator>, isBlur: Boolean) =>
  validators.reduce(
    (acc: any, { error, func }: Validator) => {
      const passed = func(value, type)

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

const reducer = (
  form: Form,
  {
    type,
    payload: { name: fieldName, value, newForm }
  }: { type: string; payload: { name: string; value: any; newForm: Array<FormField<any>> } }
) => {
  switch (type) {
    case 'SET_VALUE':
      return updateForm(form, fieldName, value, false)
    case 'VALIDATE':
      return updateForm(form, fieldName, value, true)
    case 'CREATE_NEW_FORM':
      const updatedForm = createForm(newForm)
      return {
        ...updatedForm,
        isValid: Object.values(updatedForm.fields).every(field => field.isValid),
        hasErrors: Object.values(updatedForm.fields).some(field => field.errors.length > 0)
      }
    default:
      throw new Error('Action must be of type SET_VALUE, VALIDATE or CREATE_NEW_FORM')
  }
}

const updateForm = (form: Form, fieldName: string, value: any, isBlur: Boolean) => {
  const { validators, type }: FormField<any> = form.fields[fieldName as any]
  const { isValid: isFieldValid, errors, isDirty: isFieldDirty } = runValidators(value, type, validators, isBlur)

  const updatedFormFields: Form = {
    ...form,
    fields: {
      ...form.fields,
      [fieldName]: {
        value,
        isValid: isFieldValid,
        errors,
        isDirty: isFieldDirty,
        name: fieldName,
        validators,
        type
      }
    }
  }

  return {
    ...updatedFormFields,
    isDirty: Object.values(updatedFormFields.fields).some(field => field.name !== fieldName && field.isDirty)
      ? updatedFormFields.isDirty
      : isFieldDirty,
    isValid: isFieldValid ? Object.values(updatedFormFields.fields).every(field => field.isValid) : false,
    hasErrors: Object.values(updatedFormFields.fields).some(field => field.errors.length > 0)
  }
}

// validators

const emailAddressRegex = /[^@]+@[^.]+\..+/

export const isRequired = {
  func: (value: any, fieldType: FieldType) => {
    if (fieldType === FieldType.DATE) {
      return value && Object.prototype.toString.call(value) === '[object Date]' && !isNaN(value)
    }

    return !!value && value.length > 0
  },
  error: 'This field is required'
}

export const isEmailAddress = {
  func: (value: any) => (value ? emailAddressRegex.test(value) : true),
  error: 'Please enter a valid email address'
}

export const isEmailAddressList = {
  func: (value: any) => {
    return value.every((v: any) => emailAddressRegex.test(v))
  },
  error: 'Please enter valid email addresses'
}

export const minLength = (min: number) => ({
  func: (value: any) => (value ? value.length >= min : true),
  error: `This field has a minimum length of ${min}`
})

export const maxLength = (max: number) => ({
  func: (value: any) => (value ? value.length <= max : true),
  error: `This field has a maximum length of ${max}`
})
