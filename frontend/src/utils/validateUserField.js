import { validator } from "../helpers/validator.js"

const rules = {
  name: "required|string|min:3|max:50",
  last_name: "required|string|min:3|max:50",
  username: "required|text|min:3|max:50",
  email: "required|email|max:100",
  password: "required|text|min:8|max:255",
  phone: "required|textnumber",
  status: "required",
  role: "required",
  identity_card: "required|textnumber",
}

const messages = {
  name: {
    required: "Name is required",
    string: "Name must only contain letters",
    min: "Name must be at least 3 characters",
    max: "Name must be at most 50 characters",
  },
  last_name: {
    required: "Last name is required",
    string: "Last name must only contain letters",
    min: "Last name must be at least 3 characters",
    max: "Last name must be at most 50 characters",
  },
  username: {
    required: "Username is required",
    min: "Username must be at least 3 characters",
    max: "Username must be at most 50 characters",
  },
  email: {
    required: "Email is required",
    email: "Enter a valid email address",
    max: "Email must be at most 100 characters",
  },
  password: {
    required: "Password is required",
    min: "Password must be at least 8 characters",
    max: "Password must be at most 255 characters",
  },
  phone: {
    required: "Phone is required",
    number: "Phone must be a valid 10-digit number starting with 80, 82, 84, 86, 88 or 89",
  },
  status: {
    required: "Status is required",
  },
  role: {
    required: "Role is required",
  },
  identity_card: {
    required: "Identity card is required",
    number: "Identity card must be a valid number",
  },
}

export const validateUserField = (fieldName, value, isEdit = false) => {
  const { validate } = validator()

  if (!rules[fieldName]) return null

  const fieldRules = rules[fieldName]

  if (isEdit && fieldName === "password" && (!value || value === "")) {
    return null
  }

  const isRequired = fieldRules.split("|").includes("required")

  if (!isRequired && (!value || value === "")) {
    return null
  }

  const data = { [fieldName]: value }
  const ruleObj = { [fieldName]: fieldRules }

  const errors = validate({ data, rules: ruleObj, messages })

  return errors[fieldName] || null
}
