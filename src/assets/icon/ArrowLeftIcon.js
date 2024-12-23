import React from 'react'

function ArrowLeftIcon({
   className = "w-6 h-6 fill-app-matte-black"
}) {
   return (
      <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z" />
      </svg>

   )
}

export default ArrowLeftIcon