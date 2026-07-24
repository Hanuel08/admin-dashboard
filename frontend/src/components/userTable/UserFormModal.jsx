import { useState } from "react"
import { IconX } from "@tabler/icons-react"
import { validateUserField } from "../../utils/validateUserField.js"

const INITIAL_FORM = {
  name: "",
  last_name: "",
  username: "",
  email: "",
  password: "",
  phone: "",
  identity_card: "",
  status: "pendiente",
  role: "user",
}

const EXCLUDE_FIELDS = ["user_id", "age", "updated_at", "full_name"]

function getInitialForm(initialData) {
  if (!initialData) return INITIAL_FORM
  const filtered = Object.fromEntries(
    Object.entries(initialData).filter(([key]) => !EXCLUDE_FIELDS.includes(key))
  )
  return { ...INITIAL_FORM, ...filtered, password: "" }
}

export function UserFormModal({ isOpen, onClose, onSubmit, initialData, mode }) {
  const [formData, setFormData] = useState(() => getInitialForm(initialData))
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  const isEdit = mode === "edit"

  if (!isOpen) return null

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    setTouched((prev) => ({ ...prev, [name]: true }))

    const error = validateUserField(name, value, isEdit)
    setErrors((prev) => {
      if (error) return { ...prev, [name]: error }
      const next = { ...prev }
      delete next[name]
      return next
    })
  }

  const handleBlur = (e) => {
    const { name, value } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))

    const error = validateUserField(name, value, isEdit)
    setErrors((prev) => {
      if (error) return { ...prev, [name]: error }
      const next = { ...prev }
      delete next[name]
      return next
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const allTouched = {}
    Object.keys(formData).forEach((key) => {
      allTouched[key] = true
    })
    setTouched(allTouched)

    const allErrors = {}
    Object.keys(formData).forEach((key) => {
      const value = formData[key]
      if (isEdit && key === "password" && !value) {
        return
      }
      const error = validateUserField(key, value, isEdit)
      if (error) allErrors[key] = error
    })

    setErrors(allErrors)

    if (Object.keys(allErrors).length > 0) return

    const payload = { ...formData }
    if (isEdit && !payload.password) {
      delete payload.password
    }

    onSubmit(payload)
  }

  const inputClass = (field) =>
    `w-full bg-black border ${
      errors[field] && touched[field] ? "border-red-500" : "border-gray-700"
    } rounded-md px-3 py-2 text-sm text-white outline-none transition-colors focus:border-gray-500`

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={onClose}
    >
      <div
        className="bg-gray-900 border border-gray-700 rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b border-gray-700">
          <h2 className="text-lg font-semibold text-white">
            {isEdit ? "Edit User" : "Add User"}
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 transition-colors cursor-pointer"
          >
            <IconX size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-300">Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className={inputClass("name")}
              />
              {errors.name && touched.name && (
                <span className="text-xs text-red-500">{errors.name}</span>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-300">Last Name *</label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                onBlur={handleBlur}
                className={inputClass("last_name")}
              />
              {errors.last_name && touched.last_name && (
                <span className="text-xs text-red-500">{errors.last_name}</span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-300">Username *</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                onBlur={handleBlur}
                className={inputClass("username")}
              />
              {errors.username && touched.username && (
                <span className="text-xs text-red-500">{errors.username}</span>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-300">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={inputClass("email")}
              />
              {errors.email && touched.email && (
                <span className="text-xs text-red-500">{errors.email}</span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-300">
              Password {isEdit ? "(leave empty to keep current)" : "*"}
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={inputClass("password")}
            />
            {errors.password && touched.password && (
              <span className="text-xs text-red-500">{errors.password}</span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-300">Phone *</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                className={inputClass("phone")}
              />
              {errors.phone && touched.phone && (
                <span className="text-xs text-red-500">{errors.phone}</span>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-300">Identity Card *</label>
              <input
                type="text"
                name="identity_card"
                value={formData.identity_card}
                onChange={handleChange}
                onBlur={handleBlur}
                className={inputClass("identity_card")}
              />
              {errors.identity_card && touched.identity_card && (
                <span className="text-xs text-red-500">{errors.identity_card}</span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-300">Status *</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                onBlur={handleBlur}
                className={inputClass("status")}
              >
                <option value="pendiente">Pendiente</option>
                <option value="activo">Activo</option>
                <option value="inactivo">Inactivo</option>
                <option value="suspendido">Suspendido</option>
                <option value="licencia">Licencia</option>
                <option value="vacaciones">Vacaciones</option>
              </select>
              {errors.status && touched.status && (
                <span className="text-xs text-red-500">{errors.status}</span>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-300">Role *</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                onBlur={handleBlur}
                className={inputClass("role")}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
              {errors.role && touched.role && (
                <span className="text-xs text-red-500">{errors.role}</span>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-2 pt-4 border-t border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-gray-300 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm text-black bg-white hover:bg-gray-100 rounded-md transition-colors cursor-pointer"
            >
              {isEdit ? "Save Changes" : "Add User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
