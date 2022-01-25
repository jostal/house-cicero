import Papa from "papaparse";
import { useEffect, useState } from "react";

export default function CsvToJson(props) {
  const [data, setData] = useState([]);
  const [file, setFile] = useState(props.filename);
  
  useEffect(() => {
    Papa.parse(file, {
      header: true,
      download: true,
      dynamicTyping: true,
      complete: function(results) {
        console.log(results.data);
        setData(results.data);
      }
    })
  }, [])

  return (
    <div>
      { data && props.type === 'calendar' && assignedChores(data) }
      { data && props.type === 'todo' && todoChores(data) }
    </div>
  )
}

function assignedChores(data) {
  return (
    <div className="flex flex-col mx-8 py-12">
      <div className="overflow-x-auto -mx-6 lg:-mx-8">
        <div className="inline-block py-2 min-w-full px-6 lg:px-8">
          <div className="overflow-hidden shadow-md rounded-lg">
            <table className="min-w-full">
              <tr className="bg-orange-500 text-left">
                <th className="py-3 px-6 text-sm tracking-wider">Date</th>
                <th className="py-3 px-6 text-sm tracking-wider">Downstairs Washroom</th>
                <th className="py-3 px-6 text-sm tracking-wider">Kitchen</th>
                <th className="py-3 px-6 text-sm tracking-wider">Living Room/Halls</th>
                <th className="py-3 px-6 text-sm tracking-wider2">Upstairs Washroom</th>
              </tr>
              {
                data.map((week) => {
                  return (
                    <tr key={week.Date} className="border-gray-700 odd:bg-stone-700">
                      <td className="py-4 px-6 text-sm whitespace-nowrap">{week.Date}</td>
                      <td className="py-4 px-6 text-sm whitespace-nowrap">{week.Downstairs_Washroom}</td>
                      <td className="py-4 px-6 text-sm whitespace-nowrap">{week.Kitchen}</td>
                      <td className="py-4 px-6 text-sm whitespace-nowrap">{week.Living_Room_Halls}</td>
                      <td className="py-4 px-6 text-sm whitespace-nowrap">{week.Upstairs_Washroom}</td>
                    </tr>
                  )
                })
              }
            </table>
  
          </div>
        </div>
      </div>
    </div>
    
  )}

function todoChores(data) {
  return (
    <div>
      <div className="flex flex-wrap gap-4 lg:gap-0 p-4">
        <div className="w-1/2 border-b border-t lg:border-none lg:mb-6">
          <p><strong>Downstairs Washroom</strong></p><br />
          <ul className="ml-2">
            {data.map((chore) => {
              return <li key={chore.Downstairs_Washroom} className="my-1">{chore.Downstairs_Washroom}</li>
            })}
          </ul>
        </div>
        
        <div className="w-1/2 border-b border-t lg:border-none">
          <p><strong>Kitchen</strong></p>
          <ul className="ml-2">
            {data.map((chore) => {
              return <li key={chore.Downstairs_Washroom} className="my-1">{chore.Kitchen}</li>
              
            })}
          </ul>
        </div>
        
        <div className="w-1/2 border-b border-t lg:border-none">
          <p><strong>Living Room/Halls</strong></p>
          <ul className="ml-2">
            {data.map((chore) => {
              return <li key={chore.Living_Room_Halls} className="my-1">{chore.Living_Room_Halls}</li>
            })}
          </ul>
        </div>
        
        <div className="w-1/2 border-b border-t lg:border-none">
         <p><strong>Upstairs Washroom</strong></p> 
         <ul className="ml-2">
           {data.map((chore) => {
             return <li key={chore.Upstairs_Washroom} className="my-1">{chore.Upstairs_Washroom}</li>
           })}
         </ul>
        </div>
        
      </div>
      
    </div>
  )
}
