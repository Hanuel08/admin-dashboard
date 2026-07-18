export function validator () {
  const validateRequired = (value) => {
    if (!value || value === null || value === '' || value === undefined || value === false) return false
    return true
  }

  const validateString = (value) => {
    if (!value) return false
    if (typeof value !== 'string' || /\d+/.test(value) || !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value)) return false
    return true
  }

 const validateText = (value) => {
    if (!value) return false
    if (typeof value !== 'string') return false
    return true
  }

  const validateNumber = (value) => {
    if (!value) return false
    if (!/^[0-9]+$/.test(value)) return false
    return true
  }

  const validateEmail = (value) => {
    if (!value) return false
    if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(value)) return false
    return true
  }

  const validateBoolean = (value) => {
    if (!value) return false
    if (value !== true && value !== false) return false
    return true
  }

  const validateMin = (value, min, type = "string") => {
    if (!value) return false
    if ((type === "textnumber" || type === "string" || type === "text") && value.toString().length < min) return false
    if (type === "number" && parseInt(value) < min) return false
    return true
  }

  const validateMax = (value, max, type = "string") => {
    if (!value) return false
    if ((type === "textnumber" || type === "string" || type === "text") && value.toString().length > max) return false
    if (type === "number" && parseInt(value) > max) return false
    return true
  }

  const errorMessage = ({ field, rule }, messages, defaultMessage) => {
    if(Object.hasOwn(messages, field) && Object.hasOwn(messages[field], rule)) return messages[field][rule]
    return defaultMessage
  }

  const validate = ({ data, rules, messages = [] }) => {
    const errors = {}

    Object.keys(rules).forEach(field => {
      if (!Object.hasOwn(data, field)) data[field] = null

      let rulesArray = rules[field].toLowerCase().split("|")
      let value = data[field]

      rulesArray.forEach(rule => {
        if (Object.hasOwn(errors, field) && errors[field] !== null) return
        let type = rulesArray.find(el => el === "string" || el === "number")

        if (rule === "required") {
           if (!validateRequired(value)) {
            errors[field] = errorMessage({ field, rule }, messages, `${field} is required`)
            return
          } 
        } else if (rule === "string") {
            if (!validateString(value)) {
              errors[field] = errorMessage({ field, rule }, messages, `${field} must be a text string without numbers`)
              return 
            } 
        } else if (rule === "text") {
          if (!validateText(value)) {
            errors[field] = errorMessage({ field, rule }, messages, `${field} must be a text string`)
            return
          }
        } else if (rule === "number" || rule === "textnumber") {
          if (!validateNumber(value)) {
            errors[field] = errorMessage({ field, rule }, messages, `${field} must be a number`)
            return
          } 
        } else if (rule === "email") {
          if (!validateEmail(value)) {
            errors[field] = errorMessage({ field, rule }, messages, `${field} must be an email`)
            return
          } 
        } else if (rule === "boolean") {
          if (!validateBoolean(value)) {
            errors[field] = errorMessage({ field, rule }, messages, `${field} must be a boolean`)
            return
          } 
        } else if (rule.startsWith("min")) {
          let [ruleString, min] = rule.split(":")

          if (!validateMin(value, min, type)) {
            errors[field] = errorMessage({ field, rule: ruleString }, messages, `${field} must be at least ${min} characters long`)
            return
          } 
        } else if (rule.startsWith("max")) {
          let [ruleString, max] = rule.split(":")
            
          if (!validateMax(value, max, type)) {
            errors[field] = errorMessage({ field, rule: ruleString }, messages, `${field} must be at most ${max} characters long`)
            return
          } 
        } else errors[field] = null
      })
    })
    return errors
  }

  return { validate }
}