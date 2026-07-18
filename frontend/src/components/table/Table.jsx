import { tableData } from "../../data/tableData.jsx"

import { IconDotsFilled } from '@tabler/icons-react';


export function Table({ data }) {
  let properties = [];

  if (data.body[0]) {
    properties = Object.keys(data.body[0]);
  }
  
  return (
    <>

      <table className="w-full rounded-xl p-4">


        <thead>
          <tr>
            {
              tableData.head.map(head => (
                <th className="text-lg font-bold py-2" key={crypto.randomUUID()}>{head.title}</th>
              ))
            }
          </tr>
        </thead>

        <tbody>

        



          {data.body.length === 0 ? (
              <tr>
                <td colSpan={tableData.head.length} className="text-center text-gray-700 text-md py-10">NO HAY DATOS</td>
              </tr>
            ) : (
              data.body.toReversed().map(el => (
                <tr className="" key={crypto.randomUUID()}>


                  {
                    properties.map((property) => {
                        if (data.head.includes(property.toLowerCase())) return (<td className="text-center p-2" key={crypto.randomUUID()}>{el[property]}</td>)
                    })
                  }

                  <td className="flex gap-4 p-2 items-center justify-center">
                    <button className="hover:bg-gray-100 p-2 rounded-full transition-colors cursor-pointer">
                      <IconDotsFilled />
                    </button>
                  </td>

                  {/* <td className="flex gap-4 p-2 items-center justify-center">
                    <EditBtn id={el.id} data={data} setForm={setForm} setEditFormData={setEditFormData} />
                    <DeleteBtn id={el.id} deleteData={deleteData} />
                  </td> */}


                </tr>
              ))
            )}



          </tbody>

          {/* <thead className="">
            <tr className="">
              <th className="text-lg font-bold py-2">NAME</th>
              <th className="text-lg font-bold py-2">PHONE</th>
              <th className="text-lg font-bold py-2">EMAIL</th>
              <th className="text-lg font-bold py-2">AGE</th>
              <th className="text-lg font-bold py-2">DEPARTMENT</th>
              <th className="text-lg font-bold py-2">ACTIONS</th>
            </tr>
          </thead>

          <tbody>

            {data.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center text-gray-700 text-md py-10">NO HAY DATOS</td>
              </tr>
            ) : (
              data.toReversed().map(el => (
                <tr className="" key={crypto.randomUUID()}>
                  <td className="text-center p-2" >{el.name}</td>
                  <td className="text-center p-2" >{el.phone}</td>
                  <td className="text-center p-2" >{el.email}</td>
                  <td className="text-center p-2" >{el.age}</td>
                  <td className="text-center p-2" >{el.department}</td>
                  <td className="flex gap-4 p-2 items-center justify-center">
                    <EditBtn id={el.id} data={data} setForm={setForm} setEditFormData={setEditFormData} />
                    <DeleteBtn id={el.id} deleteData={deleteData} />
                  </td>
                </tr>
              ))
            )}

          </tbody> */}

        </table>
    </>
  )
}