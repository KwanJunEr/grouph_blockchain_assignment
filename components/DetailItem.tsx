import React from 'react'

const DetailItem = ({label, value}: {label: String, value: String}) => {
  return (
    <div className="flex flex-col  max-w-[200px]">
      <span className="font-medium text-gray-700 text-[15px] min-w-[100px]">{label}:</span>
      <span className="text-gray-600">{value}</span>
    </div>
  )
}

export default DetailItem
