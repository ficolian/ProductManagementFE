import TrashIcon from "assets/icon/TrashIcon"
import AddButton from "components/Button/AddButton"
import BackButton from "components/Button/BackButton"
import DeleteButton from "components/Button/DeleteButton"
import SaveButton from "components/Button/SaveButton"
import DatePicker from "components/Input/DatePicker"
import Dropdown from "components/Input/Dropdown"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ApiResponseStatusUnauthorized, ApiResponseSuccess, EmptyString, FormTypeAdd, FormTypeEdit, GuidDefault } from "utils/Constant"
import { ApiDeleteTenant, ApiGetSystemSettingById, ApiGetTenantById, ApiInsertTenant, ApiUpdateTenant } from "utils/constants/api"
import useFetch from "utils/hooks/useFetch"
import FailModal from "components/modal/FailModal";
import LoadingModal from "components/modal/LoadingModal";
import SuccessModal from "components/modal/SuccessModal";
import ConfirmationModal from "components/modal/ConfirmationModal";
import moment from "moment"

export default function TenantForm(){
    const navigate = useNavigate()

    const { fetch: insertTenant } = useFetch(ApiInsertTenant)
    const { fetch: updateTenant } = useFetch(ApiUpdateTenant)
    const { fetch: deleteTenant } = useFetch(ApiDeleteTenant)
    const { fetch: getTenantById } = useFetch(ApiGetTenantById)
    const { fetch: getSystemSetting } = useFetch(ApiGetSystemSettingById)

    let queryString = new URLSearchParams(window.location.search)
    let formType = queryString.get("formType")
    let paramTenantId = queryString.get("tenantId")

    // Modal
    const [failModal, setFailModal] = useState({ isOpen: false, data: {}, message: EmptyString })
    const [loading, setLoading] = useState(false)
    const [successModal, setSuccessModal] = useState({ isOpen: false, data: {} })
    const [confirmationModal, setConfirmationModal] = useState({ isOpen: false, data: {} })

    const [tenantId, setTenantId] = useState(EmptyString)
    const [tenantName, setTenantName] = useState(EmptyString)
    const [idNumber, setIdNumber] = useState(EmptyString)
    const [placeOfBirth, setPlaceOfBirth] = useState(EmptyString)
    const [dateOfBirth, setDateOfBirth] = useState(EmptyString)
    const [address, setAddress] = useState(EmptyString)
    const [city, setCity] = useState(EmptyString)
    const [province, setProvince] = useState(EmptyString)
    const [postalCode, setPostalCode] = useState(EmptyString)
    const [phone, setPhone] = useState(EmptyString)
    const [gender, setGender] = useState(EmptyString)
    const [createDate, setCreateDate] = useState(EmptyString)
    const [status, setStatus] = useState(EmptyString)
    const [updateDate, setUpdateDate] = useState(EmptyString)
    const [updateBy, setUpdateBy] = useState(EmptyString)

    const [tableRow, setTableRow] = useState([])

    const [deleteBtnVisible, setDeleteBtnVisible] = useState(true)

    // Dropdown options
    const [genderOptions, setGenderOptions] = useState([])
    const [emergencyContactRelationOptions, setEmergencyContactRelationOptions] = useState([])

    // Error
    const [errorTenantId, setErrorTenantId] = useState(false)
    const [errorTenantName, setErrorTenantName] = useState(false)
    const [errorIdNumber, setErrorIdNumber] = useState(false)
    const [errorPlaceOfBirth, setErrorPlaceOfBirth] = useState(false)
    const [errorDateOfBirth, setErrorDateOfBirth] = useState(false)
    const [errorAddress, setErrorAddress] = useState(false)
    const [errorCity, setErrorCity] = useState(false)
    const [errorProvince, setErrorProvince] = useState(false)
    const [errorPostalCode, setErrorPostalCode] = useState(false)
    const [errorPhone, setErrorPhone] = useState(false)
    const [errorGender, setErrorGender] = useState(false)

    const [tenantIdDisabled, setTenantIdDisabled] = useState(true)

    useEffect(() => {
        setLoading(true)

        Promise.all([
            fGetGender(),
            fGetRelation()
        ]).then(() => {
            if (formType === FormTypeEdit){
                fGetTenantById()
            }else{
                setDeleteBtnVisible(false)
            }
        }).finally(() => {
            setLoading(false)
        })
    }, [])

    // Function
    function fAddTableRow(){
        setTableRow([
            ...tableRow,
            { name: EmptyString, address: EmptyString, phone: EmptyString, relation: EmptyString },  // New row with empty data
        ]);
    }
    function fDeleteRow(rowIndex){
        const updatedRows = tableRow.filter((_, index) => index !== rowIndex);
        setTableRow(updatedRows);
    }
    function fHandleChange(e, rowIndex, field){
        const updatedRows = [...tableRow];
        updatedRows[rowIndex][field] = e;
        setTableRow(updatedRows);
    }

    function fSaveBtnClick(){
        setConfirmationModal({ isOpen: true, data: { onSuccess: async () => { 
            setConfirmationModal({ isOpen: false })
            if (formType === FormTypeAdd){
                fInsertTenant()
            }else{
                fUpdateTenant()
            }
        }}})
    }
    function fDeleteBtnClick(){
        setConfirmationModal({ isOpen: true, data: { onSuccess: async () => { 
            setConfirmationModal({ isOpen: false })
            fDeleteTenant()
        }}})
    }

    // Function Api Call
    function fInsertTenant(){
        setLoading(true)

        let emergencyContactArr = []

        for(let i = 0; i < tableRow.length; i++){
            let datas = {
                name: tableRow[i].name,
                address: tableRow[i].address,
                phone: tableRow[i].phone,
                relation: tableRow[i].relation
            }

            emergencyContactArr.push(datas)
        }

        insertTenant({
            data:{
                kostId: localStorage.getItem("KostId"),
                name: tenantName, 
                idNumber: idNumber,
                address: address,
                city: city,
                province: province,
                postalCode: postalCode,
                phone: phone,
                placeOfBirth: placeOfBirth,
                dateOfBirth: moment(dateOfBirth).format("yyyy-MM-DD"),
                gender: gender,
                updateId: localStorage.getItem("Id"),
                emergencyContact: emergencyContactArr
            }
        }).then((response) => {
            if(response.status === ApiResponseSuccess){
                setSuccessModal({ isOpen: true, data: { onSuccess: async () => { navigate("/kost/tenant") }} })
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
    function fUpdateTenant(){
        setLoading(true)

        let emergencyContactArr = []

        for(let i = 0; i < tableRow.length; i++){
            let datas = {
                name: tableRow[i].name,
                address: tableRow[i].address,
                phone: tableRow[i].phone,
                relation: tableRow[i].relation
            }

            emergencyContactArr.push(datas)
        }

        updateTenant({
            data:{
                kostId: localStorage.getItem("KostId"),
                tenantId: tenantId,
                name: tenantName, 
                idNumber: idNumber,
                address: address,
                city: city,
                province: province,
                postalCode: postalCode,
                phone: phone,
                placeOfBirth: placeOfBirth,
                dateOfBirth: dateOfBirth,
                gender: gender,
                updateId: localStorage.getItem("Id"),
                emergencyContact: emergencyContactArr
            }
        }).then((response) => {
            if(response.status === ApiResponseSuccess){
                setSuccessModal({ isOpen: true, data: { onSuccess: async () => { navigate("/kost/tenant") }} })
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
    function fDeleteTenant(){
        setLoading(true)

        deleteTenant({
            data: {
                kostId: localStorage.getItem("KostId"),
                tenantId: paramTenantId,
                updateId: localStorage.getItem("Id")
            }
        }).then((response) => {
            if(response.status === ApiResponseSuccess){
                setSuccessModal({ isOpen: true, data: { onSuccess: async () => { navigate("/kost/tenant") }} })
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
    async function fGetTenantById(){
        await getTenantById({
            data: {
                kostId: localStorage.getItem("KostId"),
                tenantId: paramTenantId
            }
        }).then((response) => {
            if(response.status === ApiResponseSuccess){
                let data = response?.data
                setTenantId(data?.tenantId)
                setTenantName(data?.name)
                setIdNumber(data?.idNumber)
                setPlaceOfBirth(data?.placeOfBirth)
                setDateOfBirth(data?.dateOfBirth)
                setAddress(data?.address)
                setCity(data?.city)
                setProvince(data?.province)
                setPostalCode(data?.postalCode)
                setPhone(data?.phone)
                setGender(data?.gender)
                setCreateDate(moment(data?.createDate).format("DD MMM yyyy"))
                setStatus(data?.status)
                setUpdateDate(moment(data?.updateDate).format("DD MMM yyyy"))
                setUpdateBy(data?.updateBy)
                setTableRow(data?.emergencyContact)
                
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

    async function fGetGender(){
        await getSystemSetting({
            data: {
                kostId: GuidDefault,
                systemId: "Gender"
            }
        }).then((response) => {
            if(response.status === ApiResponseSuccess){
                let data = response.data
                let tempArray = []

                for (let i = 0; i < data.length; i++){
                    tempArray.push({ label: data[i].systemText, value: data[i].systemValue })
                }
                
                setGenderOptions(tempArray)
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
    async function fGetRelation(){
        await getSystemSetting({
            data: {
                kostId: GuidDefault,
                systemId: "Relation"
            }
        }).then((response) => {
            if(response.status === ApiResponseSuccess){
                let data = response.data
                let tempRelation = []

                for (let i = 0; i < data.length; i++){
                    tempRelation.push({ label: data[i].systemText, value: data[i].systemValue })
                }
                
                setEmergencyContactRelationOptions(tempRelation)
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

    return (
        <div className="flex flex-col gap-2">
            <div>
                <span className="font-semibold text-2xl">Tenant Detail - { formType }</span>
            </div>
            <hr />

            <div className="mt-5 flex flex-col gap-3">
                {/* Tenant Id & Create Date */}
                <div>
                    <div className="flex">
                        <div className="flex items-center w-full lg:w-8/12">
                            <div className="w-48">
                                <span>Tenant Id</span>
                            </div>
                            <div className="px-4">
                                <span>:</span>
                            </div>
                            <div className="w-72">
                                <input className="input" value={ tenantId } onChange={(e) => { setTenantId(e.target.value) }} disabled={ tenantIdDisabled } />
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

                {/* Tenant Name & Status */}
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
                                <input className="input" value={ tenantName } onChange={(e) => { setTenantName(e.target.value) }} />
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

                {/* Id Number & Update Date */}
                <div>
                    <div className="flex">
                        <div className="flex items-center w-full lg:w-8/12">
                            <div className="w-48">
                                <span>Id Number</span>
                            </div>
                            <div className="px-4">
                                <span>:</span>
                            </div>
                            <div className="w-72">
                                <input className="input" value={ idNumber } onChange={(e) => { setIdNumber(e.target.value) }} />
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
                    <div className={`flex items-center ${ errorIdNumber ? 'block' : 'hidden' }`}>
                        <div className="w-48" />
                        <div className="w-9" />
                        <span className="text-red-500">Id Number is required!</span>
                    </div>
                </div>

                {/* Place of Birth & Update By */}
                <div>
                    <div className="flex">
                        <div className="flex items-center w-full lg:w-8/12">
                            <div className="w-48">
                                <span>Place of Birth</span>
                            </div>
                            <div className="px-4">
                                <span>:</span>
                            </div>
                            <div className="w-72">
                                <input className="input" value={ placeOfBirth } onChange={(e) => { setPlaceOfBirth(e.target.value) }} />
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
                    <div className={`flex items-center ${ errorPlaceOfBirth ? 'block' : 'hidden' }`}>
                        <div className="w-48" />
                        <div className="w-9" />
                        <span className="text-red-500">Place of Birth is required!</span>
                    </div>
                </div>

                {/* Date of Birth */}
                <div>
                    <div className="flex items-center w-full lg:w-8/12">
                        <div className="w-48">
                            <span>Date of Birth</span>
                        </div>
                        <div className="px-4">
                            <span>:</span>
                        </div>
                        <div className="w-72">
                            <DatePicker className="w-full h-12" value={ dateOfBirth } onChange={(e) => { setDateOfBirth(e) }} />
                        </div>
                    </div>
                    <div className={`flex items-center ${ errorDateOfBirth ? 'block' : 'hidden' }`}>
                        <div className="w-48" />
                        <div className="w-9" />
                        <span className="text-red-500">Date of Birth is required!</span>
                    </div>
                </div>

                {/* Address */}
                <div>
                    <div className="flex items-center w-full lg:w-8/12">
                        <div className="w-48">
                            <span>Address</span>
                        </div>
                        <div className="px-4">
                            <span>:</span>
                        </div>
                        <div className="w-72">
                            <input className="input" value={ address } onChange={(e) => { setAddress(e.target.value) }} />
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
                            <input className="input" value={ city } onChange={(e) => { setCity(e.target.value) }} />
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
                            <input className="input" value={ province } onChange={(e) => { setProvince(e.target.value) }} />
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

                {/* Phone */}
                <div>
                    <div className="flex items-center">
                        <div className="w-48">
                            <span>Phone</span>
                        </div>
                        <div className="px-4">
                            <span>:</span>
                        </div>
                        <div className="w-72">
                            <input className="input" value={ phone } onChange={(e) => { setPhone(e.target.value) }} />
                        </div>
                    </div>
                    <div className={`flex items-center ${ errorPhone ? 'block' : 'hidden' }`}>
                        <div className="w-48" />
                        <div className="w-9" />
                        <span className="text-red-500">Phone is required!</span>
                    </div>
                </div>

                {/* Gender */}
                <div>
                    <div className="flex items-center">
                        <div className="w-48">
                            <span>Gender</span>
                        </div>
                        <div className="px-4">
                            <span>:</span>
                        </div>
                        <div className="w-72">
                            <Dropdown options={ genderOptions } value={ gender } onChange={(e) => { setGender(e.value) }} />
                        </div>
                    </div>
                    <div className={`flex items-center ${ errorGender ? 'block' : 'hidden' }`}>
                        <div className="w-48" />
                        <div className="w-9" />
                        <span className="text-red-500">Gender is required!</span>
                    </div>
                </div>

            </div>

            <div className="border rounded-md p-4 mt-4 flex flex-col gap-3">
                <div>
                    <span className="font-semibold">Emergency Contact</span>
                </div>
                <hr />

                <div className="w-full flex justify-end">
                    <div>
                        <AddButton onClick={() => {fAddTableRow()}} />
                    </div>
                </div>
                
                {/* Emergency Contact Name 1 */}
                <div className="flex flex-col gap-8">
                    { tableRow?.map((data, i) => {
                        return(
                            <div className="flex items-center justify-between" key={ i }>
                                <div className="flex flex-col gap-2">
                                    <div>
                                        <div className="flex items-center">
                                            <div className="w-48">
                                                <span>Name</span>
                                            </div>
                                            <div className="px-4">
                                                <span>:</span>
                                            </div>
                                            <div className="w-72">
                                                <input className="input" value={ data.name } onChange={(e) => fHandleChange(e.target.value, i, 'name')} />
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex items-center">
                                            <div className="w-48">
                                                <span>Address</span>
                                            </div>
                                            <div className="px-4">
                                                <span>:</span>
                                            </div>
                                            <div className="w-72">
                                                <input className="input" value={ data.address } onChange={(e) => fHandleChange(e.target.value, i, 'address')} />
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex items-center">
                                            <div className="w-48">
                                                <span>Phone</span>
                                            </div>
                                            <div className="px-4">
                                                <span>:</span>
                                            </div>
                                            <div className="w-72">
                                                <input className="input" value={ data.phone } onChange={(e) => fHandleChange(e.target.value, i, 'phone')} />
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex items-center">
                                            <div className="w-48">
                                                <span>Relation</span>
                                            </div>
                                            <div className="px-4">
                                                <span>:</span>
                                            </div>
                                            <div className="w-72">
                                                <Dropdown options={ emergencyContactRelationOptions } value={ data.relation } onChange={(e) => fHandleChange(e.value, i, 'relation')} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-center items-center">
                                        <button className="button flex gap-2" onClick={() => fDeleteRow(i)}>
                                            <TrashIcon className="w-6 fill-white" />
                                        </button>
                                    </div>    
                                </div>
                            </div>
                        )
                    })}
                </div>
               
            </div>

            <div className="mt-5 flex justify-end w-full gap-2">
                <SaveButton onClick={() => { fSaveBtnClick() }} visible={true} />
                <DeleteButton visible={ deleteBtnVisible } onClick={() => { fDeleteBtnClick() }} />
                <BackButton onClick={() => { navigate("/kost/tenant") }}  />
            </div>

             {/* Modal */}
 			{failModal.isOpen && ( <FailModal onClose={() => setFailModal({ isOpen: false, data: {}, message: EmptyString })} data={failModal?.data} message={failModal?.message} /> )}
 			{loading ? (<LoadingModal />) : (<div />)}
            {successModal.isOpen && ( <SuccessModal onClose={() => setSuccessModal({ isOpen: false, data: {} })} data={successModal?.data} /> )}
            {confirmationModal.isOpen && ( <ConfirmationModal onClose={() => setConfirmationModal({ isOpen: false, data: {} })} data={confirmationModal?.data} /> )}
        </div>
    )
}