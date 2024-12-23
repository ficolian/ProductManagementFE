import React from 'react'

function LoadingModal({ onClose }) {
   return (
    <div className=" fixed top-0 bottom-0 left-0 right-0 flex flex-col items-center justify-center z-50 rounded-lg">
        <div className="z-50 lds-ring"><div></div><div></div><div></div><div></div></div>
        <div className="fixed top-0 bottom-0 left-0 right-0 bg-app-matte-black opacity-60 z-30" />
    </div>
   )
}

export default LoadingModal