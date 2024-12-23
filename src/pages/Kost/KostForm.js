import React, {useState, useEffect} from "react";
import BackButton from "components/Button/BackButton";
import SaveButton from "components/Button/SaveButton";
import DeleteButton from "components/Button/DeleteButton";
import useFetch from "utils/hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { ApiResponseStatusUnauthorized, ApiResponseSuccess, EmptyString, FormTypeAdd, FormTypeEdit } from "utils/Constant";
import FailModal from "components/modal/FailModal";
import LoadingModal from "components/modal/LoadingModal";
import SuccessModal from "components/modal/SuccessModal";
import ConfirmationModal from "components/modal/ConfirmationModal";
import { ApiDeleteKost, ApiGetKostById, ApiInsertKost, ApiUpdateKost } from "utils/constants/api";


export default function KostForm(){
    let navigate = useNavigate()

    const{ fetch: insertKost } = useFetch(ApiInsertKost)
    const{ fetch: updateKost } = useFetch(ApiUpdateKost)
    const{ fetch: deleteCommon } = useFetch(ApiDeleteKost)
    const{ fetch: getKostById } = useFetch(ApiGetKostById)

    let queryString = new URLSearchParams(window.location.search)
    let formType = queryString.get("formType")
    let paramKostId = queryString.get("kostId")
    
    const [kostId, setKostId] = useState(EmptyString)
    const [kostCode, setKostCode] = useState(EmptyString)
    const [kostName, setKostName] = useState(EmptyString)
    const [address, setAddress] = useState(EmptyString)
    const [city, setCity] = useState(EmptyString)
    const [province, setProvince] = useState(EmptyString)
    const [postalCode, setPostalCode] = useState(EmptyString)
    const [picName, setPicName] = useState(EmptyString)
    const [picPhone, setPicPhone] = useState(EmptyString)

    
    const [errorKostId, setErrorKostId] = useState(false)
    const [errorKostCode, setErrorKostCode] = useState(false)
    const [errorKostName, setErrorKostName] = useState(false)
    const [errorAddress, setErrorAddress] = useState(false)
    const [errorCity, setErrorCity] = useState(false)
    const [errorProvince, setErrorProvince] = useState(false)
    const [errorPostalCode, setErrorPostalCode] = useState(false)
    const [errorPicName, setErrorPicName] = useState(false)
    const [errorPicPhone, setErrorPicPhone] = useState(false)

    
    const [tableRow, setTableRow] = useState([])

    const [kostIdDisabled, setKostIdDisabled] = useState(true)
    const [kostCodeDisabled, setKostCodeDisabled] = useState(false)

    // Modal
    const [failModal, setFailModal] = useState({ isOpen: false, data: {}, message: EmptyString })
	const [loading, setLoading] = useState(false)
    const [successModal, setSuccessModal] = useState({ isOpen: false, data: {} })
    const [confirmationModal, setConfirmationModal] = useState({ isOpen: false, data: {} })

    useEffect(() => {
        if(formType === FormTypeAdd){
            //setKostCodeDisabled(false)
            //setSystemIdDisabled(false)
        }else{
            // setSystemIdDisabled(true)
            setLoading(true)

            Promise.all([
                fGetKostById(paramKostId)
            ]).then(() => {
                setLoading(false)
            })
            
        }
    }, [formType])

    // Function Api Call
    function fInsertKost(){
        setLoading(true)

        insertKost({
            data: {
                kostName: kostName,
                kostCode: kostCode,
                address: address,
                city: city,
                province: province,
                postalCode: postalCode,
                picName: picName,
                picPhone: picPhone,
                updateId: localStorage.getItem("Id")
            }
        }).then((response) => {
            if(response.status === ApiResponseSuccess){
                setSuccessModal({ isOpen: true, data: { onSuccess: async () => { navigate("/kost-list") }} })
            }else if(response.status === ApiResponseStatusUnauthorized){
                setFailModal({
                    isOpen: true,
                    data: {
                        onSuccess: async () => {
                            setFailModal({isOpen: false})
                            window.location.href = "/login"
                        }
                    },
                    message: response.message
                })
            }else{
                setFailModal({
                    isOpen: true,
                    data: {
                        onSuccess: async () => {
                            setFailModal({isOpen: false})
                        }
                    },
                    message: response.message
                })
            }
        }).finally(() => {
            setLoading(false)
        })
    }
    function fUpdateKost(){
        updateKost({
            data: {
                kostId: paramKostId,
                kostCode: kostCode,
                kostName: kostName,
                address: address,
                city: city,
                province: province,
                postalCode: postalCode,
                picName: picName,
                picPhone: picPhone,
                updateId: localStorage.getItem("Id")
            }
        }).then((response) => {
            if(response.status === ApiResponseSuccess){
                setSuccessModal({ isOpen: true, data: { onSuccess: async () => { navigate("/kost-list") }} })
            }else if(response.status === ApiResponseStatusUnauthorized){
                setFailModal({
                    isOpen: true,
                    data: {
                        onSuccess: async () => {
                            setFailModal({isOpen: false})
                            window.location.href = "/login"
                        }
                    },
                    message: response.message
                })
            }else{
                setFailModal({
                    isOpen: true,
                    data: {
                        onSuccess: async () => {
                            setFailModal({isOpen: false})
                        }
                    },
                    message: response.message
                })
            }
        })
    }
    async function fGetKostById(paramKostId){
        await getKostById({
            data: {
                kostId: paramKostId
            }
        }).then((response) => {
            if(response.status === ApiResponseSuccess){
                let data = response.data
                setKostId(data.kostId)
                setKostCode(data.kostCode)
                setKostName(data.kostName)
                setAddress(data.address)
                setCity(data.city)
                setProvince(data.province)
                setPostalCode(data.postalCode)
                setPicName(data.picName)
                setPicPhone(data.picPhone)
            }else if(response.status === ApiResponseStatusUnauthorized){
                setFailModal({
                    isOpen: true,
                    data: {
                        onSuccess: async () => {
                            setFailModal({isOpen: false})
                            window.location.href = "/login"
                        }
                    },
                    message: response.message
                })
            }else{
                setFailModal({
                    isOpen: true,
                    data: {
                        onSuccess: async () => {
                            setFailModal({isOpen: false})
                        }
                    },
                    message: response.message
                })
            }
        })
    }
    async function fDeleteKost(paramKostId){
        setLoading(true)

        await deleteCommon({
            data: {
                kostId: paramKostId,
                updateId: localStorage.getItem("Id")
            }
        }).then((response) => {
            if(response.status === ApiResponseSuccess){
                setSuccessModal({ 
                    isOpen: true, 
                    data: {
                        onSuccess: async () => {
                            setSuccessModal({ isOpen: false })
                            navigate("/kost-list")
                        }
                    }
                })
            }else if(response.status === ApiResponseStatusUnauthorized){
                setFailModal({
                    isOpen: true,
                    data: {
                        onSuccess: async () => {
                            setFailModal({ isOpen: false })
                            window.location.href = "/login"
                        }
                    },
                    message: response.message
                })
            }else{
                setFailModal({
                    isOpen: true,
                    data: {
                        onSuccess: async () => {
                            setFailModal({ isOpen: false })
                        }
                    },
                    message: response.message
                })
            }
        }).finally(() => {
            setLoading(false)
        })
    }

    // Function Button
    function fSaveBtnClick(){
        if(fFormValidation()){
            setConfirmationModal({ isOpen: true, data: { onSuccess: async () => { 
                setConfirmationModal({ isOpen: false })
                if(formType === FormTypeAdd){
                    fInsertKost() 
                }else{
                    fUpdateKost()
                }
            }}})
        }
    }
    function fDeleteBtnClick(){
        setConfirmationModal({ isOpen: true, data: { onSuccess: async () => { 
            setConfirmationModal({ isOpen: false })
            fDeleteKost(paramKostId)
        }}})
    }

    // Function
    function fFormValidation(){
        let errorCount = 0
            //console.log(tableRow)
        // if(systemId === EmptyString){
        //     errorCount = errorCount + 1
        //     setErrorSystemId(true)
        // }else{
        //     setErrorSystemId(false)
        // }

        if(errorCount > 0){
            return false
        }else{
            return true
        }
    }

    

    return(
        <div className="flex flex-col gap-2">
            <div>
                <span className="font-semibold text-2xl">Kost Detail - {formType}</span>
            </div>
            <hr />

            <div className="mt-5 flex flex-col gap-3">
                {/* Kost Id */}
                <div>
                    <div className="flex items-center">
                        <div className="w-48">
                            <span>Kost Id</span>
                        </div>
                        <div className="px-4">
                            <span>:</span>
                        </div>
                        <div className="w-72">
                            <input className="input" value={kostId} onChange={(e) => { setKostId(e.target.value) }} disabled={kostIdDisabled} />
                        </div>
                    </div>
                    <div className={`flex items-center ${errorKostId ? 'block' : 'hidden'}`}>
                        <div className="w-48" />
                        <div className="w-9" />
                        <span className="text-red-500">Kost Id is required!</span>
                    </div>
                </div>

                {/* Kost Code */}
                <div>
                    <div className="flex items-center">
                        <div className="w-48">
                            <span>Kost Code</span>
                        </div>
                        <div className="px-4">
                            <span>:</span>
                        </div>
                        <div className="w-72">
                            <input className="input" value={ kostCode } onChange={(e) => { setKostCode(e.target.value) }} disabled={ kostCodeDisabled } />
                        </div>
                    </div>
                    <div className={`flex items-center ${errorKostCode ? 'block' : 'hidden'}`}>
                        <div className="w-48" />
                        <div className="w-9" />
                        <span className="text-red-500">Kost Id is required!</span>
                    </div>
                </div>

                {/* Kost Name */}
                <div>
                    <div className="flex items-center">
                        <div className="w-48">
                            <span>Kost Name</span>
                        </div>
                        <div className="px-4">
                            <span>:</span>
                        </div>
                        <div className="w-72">
                            <input className="input" value={kostName} onChange={(e) => { setKostName(e.target.value) }} />
                        </div>
                    </div>
                    <div className={`flex items-center ${errorKostName ? 'block' : 'hidden'}`}>
                        <div className="w-48" />
                        <div className="w-9" />
                        <span className="text-red-500">Kost Name is required!</span>
                    </div>
                </div>

                {/* Address */}
                <div>
                    <div className="flex items-start">
                        <div className="w-48 pt-2">
                            <span>Address</span>
                        </div>
                        <div className="px-4 pt-2">
                            <span>:</span>
                        </div>
                        <div className="w-72">
                            <textarea className="input" value={address} onChange={(e) => { setAddress(e.target.value) }} />
                        </div>
                    </div>
                    <div className={`flex items-center ${ errorAddress ? 'block' : 'hidden' }`}>
                        <div className="w-48" />
                        <div className="w-9" />
                        <span className="text-red-500">Address is required!</span>
                    </div>
                </div>

                {/* City */}
                <div>
                    <div className="flex items-center">
                        <div className="w-48">
                            <span>City</span>
                        </div>
                        <div className="px-4">
                            <span>:</span>
                        </div>
                        <div className="w-72">
                            <input className="input" value={city} onChange={(e) => { setCity(e.target.value) }} />
                        </div>
                    </div>
                    <div className={`flex items-center ${ errorCity ? 'block' : 'hidden' }`}>
                        <div className="w-48" />
                        <div className="w-9" />
                        <span className="text-red-500">City is required!</span>
                    </div>
                </div>

                {/* Province */}
                <div>
                    <div className="flex items-center">
                        <div className="w-48">
                            <span>Province</span>
                        </div>
                        <div className="px-4">
                            <span>:</span>
                        </div>
                        <div className="w-72">
                            <input className="input" value={province} onChange={(e) => { setProvince(e.target.value) }} />
                        </div>
                    </div>
                    <div className={`flex items-center ${ errorProvince ? 'block' : 'hidden' }`}>
                        <div className="w-48" />
                        <div className="w-9" />
                        <span className="text-red-500">Province is required!</span>
                    </div>
                </div>

                {/* Postal Code */}
                <div>
                    <div className="flex items-center">
                        <div className="w-48">
                            <span>Postal Code</span>
                        </div>
                        <div className="px-4">
                            <span>:</span>
                        </div>
                        <div className="w-72">
                            <input className="input" value={ postalCode } onChange={(e) => { setPostalCode(e.target.value) }} />
                        </div>
                    </div>
                    <div className={`flex items-center ${ errorPostalCode ? 'block' : 'hidden' }`}>
                        <div className="w-48" />
                        <div className="w-9" />
                        <span className="text-red-500">Postal Code is required!</span>
                    </div>
                </div>

                {/* PIC Name */}
                <div>
                    <div className="flex items-center">
                        <div className="w-48">
                            <span>PIC Name</span>
                        </div>
                        <div className="px-4">
                            <span>:</span>
                        </div>
                        <div className="w-72">
                            <input className="input" value={ picName } onChange={(e) => { setPicName(e.target.value) }} />
                        </div>
                    </div>
                    <div className={`flex items-center ${ errorPicName ? 'block' : 'hidden' }`}>
                        <div className="w-48" />
                        <div className="w-9" />
                        <span className="text-red-500">PIC Name is required!</span>
                    </div>
                </div>

                {/* PIC Phone */}
                <div>
                    <div className="flex items-center">
                        <div className="w-48">
                            <span>PIC Phone</span>
                        </div>
                        <div className="px-4">
                            <span>:</span>
                        </div>
                        <div className="w-72">
                            <input className="input" value={ picPhone } onChange={(e) => { setPicPhone(e.target.value) }} />
                        </div>
                    </div>
                    <div className={`flex items-center ${ errorPicPhone ? 'block' : 'hidden' }`}>
                        <div className="w-48" />
                        <div className="w-9" />
                        <span className="text-red-500">PIC Phone is required!</span>
                    </div>
                </div>
            </div>


            <div className="mt-5 flex justify-end gap-2">
                <BackButton onClick={() => { navigate("/kost-list") }} />
                <DeleteButton onClick={() => { fDeleteBtnClick() }} visible={formType === FormTypeEdit ? true : false} />
                <SaveButton onClick={() => { fSaveBtnClick() }} visible={true} />
            </div>

            {/* Modal */}
			{failModal.isOpen && ( <FailModal onClose={() => setFailModal({ isOpen: false, data: {}, message: EmptyString })} data={failModal?.data} message={failModal?.message} /> )}
			{loading ? (<LoadingModal />) : (<div />)}
            {successModal.isOpen && ( <SuccessModal onClose={() => setSuccessModal({ isOpen: false, data: {} })} data={successModal?.data} /> )}
            {confirmationModal.isOpen && ( <ConfirmationModal onClose={() => setConfirmationModal({ isOpen: false, data: {} })} data={confirmationModal?.data} /> )}
        </div>


    )
}