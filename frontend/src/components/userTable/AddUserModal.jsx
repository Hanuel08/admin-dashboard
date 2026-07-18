


import { IconX } from "@tabler/icons-react";


export function AddUserModal({ setOpenAddUserForm }) {

  const userToAdd = {
    name: "",
    username: "",
    email: "",
    phone: "",
    status: "",
    role: "",
  }

  
  return (
    <section className="modal-overlay absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white p-4" onClick={() => setOpenAddUserForm(false)}>
      <div className="modal">
        <h2>Add User</h2>
        <form>
          <IconX size={16} onClick={() => setOpenAddUserForm(false)} />
          <label>
            Name:
            <input type="text" name="name" />
          </label>
          <label>
            Username:
            <input type="text" name="username" />
          </label>
          <label>
            Email:
            <input type="email" name="email" />
          </label>
          <label>
            Phone:
            <input type="text" name="phone" />
          </label>
          <label>
            Status:
            <input type="text" name="status" />
          </label>
          <label>
            Role:
            <input type="text" name="role" />
          </label>
          <button type="submit">Add User</button>
        </form>
      </div>
    </section>
  )
}
  