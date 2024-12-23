import React from 'react'
import failedIcon from '../../assets/images/failed_icon.svg'
import { DefaultErrorMessage, EmptyString, Undefined } from 'utils/Constant'

function FailModal({ onClose, data, message }) {
    return (
        <div className=" fixed top-0 bottom-0 left-0 right-0 flex flex-col items-center justify-center z-40 rounded-lg">
            <div className='zoom-in-out-box z-50'>
                <div className="bg-white z-50 xl:w-96 pb-6 w-56 flex flex-col shadow-md rounded-lg pt-6">
                    <div className="mx-auto pb-2">
                        <img className='w-24' src={failedIcon} alt="failed" />
                    </div>
                    <p className='mx-auto mb-4 px-5 text-center'>{typeof message === Undefined ? DefaultErrorMessage : (message === EmptyString ? DefaultErrorMessage : message)}</p>
                    <button className='mx-auto bg-app-matte-black text-white w-24 rounded-md py-2'
                        onClick={data?.onSuccess}>
                        Close
                    </button>
                </div>
            </div>
            <div className="fixed top-0 bottom-0 left-0 right-0 bg-app-matte-black opacity-60 z-30" />
        </div>
    )
}

export default FailModal