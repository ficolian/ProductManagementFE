import React from 'react'

function PlusIcon({
   className = "w-6 h-6 fill-white"
}) {
   return (
      <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M19 12.998H13V18.998H11V12.998H5V10.998H11V4.99805H13V10.998H19V12.998Z" />
      </svg>
   )
}

export default PlusIcon