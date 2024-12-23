import React from 'react'

function DockTopIcon({
   className = "h-6 w-6 fill-white"
}) {
   return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm0 2v3H5V5zM5 19v-9h14v9z">
        </path>
    </svg>
   )
}

export default DockTopIcon