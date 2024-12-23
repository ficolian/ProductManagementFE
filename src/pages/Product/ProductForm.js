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


export default function ProductForm(){
    let navigate = useNavigate()

    const{ fetch: insertKost } = useFetch(ApiInsertKost)
    const{ fetch: updateKost } = useFetch(ApiUpdateKost)
    const{ fetch: deleteCommon } = useFetch(ApiDeleteKost)
    
    let queryString = new URLSearchParams(window.location.search)
    let formType = queryString.get("formType")
    let id = queryString.get("productId")
    
    const{ fetch: getKostById } = useFetch(ApiGetKostById(id))

    const [productId, setProductId] = useState(EmptyString)
    const [productName, setProductName] = useState(EmptyString)
    const [price, setPrice] = useState(0.0)
    const [description, setDescription] = useState(EmptyString)
    
    const [errorProductId, setErrorProductId] = useState(false)
    const [errorProductName, setErrorProductName] = useState(false)
    const [errorDescription, setErrorDescription] = useState(false)
    const [errorPrice, setErrorPrice] = useState(false)

    
    const [tableRow, setTableRow] = useState([])

    const [kostIdDisabled, setKostIdDisabled] = useState(true)

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
                fGetKostById(productId)
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
                productName: productName,
                description: description,
                price: price
            }
        }).then((response) => {
            if(response.status === ApiResponseSuccess){
                setSuccessModal({ isOpen: true, data: { onSuccess: async () => { navigate("/product") }} })
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
                productId: productId,
                productName: productName,
                description: description,
                price: price,
                updateId: localStorage.getItem("Id")
            }
        }).then((response) => {
            if(response.status === ApiResponseSuccess){
                setSuccessModal({ isOpen: true, data: { onSuccess: async () => { navigate("/product") }} })
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
    async function fGetKostById(productId){
        await getKostById({
            data: {
                productId: productId
            }
        }).then((response) => {
            if(response.status === ApiResponseSuccess){
                let data = response.data
                setProductId(data.productId)
                setDescription(data.description)
                setProductName(data.productName)
                setPrice(data.price)
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
    async function fDeleteKost(productId){
        setLoading(true)

        await deleteCommon({
            data: {
                productId: productId,
            }
        }).then((response) => {
            if(response.status === ApiResponseSuccess){
                setSuccessModal({ 
                    isOpen: true, 
                    data: {
                        onSuccess: async () => {
                            setSuccessModal({ isOpen: false })
                            navigate("/product")
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
            fDeleteKost(productId)
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
                {/* Product Id */}
                <div>
                    <div className="flex items-center">
                        <div className="w-48">
                            <span>Product Id</span>
                        </div>
                        <div className="px-4">
                            <span>:</span>
                        </div>
                        <div className="w-72">
                            <input className="input" value={productId} onChange={(e) => { setProductId(e.target.value) }} disabled={kostIdDisabled} />
                        </div>
                    </div>
                    <div className={`flex items-center ${errorProductId ? 'block' : 'hidden'}`}>
                        <div className="w-48" />
                        <div className="w-9" />
                        <span className="text-red-500">Product Id is required!</span>
                    </div>
                </div>

                {/* Kost Name */}
                <div>
                    <div className="flex items-center">
                        <div className="w-48">
                            <span>Product Name</span>
                        </div>
                        <div className="px-4">
                            <span>:</span>
                        </div>
                        <div className="w-72">
                            <input className="input" value={productName} onChange={(e) => { setProductName(e.target.value) }} />
                        </div>
                    </div>
                    <div className={`flex items-center ${errorProductName ? 'block' : 'hidden'}`}>
                        <div className="w-48" />
                        <div className="w-9" />
                        <span className="text-red-500">Product Name is required!</span>
                    </div>
                </div>

                {/* City */}
                <div>
                    <div className="flex items-center">
                        <div className="w-48">
                            <span>Description</span>
                        </div>
                        <div className="px-4">
                            <span>:</span>
                        </div>
                        <div className="w-72">
                            <input className="input" value={description} onChange={(e) => { setDescription(e.target.value) }} />
                        </div>
                    </div>
                    <div className={`flex items-center ${ errorDescription ? 'block' : 'hidden' }`}>
                        <div className="w-48" />
                        <div className="w-9" />
                        <span className="text-red-500">Description is required!</span>
                    </div>
                </div>

                {/* price */}
                <div>
                    <div className="flex items-center">
                        <div className="w-48">
                            <span>Price</span>
                        </div>
                        <div className="px-4">
                            <span>:</span>
                        </div>
                        <div className="w-72">
                            <input className="input" type="number" value={ price } onChange={(e) => { setPrice(e.target.value) }} />
                        </div>
                    </div>
                    <div className={`flex items-center ${ errorPrice ? 'block' : 'hidden' }`}>
                        <div className="w-48" />
                        <div className="w-9" />
                        <span className="text-red-500">Price is required!</span>
                    </div>
                </div>
            </div>


            <div className="mt-5 flex justify-end gap-2">
                <BackButton onClick={() => { navigate("/product") }} />
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