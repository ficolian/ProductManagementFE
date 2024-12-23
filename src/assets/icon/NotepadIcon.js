import React from 'react'

function NotepadIcon({
   className = "w-6 h-6 fill-white"
}) {
   return (
      <svg className={ className } viewBox="0 0 24 24">
         <path d="M19 4h-3V2h-2v2h-4V2H8v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm-7 10H7v-2h5v2zm5-4H7V8h10v2z"></path>
      </svg>
   )
}

export default NotepadIcon