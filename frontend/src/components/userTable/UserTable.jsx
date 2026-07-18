

//import { tableData } from "../../data/tableData.jsx"

import { IconDotsFilled } from '@tabler/icons-react';
import { helpHttp } from '../../helpers/helpHttp';
import { BASE_URL } from '../../const/const';


import { UserTableButton } from './UserTableButton';


import { Checkbox } from '@heroui/react';


import { useState, useEffect } from 'react';


export function UserTable({ data }) {
  //let properties = [];

  // const [data, setData] = useState({ ...dataParam, body: [] });

  // //let data = dataParam;



  // const getUsers = () => {
  //   const { get } = helpHttp();

  //   get(`${BASE_URL}/users`)
  //     .then(res => {
  //       console.log(res.data);

  //       //data.body = res.data;

  //       setData({ ...dataParam, body: res.data });

  //     })
  //     .catch(err => console.log(err));
  // }


  // useEffect(() => {
  //   getUsers();
  // }, []);




  // if (data.body[0]) {
  //   properties = Object.keys(data.body[0]);
  // }


  //getUsers();



  return (
    <>
      <table className="w-full rounded-xl p-4">

        <thead className="border border-gray-800">
          <tr>
            <th className="text-md font-bold py-2 px-4">
              <Checkbox name="basic-terms">
                <Checkbox.Content>
                  <Checkbox.Control>
                    <Checkbox.Indicator />
                  </Checkbox.Control>
                </Checkbox.Content>
              </Checkbox>
            </th>
            {
              data.head.map(head => (
                <th className="text-sm font-bold py-2 text-start px-8" key={crypto.randomUUID()}>{head.title}</th>
              ))
            }
            <th className="text-sm font-bold py-2 px-4"></th>
          </tr>
        </thead>

        <tbody className=''>

          {data.body.length === 0 ? (
            <tr>
              <td colSpan={data.head.length} className="text-center text-gray-700 text-md py-10 px-8">NO HAY DATOS</td>
            </tr>
          ) : (
            data.body.map(el => (

              <tr className="border border-gray-800 hover:bg-gray-900" key={crypto.randomUUID()}>

                <td className="p-2 px-4">
                  <Checkbox name="basic-terms">
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
                      return (<td className="p-2 px-8 text-sm" key={crypto.randomUUID()}>{head.schema(el[head.name])}</td>);
                    }
                    return (<td className="p-2 px-8 text-sm" key={crypto.randomUUID()}><span>{el[head.name]}</span></td>)
                  })
                }

                <td className="flex p-2 items-center justify-center px-4">
                  <button className="hover:bg-gray-100 p-2 rounded-md transition-colors cursor-pointer">
                    <IconDotsFilled size={16} />
                  </button>
                </td>

              </tr>
            ))
          )}

        </tbody>

      </table>
    </>
  )
}