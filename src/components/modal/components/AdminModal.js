import CloseSquaredIcon from 'assets/icon/CloseSquaredIcon'
import React, { useEffect } from 'react'

function AdminModal({
   children,
   title,
   onClose,
}) {
   useEffect(() => {
      document.body.classList.add('modal-open')
      return () => document.body.classList.remove('modal-open')
   }, [])

   return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center">
         <div className="flex flex-col items-center justify-center rounded-lg max-h-[90vh] w-10/12 lg:w-8/12 xl:w-6/12">
            <div className="app-add-menu-header-container rounded-t-lg bg-app-matte-black text-white flex justify-between z-40 w-full">
               <h1 className="px-0 sm:px-4 text-sm sm:text-base">{title}</h1>
               <button onClick={onClose}>
                  <CloseSquaredIcon className="h-5 sm:h-6 w-5 sm:w-6 fill-white" />
               </button>
            </div>
            <div className="bg-white z-50 flex flex-col shadow-md rounded-b-lg overflow-y-auto w-full">
               {children}
            </div>
         </div>
         <div className="fixed top-0 bottom-0 left-0 right-0 bg-app-matte-black opacity-60 z-30" />
      </div>
   )
}

export default AdminModal