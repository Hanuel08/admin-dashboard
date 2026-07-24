import { UserTableButton } from './UserTableButton';
import { Checkbox } from '@heroui/react';

export function UserTable({ data, onEdit, onDelete, selectedIds, onSelectionChange }) {
  const allSelected = data.body?.length > 0 && data.body.every(el => selectedIds?.has(el[data.index]))
  const someSelected = data.body?.some(el => selectedIds?.has(el[data.index]))

  const handleToggleAll = () => {
    if (allSelected) {
      onSelectionChange(new Set())
    } else {
      onSelectionChange(new Set(data.body?.map(el => el[data.index]) || []))
    }
  }

  const handleToggleRow = (id) => {
    const next = new Set(selectedIds)
    if (next.has(id)) {
      next.delete(id)
    } else {
      next.add(id)
    }
    onSelectionChange(next)
  }

  return (
    <>
      <table className="w-full rounded-xl p-4">

        <thead>
          <tr>
            <th className="text-md font-bold py-2 px-4">
              <Checkbox
                isSelected={allSelected}
                isIndeterminate={someSelected && !allSelected}
                onChange={handleToggleAll}
              >
                <Checkbox.Content>
                  <Checkbox.Control>
                    <Checkbox.Indicator />
                  </Checkbox.Control>
                </Checkbox.Content>
              </Checkbox>
            </th>
            {
              data.head?.map(head => (
                <th className="text-sm font-bold py-2 text-start px-8" key={head.name}>{head.title}</th>
              ))
            }
            <th className="text-sm font-bold py-2 px-4"></th>
          </tr>
        </thead>

        <tbody>
          {data.body?.length === 0 ? (
            <tr>
              <td colSpan={data.head.length + 2} className="text-center text-gray-700 text-md py-10 px-8">NO HAY DATOS</td>
            </tr>
          ) : (
            data.body?.map(el => (
              <tr
                className={`border border-gray-800 hover:bg-gray-900 ${selectedIds?.has(el[data.index]) ? 'bg-gray-800/50' : ''}`}
                key={el[data.index]}
              >

                <td className="p-2 px-4">
                  <Checkbox
                    isSelected={selectedIds?.has(el[data.index])}
                    onChange={() => handleToggleRow(el[data.index])}
                  >
                    <Checkbox.Content>
                      <Checkbox.Control>
                        <Checkbox.Indicator />
                      </Checkbox.Control>
                    </Checkbox.Content>
                  </Checkbox>
                </td>

                {
                  data.head.map(head => {
                    if (head.schema) {
                      return (<td className="p-2 px-8 text-sm" key={head.name}>{head.schema(el[head.name])}</td>);
                    }
                    return (<td className="p-2 px-8 text-sm" key={head.name}><span>{el[head.name]}</span></td>)
                  })
                }

                <td className="p-2 px-4">
                  <UserTableButton row={el} onEdit={onEdit} onDelete={onDelete} />
                </td>

              </tr>
            ))
          )}
        </tbody>

      </table>
    </>
  )
}
