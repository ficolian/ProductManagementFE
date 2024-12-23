import React from 'react'

function ChevronsLeftIcon({
   className = "w-6 h-6 fill-white"
}) {
   return (
      <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
         <path d="m12.707 7.707-1.414-1.414L5.586 12l5.707 5.707 1.414-1.414L8.414 12z"></path><path d="M16.293 6.293 10.586 12l5.707 5.707 1.414-1.414L13.414 12l4.293-4.293z"></path>
      </svg>
   )
}

export default ChevronsLeftIcon