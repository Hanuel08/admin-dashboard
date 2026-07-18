
import { IconUser, IconUserShield } from "@tabler/icons-react";

function Role({ text }) {
  return (
    <>
      {
        text.toLowerCase() === "admin" ? (
          <div className="flex gap-1 items-center">
            <IconUserShield size={20} className='text-gray-400' />
            <span className='text-gray-200 text-sm'>Admin</span>
          </div>
        ) : (
          <div className="flex gap-1 items-center">
            <IconUser size={20} className='text-gray-400' />
            <span className='text-gray-200 text-sm'>User</span>
          </div>
        )
      }
    </>
  )
}


function Status({ text }) {
  switch (text.toLowerCase()) {
    case "activo":
      return <span className="p-2 bg-green-700 text-white text-xs rounded-md text-center">{text.toUpperCase()}</span>

    case "suspendido":
      return <span className="p-2 bg-red-800 text-white text-xs rounded-md text-center">{text.toUpperCase()}</span>

    case "licencia":
      return <span className="p-2 bg-yellow-600 text-white text-xs rounded-md text-center">{text.toUpperCase()}</span>

    case "vacaciones":
      return <span className="p-2 bg-blue-500 text-white text-xs rounded-md text-center">{text.toUpperCase()}</span>

    default:
      return <span className="p-2 bg-gray-500 text-white text-xs rounded-md text-center">{text.toUpperCase()}</span>
  }
}


export const userTableData = {
    index: "user_id",
    head: [
      {
        title: "Name",
        name: "name",
        schema: null,
      },
      {
        title: "Username",
        name: "username",
        schema: null
      },
      {
        title: "Email",
        name: "email",
        schema: null
      },
      {
        title: "Status",
        name: "status",
        schema: (text) => <Status text={text} />,
      },
      {
        title: "Identity Card",
        name: "identity_card",
        schema: null,
      },
      {
        title: "Age",
        name: "age",
        schema: null,
      },
      {
        title: "Phone",
        name: "phone",
        schema: null,
      },
      {
        title: "Role",
        name: "role",
        schema: (text) => <Role text={text} />,
      }
    ],
    body: []
  }