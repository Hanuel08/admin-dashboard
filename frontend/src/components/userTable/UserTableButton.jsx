import { useState, useEffect, useRef } from "react"
import { IconDotsFilled, IconPencil, IconTrash } from "@tabler/icons-react"

export function UserTableButton({ row, onEdit, onDelete }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return

    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [open])

  return (
    <div className="flex items-center justify-center relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="hover:bg-gray-100 p-2 rounded-md transition-colors cursor-pointer"
      >
        <IconDotsFilled size={16} />
      </button>

      {open && (
        <div className="absolute right-0 bottom-full w-44 mb-2 bg-black border border-gray-700 rounded-md shadow-lg z-10 overflow-hidden">
          <button
            onClick={() => {
              setOpen(false)
              onEdit(row)
            }}
            className="flex items-center gap-3 px-4 py-2.5 text-sm text-white hover:bg-gray-900 transition-colors w-full cursor-pointer"
          >
            <IconPencil size={16} />
            <span>Edit</span>
          </button>
          <button
            onClick={() => {
              setOpen(false)
              onDelete(row)
            }}
            className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-gray-900 transition-colors w-full cursor-pointer"
          >
            <IconTrash size={16} />
            <span>Delete</span>
          </button>
        </div>
      )}
    </div>
  )
}
