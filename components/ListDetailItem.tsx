import React from 'react'

const ListDetailItem = ({label, values}: {label:string, values: string[]}) => {
    return (
        <div className="space-y-1 flex flex-col  max-w-[200px]">
          <span className="font-medium text-gray-700 text-[15px] min-w-[100px]">{label}:</span>
          {values.length > 0 ? (
            <ul className="list-disc pl-5 text-gray-600">
              {values.map((item, index) => (
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
