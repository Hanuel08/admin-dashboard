import { IconChevronDown, IconChevronUp, IconSortAscending, IconSortDescending } from '@tabler/icons-react';
import { useState } from 'react';


// options = [],
//   defaultValue = "Name",
//   defaultDirection = "asc",
//   onChange = () => {},



// efaultOption: "name",
//     defaultDirection: "asc",
//     getAll: getAllUsers,
//     handler: (filterOptions) => handleTypeFilter({ config: dataConfig, setConfig: setDataConfig, filterOptions }),
//     options: [
//       { title: "Name", value: "name" },
//       { title: "Username", value: "username" },
//       { title: "Status", value: "status" },
//       { title: "Email", value: "email" },
//       { title: "Phone", value: "phone" },
//     ],



export function Dropdown({ sortOptions: { defaultOption, defaultDirection, options, handler } }) {

  const [open, setOpen] = useState(false);

  //const [field, setField] = useState(defaultOption);

  const [option, setOption] = useState(defaultOption);

  const [direction, setDirection] = useState(defaultDirection);


  const handleSelect = (option) => {
    setOption(option);
    setOpen(false);
    //onChange({ option, direction });
    handler({ option: option.value, direction })
  };

  const handleDirection = (dir) => {
    setDirection(dir);
    handler({ option: option.value, direction: dir });
  };


  return (
    <div className='relative'>
      <button onClick={() => setOpen(!open)} className='flex items-center justify-between w-38 h-8 px-4 rounded-md cursor-pointer text-white border border-gray-700 hover:bg-gray-900'>
        <span className='text-sm'>{option.title || "Order by"}</span>
        {open ? <IconChevronUp size={16} /> : <IconChevronDown size={16} />}
      </button>

      {open && (
        <ul className='mt-1 absolute text-white bg-black w-38 rounded-md shadow-lg border border-gray-700 px-2 py-2 z-80'>

          <li className='flex justify-center items-center rounded-md'>
            <div className='flex items-center justify-between text-xs p-2 rounded-md bg-gray-900'>

              <div
                className={`flex items-center gap-2 rounded-md p-1 w-full text-xs cursor-pointer px-2 ${direction === "desc" ? "bg-black" : ""}`}
                onClick={() => handleDirection("desc")}
              >
                <IconSortDescending size={12} />
                <span>Desc</span>
              </div>

              <div
                className={`flex items-center gap-2 rounded-md p-1 w-full text-xs cursor-pointer px-2 ${direction === "asc" ? "bg-black" : ""}`}
                onClick={() => handleDirection("asc")}
              >
                <IconSortAscending size={12} />
                <span>Asc</span>
              </div>

            </div>
          </li>

          <hr className='border-gray-900 border my-2' />

          {options.map((option) => (
            <li
              className={`hover:bg-gray-900 p-1 text-sm px-4 rounded-md cursor-pointer`}
              key={option.value}
              onClick={() => handleSelect(option)}
            >
              {option.title}
            </li>
          ))}

        </ul>
      )}
    </div>
  )
}