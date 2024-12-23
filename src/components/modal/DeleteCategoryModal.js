import React from 'react'
import AppModal from './components/AppModal'

function DeleteCategoryModal({ data, isSubmitting, onClose }) {
    return (
        <AppModal>
            <div className='flex flex-col items-center gap-8'>
                <div className='flex flex-col items-center text-center gap-2'>
                    <p className='font-bold text-lg'>Are you sure you want to delete this category?</p>
                </div>
                <div className='w-full flex gap-2'>
                    <button onClick={onClose} className='flex-1 font-semibold border border-app-matte-black rounded px-4 py-3 text-app-matte-black text-sm'>{"No"}</button>
                    <button disabled={isSubmitting} onClick={data?.onSuccess} className={`${isSubmitting ? "bg-app-light-grey" : "bg-app-matte-black"} flex-1 font-semibold rounded px-4 py-3 text-white text-sm`}>{"Yes"}</button>
                </div>
            </div>
        </AppModal>
    )
}

export default DeleteCategoryModal