import { UserTable } from '../components/userTable/UserTable.jsx'

import { IconUserPlus, IconTrash } from '@tabler/icons-react';

import { Dropdown } from '../components/dropdown/Dropdown.jsx';

import { FilterButton } from '../components/filterButton/FilterButton.jsx';

import { userTableData } from "../data/userTableData.jsx"

import { useState, useEffect, useCallback } from 'react';
import { helpHttp } from "../helpers/helpHttp.js";
import { BASE_URL } from "../const/const.js";

import { SearchInput } from '../components/searchInput/SearchInput.jsx';

import { UserFormModal } from "../components/userTable/UserFormModal.jsx";


export function Users() {

  const [data, setData] = useState({ ...userTableData, body: [] });

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [selectedUser, setSelectedUser] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [modalKey, setModalKey] = useState(0);

  const [selectedIds, setSelectedIds] = useState(new Set());
  const [bulkDeleteConfirm, setBulkDeleteConfirm] = useState(false);


  const [dataConfig, setDataConfig] = useState({
    page: 1,
    offset: 1,
    limit: 50,
    search: "",
    sort: "name",
    direction: "asc",
    filters: [],
  })


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


  const getAllUsers = useCallback(() => {
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

    get(url)
      .then(res => {
        if (res.err) {
          console.log(res);
          return;
        }
        setData(prev => ({ ...prev, body: res.data }));
      })
      .catch(err => console.log(err));
  }, [dataConfig]);


  const handleOpenAdd = () => {
    setModalMode("add")
    setSelectedUser(null)
    setModalKey((k) => k + 1)
    setModalOpen(true)
  }

  const handleOpenEdit = (user) => {
    setModalMode("edit")
    setSelectedUser(user)
    setModalKey((k) => k + 1)
    setModalOpen(true)
  }

  const handleSubmitUser = (formData) => {
    const { post, put } = helpHttp();

    if (modalMode === "add") {
      post(`${BASE_URL}/users`, { body: formData })
        .then(res => {
          if (!res.err) {
            setModalOpen(false)
            getAllUsers()
          }
        })
        .catch(err => console.log(err));
    } else {
      put(`${BASE_URL}/users/${selectedUser.user_id}`, { body: formData })
        .then(res => {
          if (!res.err) {
            setModalOpen(false)
            getAllUsers()
          }
        })
        .catch(err => console.log(err));
    }
  }

  const handleDeleteClick = (user) => {
    setDeleteConfirm(user)
  }

  const handleConfirmDelete = () => {
    const { del } = helpHttp();

    del(`${BASE_URL}/users/${deleteConfirm.user_id}`)
      .then(res => {
        if (!res.err) {
          setDeleteConfirm(null)
          setSelectedIds(prev => {
            const next = new Set(prev)
            next.delete(deleteConfirm.user_id)
            return next
          })
          getAllUsers()
        }
      })
      .catch(err => console.log(err));
  }

  const handleBulkDelete = () => {
    const { post } = helpHttp();

    const ids = Array.from(selectedIds)

    post(`${BASE_URL}/users/delete-multiple`, { body: { ids } })
      .then(res => {
        if (!res.err) {
          setBulkDeleteConfirm(false)
          setSelectedIds(new Set())
          getAllUsers()
        }
      })
      .catch(err => console.log(err));
  }


  const statusDefaultFilterOptions = {
    displayName: "Status",
    filter: "status",
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataConfig]);


  return (
    <section className='text-white w-full h-full flex justify-center relative'>

      <UserFormModal
        key={modalKey}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmitUser}
        initialData={selectedUser}
        mode={modalMode}
      />

      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={() => setDeleteConfirm(null)}>
          <div className="bg-gray-900 border border-gray-700 rounded-lg shadow-xl p-6 w-full max-w-sm" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold text-white mb-2">Delete User</h3>
            <p className="text-sm text-gray-400 mb-6">
              Are you sure you want to delete <span className="text-white font-medium">{deleteConfirm.name}</span>? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 text-sm text-gray-300 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 text-sm text-white bg-red-600 hover:bg-red-500 rounded-md transition-colors cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {bulkDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={() => setBulkDeleteConfirm(false)}>
          <div className="bg-gray-900 border border-gray-700 rounded-lg shadow-xl p-6 w-full max-w-sm" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold text-white mb-2">Delete Multiple Users</h3>
            <p className="text-sm text-gray-400 mb-6">
              Are you sure you want to delete <span className="text-white font-medium">{selectedIds.size} user{selectedIds.size > 1 ? "s" : ""}</span>? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setBulkDeleteConfirm(false)}
                className="px-4 py-2 text-sm text-gray-300 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleBulkDelete}
                className="px-4 py-2 text-sm text-white bg-red-600 hover:bg-red-500 rounded-md transition-colors cursor-pointer"
              >
                Delete All
              </button>
            </div>
          </div>
        </div>
      )}

      <div className='w-400 flex flex-col'>
        <article className='flex mb-6 justify-between w-full'>

          <div className='flex flex-col'>
            <h3 className="text-2xl font-bold">Users List</h3>
            <p className="text-gray-400 text-md">Manage your users and their roles here.</p>
          </div>

          <div className='flex justify-end items-center'>
            <button onClick={handleOpenAdd} className='flex items-center justify-center w-34 h-10 p-4 bg-white text-black rounded-md hover:bg-gray-100 gap-2 cursor-pointer'>
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

            {selectedIds.size > 0 && (
              <button
                onClick={() => setBulkDeleteConfirm(true)}
                className='flex items-center justify-center h-10 px-4 bg-red-600 text-white rounded-md hover:bg-red-500 gap-2 cursor-pointer transition-colors'
              >
                <IconTrash size={18} />
                <span className='font-medium text-sm'>Delete ({selectedIds.size})</span>
              </button>
            )}
          </div>


          <div className='flex gap-2 items-center'>
            <Dropdown sortOptions={sortDefaultOptions} />
          </div>

        </article>

        <UserTable
          data={data}
          onEdit={handleOpenEdit}
          onDelete={handleDeleteClick}
          selectedIds={selectedIds}
          onSelectionChange={setSelectedIds}
        />
      </div>
    </section>
  )
}
