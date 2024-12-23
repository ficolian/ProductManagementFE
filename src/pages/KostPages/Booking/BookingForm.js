import BackButton from "components/Button/BackButton"
import DeleteButton from "components/Button/DeleteButton"
import SaveButton from "components/Button/SaveButton"
import DatePicker from "components/Input/DatePicker"
import Dropdown from "components/Input/Dropdown"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ApiResponseStatusUnauthorized, ApiResponseSuccess, DateNullDefault, EmptyString, FormTypeAdd, FormTypeEdit, GuidDefault } from "utils/Constant"
import { ApiDeleteTenant, ApiGetBookingById, ApiGetBookingRoom, ApiGetBookingTenant, ApiGetSystemSettingById, ApiInsertBooking, ApiUpdateBooking } from "utils/constants/api"
import useFetch from "utils/hooks/useFetch"
import FailModal from "components/modal/FailModal";
import LoadingModal from "components/modal/LoadingModal";
import SuccessModal from "components/modal/SuccessModal";
import ConfirmationModal from "components/modal/ConfirmationModal";
import moment from "moment"

export default function BookingForm(){
    const navigate = useNavigate()

    const { fetch: insertBooking } = useFetch(ApiInsertBooking)
    const { fetch: updateBooking } = useFetch(ApiUpdateBooking)
    const { fetch: deleteTenant } = useFetch(ApiDeleteTenant)
    const { fetch: getBookingById } = useFetch(ApiGetBookingById)
    const { fetch: getSystemSetting } = useFetch(ApiGetSystemSettingById)
    const { fetch: getBookingTenant } = useFetch(ApiGetBookingTenant)
    const { fetch: getBookingRoom } = useFetch(ApiGetBookingRoom)

    let queryString = new URLSearchParams(window.location.search)
    let formType = queryString.get("formType")
    let paramBookingId = queryString.get("bookingId")

    // Modal
    const [failModal, setFailModal] = useState({ isOpen: false, data: {}, message: EmptyString })
    const [loading, setLoading] = useState(false)
    const [successModal, setSuccessModal] = useState({ isOpen: false, data: {} })
    const [confirmationModal, setConfirmationModal] = useState({ isOpen: false, data: {} })

    const [bookingCode, setBookingCode] = useState(EmptyString)
    const [bookingDate, setBookingDate] = useState(EmptyString)
    const [bookingType, setBookingType] = useState(EmptyString)
    const [roomId, setRoomId] = useState(EmptyString)
    const [tenantId, setTenantId] = useState(EmptyString)
    const [checkInDate, setCheckInDate] = useState(EmptyString)
    const [checkOutDate, setCheckOutDate] = useState(EmptyString)
    const [createDate, setCreateDate] = useState(EmptyString)
    const [status, setStatus] = useState(EmptyString)
    const [updateDate, setUpdateDate] = useState(EmptyString)
    const [updateBy, setUpdateBy] = useState(EmptyString)

    const [tableRow, setTableRow] = useState([])

    const [deleteBtnVisible, setDeleteBtnVisible] = useState(true)
    const [tenantOptionDisabled, setTenantOptionDisabled] = useState(false)
    const [bookingDateDisabled, setBookingDateDisabled] = useState(false)
    const [checkInDateDisabled, setCheckInDateDisabled] = useState(false)

    // Dropdown options
    const [tenantOptions, setTenantOptions] = useState([])
    const [roomOptions, setRoomOptions] = useState([])
    const [bookingTypeOptions, setBookingTypeOptions] = useState([])

    // Error
    const [errorTenantId, setErrorTenantId] = useState(false)
    const [errorTenantName, setErrorTenantName] = useState(false)
    const [errorPlaceOfBirth, setErrorPlaceOfBirth] = useState(false)
    const [errorDateOfBirth, setErrorDateOfBirth] = useState(false)

    const [bookingCodeDisabled, setSetBookingCodeDisabled] = useState(true)

    useEffect(() => {
        setLoading(true)

        Promise.all([
            fGetBookingTenant(),
            fGetBookingType()
            //fGetRelation()
        ]).then(() => {
            if (formType === FormTypeEdit){
                // Promise.all([

                // ])
                fGetBookingById()
                setTenantOptionDisabled(true)
                setBookingDateDisabled(true)
            }else{
                setDeleteBtnVisible(false)
                setBookingDate(new Date())
            }
        }).finally(() => {
            setLoading(false)
        })

    }, [])

    function fSaveBtnClick(){
        setConfirmationModal({ isOpen: true, data: { onSuccess: async () => { 
            setConfirmationModal({ isOpen: false })
            if (formType === FormTypeAdd){
                fInsertBooking()
            }else{
                fUpdateBooking()
            }
        }}})
    }
    function fDeleteBtnClick(){
        setConfirmationModal({ isOpen: true, data: { onSuccess: async () => { 
            setConfirmationModal({ isOpen: false })
            //fDeleteTenant()
        }}})
    }

    // Function Api Call
    function fInsertBooking(){
        setLoading(true)

        insertBooking({
            data:{
                kostId: localStorage.getItem("KostId"),
                kostCode: localStorage.getItem("KostCode"), 
                bookingDate: moment(bookingDate).format("yyyy-MM-DD"),
                bookingType: bookingType,
                roomId: roomId,
                tenantId: tenantId,
                checkInDate: moment(checkInDate).format("yyyy-MM-DD"),
                checkOutDate: checkOutDate === "" ? null : moment(checkOutDate).format("yyyy-MM-DD"),
                updateId: localStorage.getItem("Id")
            }
        }).then((response) => {
            if(response.status === ApiResponseSuccess){
                setSuccessModal({ isOpen: true, data: { onSuccess: async () => { navigate("/kost/booking") }} })
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
    function fUpdateBooking(){
        setLoading(true)

        updateBooking({
            data:{
                kostId: localStorage.getItem("KostId"),
                bookingId: paramBookingId,
                checkInDate: moment(checkInDate).format("yyyy-MM-DD"),
                checkOutDate: checkOutDate === "" ? null : moment(checkOutDate).format("yyyy-MM-DD"),
                roomId: roomId,
                updateId: localStorage.getItem("Id")
            }
        }).then((response) => {
            if(response.status === ApiResponseSuccess){
                setSuccessModal({ isOpen: true, data: { onSuccess: async () => { navigate("/kost/booking") }} })
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
    // function fDeleteTenant(){
    //     setLoading(true)

    //     deleteTenant({
    //         data: {
    //             kostId: localStorage.getItem("KostId"),
    //             tenantId: paramTenantId,
    //             updateId: localStorage.getItem("Id")
    //         }
    //     }).then((response) => {
    //         if(response.status === ApiResponseSuccess){
    //             setSuccessModal({ isOpen: true, data: { onSuccess: async () => { navigate("/kost/tenant") }} })
    //         }else if(response.status === ApiResponseStatusUnauthorized){
    //             setFailModal({
    //                 isOpen: true,
    //                 data: {
    //                     onSuccess: async () => {
    //                         setFailModal({isOpen: false})
    //                         window.location.href = "/login"
    //                     }
    //                 },
    //                 message: response.message
    //             })
    //         }else{
    //             setFailModal({
    //                 isOpen: true,
    //                 data: {
    //                     onSuccess: async () => {
    //                         setFailModal({isOpen: false})
    //                     }
    //                 },
    //                 message: response.message
    //             })
    //         }
    //     }).finally(() => {
    //         setLoading(false)
    //     })
    // }
    async function fGetBookingById(){
        await getBookingById({
            data: {
                kostId: localStorage.getItem("KostId"),
                bookingId: paramBookingId
            }
        }).then((response) => {
            if(response.status === ApiResponseSuccess){
                let data = response?.data
                setBookingCode(data.bookingCode)
                setBookingDate(data.bookingDate)
                setCheckInDate(data.checkInDate)
                if (data.checkOutDate !== DateNullDefault){
                    setCheckOutDate(data.checkOutDate)
                }

                if (new Date(data.checkInDate) <= new Date){
                    setCheckInDateDisabled(true)
                }
                setBookingType(data.bookingType)
                Promise.all([
                    fGetBookingRoom(data.checkInDate, data.roomNumber, data.roomId)                    
                ]).then(() => {
                    setRoomId(data.roomId)
                })
                
                setTenantId({ label: data.tenantName, value: data.tenantId })
                
                setCreateDate(moment(data.createDate).format("DD MMM yyyy"))
                setUpdateDate(moment(data.updateDate).format("DD MMM yyyy"))
                setUpdateBy(data.updateBy)
                setStatus(data.bookingStatus)

                if (data?.status === "Delete"){
                    setDeleteBtnVisible(false)
                }
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

    async function fGetBookingTenant(){
        await getBookingTenant({
            data: {
                kostId: localStorage.getItem("KostId")
            }
        }).then((response) => {
            if(response.status === ApiResponseSuccess){
                let data = response.data
                let tempArray = []

                for (let i = 0; i < data.length; i++){
                    tempArray.push({ label: data[i].name, value: data[i].tenantId })
                }
                
                setTenantOptions(tempArray)
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
    async function fGetBookingRoom(checkInDate, roomNumber, roomId){
        await getBookingRoom({
            data: {
                kostId: localStorage.getItem("KostId"),
                checkInDate: moment(checkInDate).format("yyyy-MM-DD")
            }
        }).then((response) => {
            if(response.status === ApiResponseSuccess){
                let data = response.data
                let tempArray = []

                if (roomNumber !== null && roomId !== null){
                    tempArray.push({ label: roomNumber, value: roomId })
                }

                for (let i = 0; i < data.length; i++){
                    tempArray.push({ label: data[i].roomNumber, value: data[i].roomId })
                }

                setRoomOptions(tempArray)
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
    async function fGetBookingType(){
        await getSystemSetting({
            data: {
                kostId: GuidDefault,
                systemId: "BookingType"
            }
        }).then((response) => {
            if(response.status === ApiResponseSuccess){
                let data = response.data
                let tempArray = []

                for (let i = 0; i < data.length; i++){
                    tempArray.push({ label: data[i].systemText, value: data[i].systemValue })
                }

                setBookingTypeOptions(tempArray)
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

    // Function
    function fBookingDateChange(e){
        setBookingDate(e)
    } 
    function fCheckInDateChange(e){
        setCheckInDate(e)
        
        setLoading(true)
        Promise.all([
            fGetBookingRoom(e, null, null)
        ]).then(() => {
            setLoading(false)
        })
    }


    return (
        <div className="flex flex-col gap-2">
            <div>
                <span className="font-semibold text-2xl">Booking Detail - { formType }</span>
            </div>
            <hr />

            <div className="mt-5 flex flex-col gap-3">
                {/* Booking Code & Create Date */}
                <div>
                    <div className="flex">
                        <div className="flex items-center w-full lg:w-8/12">
                            <div className="w-48">
                                <span>Booking Code</span>
                            </div>
                            <div className="px-4">
                                <span>:</span>
                            </div>
                            <div className="w-72">
                                <input className="input" value={ bookingCode } onChange={(e) => { setBookingCode(e.target.value) }} disabled={ bookingCodeDisabled } />
                            </div>
                        </div>
                        <div className="hidden lg:flex items-center">
                            <div className="w-32">
                                <span>Create Date</span>
                            </div>
                            <div className="px-4">
                                <span>:</span>
                            </div>
                            <div className="">
                                <span>{ createDate }</span>
                            </div>
                        </div>
                    </div>
                    <div className={`flex items-center ${ errorTenantId ? 'block' : 'hidden' }`}>
                        <div className="w-48" />
                        <div className="w-9" />
                        <span className="text-red-500">Tenant Id is required!</span>
                    </div>
                </div>

                {/* Booking Date & Status */}
                <div>
                    <div className="flex">
                        <div className="flex items-center w-full lg:w-8/12">
                            <div className="w-48">
                                <span>Booking Date</span>
                            </div>
                            <div className="px-4">
                                <span>:</span>
                            </div>
                            <div className="w-72">
                                <DatePicker className="w-full h-12" value={ bookingDate } onChange={(e) => { fBookingDateChange(e) }} disabled={ bookingDateDisabled } />
                            </div>
                        </div>
                        <div className="hidden lg:flex items-center">
                            <div className="w-32">
                                <span>Status</span>
                            </div>
                            <div className="px-4">
                                <span>:</span>
                            </div>
                            <div className="">
                                <span>{ status }</span>
                            </div>
                        </div>
                    </div>
                    <div className={`flex items-center ${ errorTenantName ? 'block' : 'hidden' }`}>
                        <div className="w-48" />
                        <div className="w-9" />
                        <span className="text-red-500">Tenant Name is required!</span>
                    </div>
                </div>

                {/* Check In Date & Update Date */}
                <div>
                    <div className="flex">
                        <div className="flex items-center w-full lg:w-8/12">
                            <div className="w-48">
                                <span>Check In Date</span>
                            </div>
                            <div className="px-4">
                                <span>:</span>
                            </div>
                            <div className="w-72">
                                <DatePicker className="w-full h-12" value={ checkInDate } onChange={(e) => { fCheckInDateChange(e) }} disabled={ checkInDateDisabled } />
                            </div> 
                        </div>
                        <div className="hidden lg:flex items-center">
                            <div className="w-32">
                                <span>Update Date</span>
                            </div>
                            <div className="px-4">
                                <span>:</span>
                            </div>
                            <div className="">
                                <span>{ updateDate }</span>
                            </div>
                        </div>
                    </div>
                    <div className={`flex items-center ${ errorPlaceOfBirth ? 'block' : 'hidden' }`}>
                        <div className="w-48" />
                        <div className="w-9" />
                        <span className="text-red-500">Place of Birth is required!</span>
                    </div>
                </div>

                {/* Check Out Date & Update By */}
                <div>
                    <div className="flex">
                        <div className="flex items-center w-full lg:w-8/12">
                            <div className="w-48">
                                <span>Check Out Date</span>
                            </div>
                            <div className="px-4">
                                <span>:</span>
                            </div>
                            <div className="w-72">
                                <DatePicker className="w-full h-12" value={ checkOutDate } onChange={(e) => { setCheckOutDate(e) }} />
                            </div>
                        </div>
                        <div className="hidden lg:flex items-center">
                            <div className="w-32">
                                <span>Update By</span>
                            </div>
                            <div className="px-4">
                                <span>:</span>
                            </div>
                            <div className="">
                                <span>{ updateBy }</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className={`flex items-center ${ errorDateOfBirth ? 'block' : 'hidden' }`}>
                        <div className="w-48" />
                        <div className="w-9" />
                        <span className="text-red-500">Date of Birth is required!</span>
                    </div>
                </div>
            
                {/* Booking Type */}
                <div>
                    <div className="flex">
                        <div className="flex items-center w-full lg:w-8/12">
                            <div className="w-48">
                                <span>Booking Type</span>
                            </div>
                            <div className="px-4">
                                <span>:</span>
                            </div>
                            <div className="w-72">
                                <Dropdown value={ bookingType } options={ bookingTypeOptions } onChange={(e) => { setBookingType(e.value) }} />
                            </div>
                        </div>
                    </div>
                    <div className={`flex items-center ${ errorTenantName ? 'block' : 'hidden' }`}>
                        <div className="w-48" />
                        <div className="w-9" />
                        <span className="text-red-500">Tenant Name is required!</span>
                    </div>
                </div>

                {/* Room Number */}
                <div>
                    <div className="flex">
                        <div className="flex items-center w-full lg:w-8/12">
                            <div className="w-48">
                                <span>Room Number</span>
                            </div>
                            <div className="px-4">
                                <span>:</span>
                            </div>
                            <div className="w-72">
                                <Dropdown value={ roomId } options={ roomOptions } onChange={(e) => { setRoomId(e.value) }} />
                            </div>
                        </div>
                    </div>
                    <div className={`flex items-center ${ errorTenantName ? 'block' : 'hidden' }`}>
                        <div className="w-48" />
                        <div className="w-9" />
                        <span className="text-red-500">Tenant Name is required!</span>
                    </div>
                </div>

                {/* Tenant Name */}
                <div>
                    <div className="flex">
                        <div className="flex items-center w-full lg:w-8/12">
                            <div className="w-48">
                                <span>Tenant Name</span>
                            </div>
                            <div className="px-4">
                                <span>:</span>
                            </div>
                            <div className="w-72">
                                <Dropdown value={ tenantId } options={ tenantOptions } onChange={(e) => { setTenantId(e.value) }} disabled={ tenantOptionDisabled } />
                            </div>
                        </div>
                    </div>
                    <div className={`flex items-center ${ errorTenantId ? 'block' : 'hidden' }`}>
                        <div className="w-48" />
                        <div className="w-9" />
                        <span className="text-red-500">Tenant Name is required!</span>
                    </div>
                </div>
            </div>
                

            <div className="mt-5 flex justify-end w-full gap-2">
                <SaveButton onClick={() => { fSaveBtnClick() }} visible={true} />
                <DeleteButton visible={ deleteBtnVisible } onClick={() => { fDeleteBtnClick() }} />
                <BackButton onClick={() => { navigate("/kost/booking") }}  />
            </div>

            <div className="border rounded-md p-4 flex flex-col mt-5">
                <div className="flex flex-col gap-2">
                    <span className="font-semibold">Payment History</span>
                    <hr />
                </div>

                <div className="mt-5">
                    <table className="w-full border">
                        <thead>
                            <tr className="h-12">
                                <th className="font-semibold w-16">No</th>
                                <th className="font-semibold text-left px-2">Payment Code</th>
                                <th className="font-semibold text-left px-2">Payment Date</th>
                                <th className="font-semibold text-left px-2">Amount</th>
                                <th className="font-semibold text-left px-2">Outstanding Amount</th>
                                <th className="font-semibold text-left px-2">Status</th>
                                <th className="font-semibold text-left px-2">Create Date</th>
                                <th className="font-semibold text-left px-2">Update Date</th>
                                <th className="font-semibold text-left px-2">Update By</th>
                                <th className="font-semibold w-24">Action</th>
                            </tr>
                        </thead>
                        <tbody className="border">
                            {/* {bookingList?.data?.map((data, i) => {
                                return(
                                    <tr className="my-2 row h-10 border-y" key={ i }>
                                        <td className="text-center">{ data.rowNumber }</td>
                                        <td className="px-2">
                                            <span>{ data.bookingCode }</span>
                                        </td>
                                        <td className="px-2">
                                            <span>{ moment(data.bookingDate).format("DD MMM yyyy") }</span>
                                        </td>
                                        <td className="px-2">
                                            <span>{ data.name }</span>
                                        </td>
                                        <td className="px-2">
                                            <span>{ data.roomNumber }</span>
                                        </td>
                                        <td className="px-2">
                                            <span>{ moment(data.checkInDate).format("DD MMM yyyy") }</span>
                                        </td>
                                        <td className="px-2">
                                            <span>{ moment(data.checkOutDate).format("DD MMM yyyy") === "01 Jan 0001" ? "-" : moment(data.checkOutDate).format("DD MMM yyyy") }</span>
                                        </td>
                                        <td className="px-2">
                                            <span>{ data.bookingStatus }</span>
                                        </td>
                                        <td className="px-2">
                                            <span>{ moment(data.createDate).format("DD MMM yyyy") }</span>
                                        </td>
                                        <td className="px-2">
                                            <span>{ moment(data.updateDate).format("DD MMM yyyy") }</span>
                                        </td>
                                        <td className="px-2">
                                            <span>{ data.updateBy }</span>
                                        </td>
                                        <td className="flex justify-center py-2 gap-2 px-2">
                                            <button className="button flex gap-2" onClick={() => fEditBtnClick( data.bookingId )}>
                                                <EditIcon className="w-4 fill-white" />
                                            </button>
                                            <button className={`button flex gap-2 ${ data.status === "2" ? "hidden" : "block" }`} onClick={() => fDeleteBtnClick( data.bookingId )}>
                                                <TrashIcon className="w-4 fill-white" />
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })} */}
                        </tbody>
                    </table>
                </div>
            </div>

             {/* Modal */}
 			{failModal.isOpen && ( <FailModal onClose={() => setFailModal({ isOpen: false, data: {}, message: EmptyString })} data={failModal?.data} message={failModal?.message} /> )}
 			{loading ? (<LoadingModal />) : (<div />)}
            {successModal.isOpen && ( <SuccessModal onClose={() => setSuccessModal({ isOpen: false, data: {} })} data={successModal?.data} /> )}
            {confirmationModal.isOpen && ( <ConfirmationModal onClose={() => setConfirmationModal({ isOpen: false, data: {} })} data={confirmationModal?.data} /> )}
        </div>
    )
}