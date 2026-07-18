import { UserTable } from '../components/userTable/UserTable.jsx'

import { IconUserPlus } from '@tabler/icons-react';

import { Dropdown } from '../components/dropdown/Dropdown.jsx';

import { FilterButton } from '../components/filterButton/FilterButton.jsx';

import { userTableData } from "../data/userTableData.jsx"

import { useState, useEffect, useMemo } from 'react';
import { helpHttp } from "../helpers/helpHttp.js";
import { BASE_URL } from "../const/const.js";

import { SearchInput } from '../components/searchInput/SearchInput.jsx';


// const sortOptions = [
//   { label: "Name", value: "name" },
//   { label: "Username", value: "username" },
//   { label: "Email", value: "email" },
//   { label: "Phone", value: "phone" },
// ];



import { AddUserModal } from "../components/userTable/AddUserModal.jsx";


export function Users() {

  const [data, setData] = useState({ ...userTableData, body: [] });

  const [openAddUserForm, setOpenAddUserForm] = useState(false);





  const [dataConfig, setDataConfig] = useState({
    page: 1,
    offset: 1,
    limit: 50,
    search: "",
    sort: "name",
    direction: "asc",
    filters: [
      // { filter: "status", values: ["activo", "inactivo", "pendiente", "suspendido", "licencia", "vacaciones"] },
      // { filter: "role", values: ["admin", "user"] },
    ],
  })


  // { filter: "status", values: ["activo", "inactivo", "pendiente", "suspendido", "licencia", "vacaciones"] },
  // { filter: "role", values: ["admin", "user"] },

  //const handleTypeFilter = ({ config, setConfig, filters }) => setConfig({ ...config, filters });


  const handleTypeFilter = ({ config, setConfig, filterOptions }) => {
    if(filterOptions.values.length > 0) {
      let newFilters = config.filters;
      newFilters.push(filterOptions);
      setConfig({ ...config, filters: newFilters });
    } else {
      let newFilters = config.filters.filter(el => el["filter"] !== filterOptions["filter"])
      setConfig({ ...config, filters: newFilters });
    }
  }


  const handleSort = ({ config, setConfig, sortOptions }) => {
    setConfig({ ...config, sort: sortOptions.option, direction: sortOptions.direction });
  }


  const handleSearch = ({ config, setConfig, searchValue }) => {
    setConfig({ ...config, search: searchValue });
  }
    



  const typeFilterUrl = (filterOptions) => {
    let params = "";

    filterOptions.forEach((filterOption, index) => {
      const { filter, values } = filterOption;
      params += `${filter}=${values.join(",")}`;
      if (filterOptions.length > 1 && index < filterOptions.length - 1) params += "&";
    })
    return params;
  }







  const getAllUsers = () => {
    const { get } = helpHttp();

    let url = `${BASE_URL}/users`;

    let params = [];


    if (dataConfig.page) params.push(`page=${dataConfig.page}`);
    if (dataConfig.limit) params.push(`limit=${dataConfig.limit}`);
    if (dataConfig.search) params.push(`search=${dataConfig.search}`);
    if (dataConfig.sort) params.push(`sort=${dataConfig.sort}`);
    if (dataConfig.direction) params.push(`direction=${dataConfig.direction}`);
    if (dataConfig.filters.length > 0) params.push(typeFilterUrl(dataConfig.filters));

    if (params.length > 0) url += `?${params.join("&")}`;

    console.log(url);


    get(url)
      .then(res => {
        console.log(res.data);
        setData({ ...data, body: res.data });
      })
      .catch(err => console.log(err));
  }








  const statusDefaultFilterOptions = {
    displayName: "Status",
    filter: "status",
    //getAll: getAllUsers,
    handler: (filterOptions) => handleTypeFilter({ config: dataConfig, setConfig: setDataConfig, filterOptions }),
    options: [
      { title: "Activo", selected: false },
      { title: "Inactivo", selected: false },
      { title: "Pendiente", selected: false },
      { title: "Suspendido", selected: false },
      { title: "Licencia", selected: false },
      { title: "Vacaciones", selected: false },
    ],
  }


  const roleDefaultFilterOptions = {
    displayName: "Roles",
    filter: "role",
    //  getAll: getAllUsers,
    handler: (filterOptions) => handleTypeFilter({ config: dataConfig, setConfig: setDataConfig, filterOptions }),
    options: [
      { title: "Admin", selected: false },
      { title: "User", selected: false },
    ],
  }


  const sortDefaultOptions = {
    defaultOption: { title: "Name", value: "name" },
    defaultDirection: "asc",
        getAll: getAllUsers,
    handler: (sortOptions) => handleSort({ config: dataConfig, setConfig: setDataConfig, sortOptions }),
    options: [
      { title: "Name", value: "name" },
      { title: "Username", value: "username" },
      { title: "Status", value: "status" },
      { title: "Email", value: "email" },
      { title: "Phone", value: "phone" },
    ],
  }


  const searchDefaultOptions = {
    placeholder: "Search users",
    handler: (searchValue) => handleSearch({ config: dataConfig, setConfig: setDataConfig, searchValue }),
  }
  


  

  useEffect(() => {
    getAllUsers();
  }, [dataConfig]);


  

  return (
    <section className='text-white w-full h-full flex justify-center relative'>
      {openAddUserForm && (
        <AddUserModal setOpenAddUserForm={setOpenAddUserForm} />
      )}


      <div className='w-400 flex flex-col'>
        <article className='flex mb-6 justify-between w-full'>

          <div className='flex flex-col'>
            <h3 className="text-2xl font-bold">Users List</h3>
            <p className="text-gray-400 text-md">Manage your users and their roles here.</p>
          </div>

          <div className='flex justify-end items-center'>
            {/* <button className='flex items-center justify-center w-34 h-10 p-4 bg-white text-black rounded-md hover:bg-gray-100 gap-2 cursor-pointer'>
              <IconUserPlus size={20} />
              <span className='font-medium'>Add User</span>
            </button> */}

            {/* <AddButton /> */}

            <button onClick={() => setOpenAddUserForm(true)} className='flex items-center justify-center w-34 h-10 p-4 bg-white text-black rounded-md hover:bg-gray-100 gap-2 cursor-pointer'>
              <IconUserPlus size={20} />
              <span className='font-medium'>Add User</span>
            </button>
          </div>

        </article>

        <article className='flex justify-between mb-6'>

          <div className='flex gap-2 items-center'>
            <SearchInput searchOptions={searchDefaultOptions} />

            <FilterButton filterOptions={statusDefaultFilterOptions} />
            <FilterButton filterOptions={roleDefaultFilterOptions} />
          </div>


          <div className='flex gap-2 items-center'>
            <Dropdown sortOptions={sortDefaultOptions} />
          </div>

        </article>

        <UserTable data={data} />
      </div>
    </section>
  )
}
