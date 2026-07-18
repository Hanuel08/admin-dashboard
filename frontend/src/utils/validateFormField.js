import { validator } from "../helpers/validator.js"

export const validateFormField = (data) => {
  let { validate } = validator()
  const errors = validate({
    data,
    rules: {
      name: "required|string|min:3|max:60",
      phone: "required|textnumber|min:7|max:15",
      email: "required|email|min:3|max:60",
      age: "required|number|min:18|max:100",
      department: "required",
      terms: "required|boolean"
    },
    messages: {
      name: {
        required: "Name is required",
        string: "Name must be a text string",
        min: "Name must be at least 3 characters long",
        max: "Name must be at most 60 characters long"
      },
      phone: {
        required: "Phone is required",
        number: "Phone must be a number",
        min: "Phone must be at least 7 digits long",
        max: "Phone must be at most 15 digits long"
      },
      email: {
        required: "Email is required",
        email: "Email must be a valid email format",
        min: "Email must be at least 3 characters long",
        max: "Email must be at most 60 characters long"
      },
      age: {
        required: "Age is required",
        number: "Age must be a number",
        min: "Age must be at least 18 years old",
        max: "Age must be at most 100 years old"
      },
      department: {
        required: "Department is required"
      },
      terms: {
        required: "Terms must be accepted",
        boolean: "Terms must be a boolean"
      }
    }
  })

  let value = Object.keys(data)[0]
  if (Object.hasOwn(errors, value)) {
    return {
      ...errors,
      [value]: errors[value]
    }
  }

  return errors
}