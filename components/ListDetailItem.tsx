import React from 'react'

const ListDetailItem = ({label, values}: {label:string, values: string[] | string | any}) => {
  // Convert to array if it's not already
  const itemsArray = Array.isArray(values) ? values : values ? [values] : [];
  
  return (
      <div className="space-y-1 flex flex-col max-w-[200px]">
        <span className="font-medium text-gray-700 text-[15px] min-w-[100px]">{label}:</span>
        {itemsArray.length > 0 ? (
          <ul className="list-disc pl-5 text-gray-600">
            {itemsArray.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 italic">None</p>
        )}
      </div>
  )
}

export default ListDetailItem
