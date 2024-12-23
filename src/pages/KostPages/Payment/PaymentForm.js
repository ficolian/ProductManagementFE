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
import { money } from "utils/helpers"

export default function PaymentForm(){
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

    const [paymentCode, setPaymentCode] = useState(EmptyString)
    const [paymentDate, setPaymentDate] = useState(EmptyString)
    const [booking, setBooking] = useState(EmptyString)
    const [detailRoomNumber, setDetailRoomNumber] = useState(EmptyString)
    const [detailTenantName, setDetailTenantName] = useState(EmptyString)
    const [detailBookingCode, setDetailBookingCode] = useState(EmptyString)
    const [detailOutstandingAmount, setDetailOutstandingAmount] = useState(EmptyString)
    const [amount, setAmount] = useState(EmptyString)
    const [remainingAmount, setRemainingAmount] = useState(EmptyString)



    const [bookingCode, setBookingCode] = useState(EmptyString)
    const [bookingDate, setBookingDate] = useState(EmptyString)
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
    const [bookingOptions, setBookingOptions] = useState([])
    const [roomOptions, setRoomOptions] = useState([])
    const [emergencyContactRelationOptions, setEmergencyContactRelationOptions] = useState([])

    // Error
    const [errorPaymentDate, setErrorPaymentDate] = useState(false)
    const [errorTenantName, setErrorTenantName] = useState(false)
    const [errorBooking, setErrorBooking] = useState(false)
    const [errorPlaceOfBirth, setErrorPlaceOfBirth] = useState(false)
    const [errorDateOfBirth, setErrorDateOfBirth] = useState(false)
    const [errorAddress, setErrorAddress] = useState(false)
    const [errorCity, setErrorCity] = useState(false)
    const [errorProvince, setErrorProvince] = useState(false)
    const [errorPostalCode, setErrorPostalCode] = useState(false)
    const [errorPhone, setErrorPhone] = useState(false)
    const [errorGender, setErrorGender] = useState(false)

    const [paymentCodeDisabled, setPaymentCodeDisabled] = useState(true)
    const [paymentDateDisabled, setPaymentDateDisabled] = useState(false)

    useEffect(() => {
        setPaymentDate(new Date())
        // setLoading(true)

        // Promise.all([
        //     fGetBookingTenant(),
        //     //fGetRelation()
        // ]).then(() => {
        //     if (formType === FormTypeEdit){
        //         // Promise.all([

        //         // ])
        //         fGetBookingById()
        //         setTenantOptionDisabled(true)
        //         setBookingDateDisabled(true)
        //     }else{
        //         setDeleteBtnVisible(false)
        //         setBookingDate(new Date())
        //     }
        // }).finally(() => {
        //     setLoading(false)
        // })

    }, [])

    // Function
    // function fAddTableRow(){
    //     setTableRow([
    //         ...tableRow,
    //         { name: EmptyString, address: EmptyString, phone: EmptyString, relation: EmptyString },  // New row with empty data
    //     ]);
    // }
    // function fDeleteRow(rowIndex){
    //     const updatedRows = tableRow.filter((_, index) => index !== rowIndex);
    //     setTableRow(updatedRows);
    // }
    // function fHandleChange(e, rowIndex, field){
    //     const updatedRows = [...tableRow];
    //     updatedRows[rowIndex][field] = e;
    //     setTableRow(updatedRows);
    // }

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

                Promise.all([
                    fGetBookingRoom(data.checkInDate, data.roomNumber, data.roomId)
                ]).then(() => {
                    setRoomId(data.roomId)
                })
               
                //setRoomId({ label: data.roomNumber, value: data.roomId })
                
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

    // async function fGetBookingTenant(){
    //     await getBookingTenant({
    //         data: {
    //             kostId: localStorage.getItem("KostId")
    //         }
    //     }).then((response) => {
    //         if(response.status === ApiResponseSuccess){
    //             let data = response.data
    //             let tempArray = []

    //             for (let i = 0; i < data.length; i++){
    //                 tempArray.push({ label: data[i].name, value: data[i].tenantId })
    //             }
                
    //             setTenantOptions(tempArray)
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
    //     })
    // }
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
    // async function fGetRelation(){
    //     await getSystemSetting({
    //         data: {
    //             kostId: GuidDefault,
    //             systemId: "Relation"
    //         }
    //     }).then((response) => {
    //         if(response.status === ApiResponseSuccess){
    //             let data = response.data
    //             let tempRelation = []

    //             for (let i = 0; i < data.length; i++){
    //                 tempRelation.push({ label: data[i].systemText, value: data[i].systemValue })
    //             }
                
    //             setEmergencyContactRelationOptions(tempRelation)
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
    //     })
    // }

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
                <span className="font-semibold text-2xl">Payment Detail - { formType }</span>
            </div>
            <hr />

            <div className="mt-5 flex flex-col gap-3">
                {/* Payment Code & Create Date */}
                <div>
                    <div className="flex">
                        <div className="flex items-center w-full 2xl:w-8/12">
                            <div className="w-56">
                                <span>Payment Code</span>
                            </div>
                            <div className="px-4">
                                <span>:</span>
                            </div>
                            <div className="w-72">
                                <input className="input" value={ paymentCode } onChange={(e) => { setPaymentCode(e.target.value) }} disabled={ paymentCodeDisabled } />
                            </div>
                        </div>
                        <div className="hidden 2xl:flex items-center">
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
                </div>

                {/* Payment Date & Status */}
                <div>
                    <div className="flex">
                        <div className="flex items-center w-full 2xl:w-8/12">
                            <div className="w-56">
                                <span>Payment Date</span>
                            </div>
                            <div className="px-4">
                                <span>:</span>
                            </div>
                            <div className="w-72">
                                <DatePicker className="w-full h-12" value={ paymentDate } onChange={(e) => { setPaymentDate(e) }} disabled={ paymentDateDisabled } />
                            </div>
                        </div>
                        <div className="hidden 2xl:flex items-center">
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
                    <div className={`flex items-center ${ errorPaymentDate ? 'block' : 'hidden' }`}>
                        <div className="w-48" />
                        <div className="w-9" />
                        <span className="text-red-500">Payment Date is required!</span>
                    </div>
                </div>

                {/* Room / Tenant / Booking & Update Date */}
                <div>
                    <div className="flex">
                        <div className="flex items-center w-full 2xl:w-8/12">
                            <div className="w-56">
                                <span>Room / Tenant / Booking</span>
                            </div>
                            <div className="px-4">
                                <span>:</span>
                            </div>
                            <div className="w-[440px]">
                                <Dropdown />
                            </div> 
                        </div>
                        <div className="hidden 2xl:flex items-center">
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
                    <div className={`flex items-center ${ errorBooking ? 'block' : 'hidden' }`}>
                        <div className="w-48" />
                        <div className="w-9" />
                        <span className="text-red-500">Room/Tenant/Booking is required!</span>
                    </div>
                </div>

                {/* Detail & Update By */}
                <div>
                    <div className="flex ">
                        <div className="flex items-center w-full 2xl:w-8/12">
                            <div className="flex flex-col border rounded-md w-[700px] p-4">
                                <div>
                                    <span className="text-xl font-semibold">Detail</span>
                                </div>
                                <hr />
                                <div className="mt-4 flex flex-col gap-4">
                                    <div className="flex">
                                        <div className="w-52">
                                            <span>Room Number</span>
                                        </div>
                                        <div>
                                            <span className="px-4">:</span>
                                        </div>
                                        <div>
                                            <span>{ detailRoomNumber }</span>
                                        </div>
                                    </div>

                                    <div className="flex">
                                        <div className="w-52">
                                            <span>Tenant Name</span>
                                        </div>
                                        <div>
                                            <span className="px-4">:</span>
                                        </div>
                                        <div>
                                            <span>{ detailTenantName }</span>
                                        </div>
                                    </div>

                                    <div className="flex">
                                        <div className="w-52">
                                            <span>Booking Code</span>
                                        </div>
                                        <div>
                                            <span className="px-4">:</span>
                                        </div>
                                        <div>
                                            <span>{ detailBookingCode }</span>
                                        </div>
                                    </div>

                                    <div className="flex">
                                        <div className="w-52">
                                            <span>Outstanding Amount</span>
                                        </div>
                                        <div>
                                            <span className="px-4">:</span>
                                        </div>
                                        <div>
                                            <span>{ detailOutstandingAmount }</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="hidden 2xl:flex pt-4">
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
                </div>
            
                {/* Amount */}
                <div>
                    <div className="flex">
                        <div className="flex items-center w-full 2xl:w-8/12">
                            <div className="w-56">
                                <span>Amount</span>
                            </div>
                            <div className="px-4">
                                <span>:</span>
                            </div>
                            <div className="w-72">
                                <input className="input" value={ amount } onInput={(e) => { setAmount(money(e))}} />
                            </div>
                        </div>
                    </div>
                    <div className={`flex items-center ${ errorTenantName ? 'block' : 'hidden' }`}>
                        <div className="w-48" />
                        <div className="w-9" />
                        <span className="text-red-500">Amount is required!</span>
                    </div>
                </div>

                {/* Remaining Amount */}
                <div>
                    <div className="flex">
                        <div className="flex items-center w-full 2xl:w-8/12">
                            <div className="w-56">
                                <span>Remaining Amount</span>
                            </div>
                            <div className="px-4">
                                <span>:</span>
                            </div>
                            <div className="w-72">
                                <input className="input" value={ remainingAmount } disabled={ true } />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                

            <div className="mt-5 flex justify-end w-full gap-2">
                <SaveButton onClick={() => { fSaveBtnClick() }} visible={true} />
                <DeleteButton visible={ deleteBtnVisible } onClick={() => { fDeleteBtnClick() }} />
                <BackButton onClick={() => { navigate("/kost/booking") }}  />
            </div>

            {/* <div className="border rounded-md p-4 flex flex-col mt-5">
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
                            {bookingList?.data?.map((data, i) => {
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
                            })}
                        </tbody>
                    </table>
                </div>
            </div> */}

             {/* Modal */}
 			{failModal.isOpen && ( <FailModal onClose={() => setFailModal({ isOpen: false, data: {}, message: EmptyString })} data={failModal?.data} message={failModal?.message} /> )}
 			{loading ? (<LoadingModal />) : (<div />)}
            {successModal.isOpen && ( <SuccessModal onClose={() => setSuccessModal({ isOpen: false, data: {} })} data={successModal?.data} /> )}
            {confirmationModal.isOpen && ( <ConfirmationModal onClose={() => setConfirmationModal({ isOpen: false, data: {} })} data={confirmationModal?.data} /> )}
        </div>
    )
}