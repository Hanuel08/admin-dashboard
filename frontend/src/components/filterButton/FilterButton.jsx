import { IconCirclePlus, IconCheck } from "@tabler/icons-react";

import { useState } from 'react';


// const filterOptions = [
//   { title: "Activo", selected: false },
//   { title: "Inactivo", selected: false },
//   { title: "Pendiente", selected: false },
//   { title: "Suspendido", selected: false },
//   { title: "Licencia", selected: false },
//   { title: "Vacaciones", selected: false },
// ]



export function FilterButton({ filterOptions: { displayName, filter, handler, options: initialOptions } }) {
  //const { displayName, filter, getAll, options: initialOptions } = filterOptions;
  
  const [open, setOpen] = useState(false);

  //const [options, setOptions] = useState(filterOptions);

  const [options, setOptions] = useState(initialOptions);

  const [selected, setSelected] = useState(false);



  const handleSelect = async (title) => {
    const newOptions = options.map((opt) => {
      if (opt.title === title) {
        return { ...opt, selected: !opt.selected };
      }
      return opt;
    })


    const selectedOptions = newOptions
    .filter(opt => opt.selected)
    .map(opt => opt.title.toLowerCase());


    setOptions(newOptions);
    setSelected(newOptions.some(option => option.selected));

    const filterOptions = {
      filter,
      values: selectedOptions
    };

    //console.log("filter options")
    //console.log([filterOptions])

    // if (selectedOptions.length > 0) filterUsers([filterOptions]);
    // else getAll();


    //if (selectedOptions.length > 0) handler([filterOptions]);
    handler(filterOptions);
    //else getAll();
  };


  return (
    

    <div className='relative'>

        <button onClick={() => setOpen(!open)} className='flex items-center gap-2 px-4 border border-gray-700 hover:bg-gray-900 rounded-md cursor-pointer border-dashed text-sm h-8'>
          <span className="flex items-center gap-2">
            <IconCirclePlus size={16} />
            {displayName}
          </span>

          {selected && (
            <div className='flex items-center gap-2 text-white w-full'>
              <span className='text-gray-400'>|</span>
              {options.filter((option) => option.selected).map(({title}) => (
                <span className="bg-gray-800 rounded-md px-2 py-1 text-xs" key={title}>{title}</span>
              ))}
            </div>
          )}

        </button>

        {open && (
          <ul className='mt-1 absolute text-white bg-black w-44 rounded-md shadow-lg border border-gray-700 px-2 py-2'>

            {options.map((option) => (
              <li className='flex hover:bg-gray-900 p-1 text-sm px-4 rounded-md cursor-pointer text-white justify-between' key={option.title} onClick={() => handleSelect(option.title)}>
                <span>{option.title}</span>
                {option.selected && <IconCheck className="" size={16} />}
              </li>
            ))}

          </ul>
        )}

    </div>
  )
}