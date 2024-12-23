import React from 'react'

function SuccessModal({ onClose, data }) {
    return (
        <div className="fixed top-0 bottom-0 left-0 right-0 flex flex-col items-center justify-center z-40 rounded-lg">
            <div className="bg-white z-50 xl:w-96 h-64 w-64 flex flex-col shadow-md rounded-lg pt-10">
                <div className="success-checkmark">
                    <div className="check-icon">
                        <span className="icon-line line-tip"></span>
                        <span className="icon-line line-long"></span>
                        <div className="icon-circle"></div>
                        <div className="icon-fix"></div>
                    </div>
                </div>
                <p className='mx-auto mb-4'>Success</p>
                <button className='mx-auto bg-app-matte-black text-white w-24 rounded-md py-2'
                    onClick={data?.onSuccess}>
                    Close
                </button>
            </div>
            <div className="fixed top-0 bottom-0 left-0 right-0 bg-app-matte-black opacity-60 z-30" />
        </div>
    )
}

export default SuccessModal