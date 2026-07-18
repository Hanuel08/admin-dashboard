


export function SearchInput({ searchOptions: { placeholder = "Search", handler } }) {
  const handleChange = (e) =>{
    console.log(e.target.value);
    handler(e.target.value);
  }

  return (
    <input type="text" className="bg-transparent text-gray-200 p-4 w-80 h-6 text-md focus:outline-none rounded-md border border-gray-800 
      hover:border-gray-500 shadow-md hover:shadow-sm transition-shadow duration-300 hover:shadow-gray-400" placeholder={placeholder} onChange={(e) => handleChange(e)} />
  )
}