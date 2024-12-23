import CloseSquaredIcon from '../../../assets/icon/CloseSquaredIcon'
import React, { useEffect } from 'react'

function AppModal({
   withClose,
   onClose,
   children,
}) {
   useEffect(() => {
      document.body.classList.add('modal-open')
      return () => document.body.classList.remove('modal-open')
   }, [])

   return (
      <div className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center z-40">
         <div className="bg-white z-50 app-modal-width p-4 sm:p-8 flex flex-col gap-6 shadow-md rounded">
            {withClose && (
               <div className="text-right">
                  <button onClick={onClose}>
                     <CloseSquaredIcon />
                  </button>
               </div>
            )}
            {children}
         </div>
         <div className="fixed top-0 bottom-0 left-0 right-0 bg-app-matte-black opacity-60 z-40" />
      </div>
   )
}

export default AppModal