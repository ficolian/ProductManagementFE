import React, { useEffect, useState } from "react";
import PlusIcon from "assets/icon/PlusIcon";
import TrashIcon from "assets/icon/TrashIcon";
import { useNavigate } from "react-router-dom";
import { ApiResponseStatusUnauthorized, ApiResponseSuccess, EmptyString, FormTypeAdd, GuidDefault, PageSize, PageTypeCount, PageTypeGetPaged, PaginationBack, PaginationFirst, PaginationLast, PaginationNext } from "utils/Constant";
import { ApiGetKostList, ApiDeleteKost, ApiGetSystemSettingById } from "utils/constants/api";
import useFetch from "utils/hooks/useFetch";
import FailModal from "components/modal/FailModal";
import LoadingModal from "components/modal/LoadingModal";
import SuccessModal from "components/modal/SuccessModal";
import ConfirmationModal from "components/modal/ConfirmationModal";
import EditIcon from "assets/icon/EditIcon";
import PaginationButton from "components/Input/PaginationButton";
import SearchButton from "components/Button/SearchButton";
import Dropdown from "components/Input/Dropdown";

export default function Kost(){
    let navigate = useNavigate()

    const { data: kostList, fetch: getKostList } = useFetch(ApiGetKostList)
    const { fetch: getKostCount } = useFetch(ApiGetKostList)
    const { fetch: deleteKost } = useFetch(ApiDeleteKost)
    const { fetch: getStatus } = useFetch(ApiGetSystemSettingById)

    const [kostName, setKostName] = useState(EmptyString)
    const [address, setAddress] = useState(EmptyString)
    const [picName, setPicName] = useState(EmptyString)
    const [status, setStatus] = useState(EmptyString)
    const [statusOptions, setStatusOptions] = useState([])

    // Grid
    const[paginationOptions, setPaginationOptions] = useState([])
    const[pageIndex, setPageIndex] = useState("")
    const[totalPageCount, setTotalPageCount] = useState(0)

    // Modal
    const [failModal, setFailModal] = useState({ isOpen: false, data: {}, message: EmptyString })
	const [loading, setLoading] = useState(false)
    const [successModal, setSuccessModal] = useState({ isOpen: false, data: {} })
    const [confirmationModal, setConfirmationModal] = useState({ isOpen: false, data: {} })

    useEffect(() => {
        setLoading(true)

        Promise.all([
            fGetStatusList()
        ]).then(() => {
            fBindGrid(0)
        }).finally(() => {
            setLoading(false)
        })
    },[])

    // Function Button
    function fEditBtnClick(kostId){
        navigate("/kost-list/form?kostId=" + kostId + "&formType=Edit")
    }
    function fDeleteBtnClick(kostId){
        setConfirmationModal({
            isOpen: true,
            data: {
                onSuccess: async () => {
                    setConfirmationModal({ isOpen: false })
                    fDeleteKost(kostId)
                }
            }
        })
    }
    function fSearchBtnClick(){
        fBindGrid(0)
    }

    // Function Api Call
    async function fGetKostList(index){
        await getKostList({
            data: {
                kostName: kostName,
                address: address,
                picName: picName, 
                status: status,
                pageSize: PageSize,
                pageIndex: parseInt(index),
                pageType: PageTypeGetPaged,
                sortBy: "A.KostName",
                sortOrder: "ASC"
            }
        }).then((response) => {
            if(response.status === ApiResponseSuccess){
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
        })
    }
    async function fGetKostCount(){
        let dataCount = 0

        await getKostCount({
            data: {
                kostName: kostName,
                address: address,
                picName: picName, 
                status: status,
                pageSize: PageSize,
                pageIndex: 0,
                pageType: PageTypeCount,
                sortBy: "A.KostName",
                sortOrder: "ASC"
            }
        }).then((response) => {
            if(response.status === ApiResponseSuccess){
                dataCount = response.data.dataCount
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

        return dataCount
    }
    async function fDeleteKost(kostId){
        setLoading(true)

        await deleteKost({
            data: {
                kostId: kostId,
                updateId: localStorage.getItem("Id")
            }
        }).then((response) => {
            if(response.status === ApiResponseSuccess){
                setSuccessModal({ 
                    isOpen: true, 
                    data: {
                        onSuccess: async () => {
                            setSuccessModal({ isOpen: false })
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
            fBindGrid(0)
            setLoading(false)
        })
    }
    function fGetStatusList(){
        getStatus({
            data: {
                kostId: GuidDefault,
                systemId: "Status"
            }
        }).then((response) => {
            if(response.status === ApiResponseSuccess){
                let tempArray = []
                //tempArray.push({ label: "All", value: EmptyString })

                for (let i = 0; i < response.data.length; i++){
                    tempArray.push({ label: response.data[i].systemText, value: response.data[i].systemValue })
                }

                setStatusOptions(tempArray)
                setStatus(tempArray[0].value)
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

    // Function Grid
    async function fBindGrid(index){
        setLoading(true)

        let totalData = await fGetKostCount()

        let i = index !== null ? (index !== "" ? parseInt(index) : 0) : 0

        Promise.all([
            fSetPaginationOptions(totalData, index)
        ]).then(() => {
            fGetKostList(i)
        }).finally(() => {
            setLoading(false)
        })        
    }
    function fSetPaginationOptions(dataCount, index){
        let numberOfPage = parseInt(parseInt(dataCount)/PageSize)
        let array = []
        
        setTotalPageCount(numberOfPage = 0 ? 1 : numberOfPage)

        for (let i = 0; i <= numberOfPage; i++){
            array.push({
                label: String(i + 1),
                value: String(i)
            })
        }
        
        setPaginationOptions(array)
        
        if(index !== "" && index !== null){
            setPageIndex(String(index))
        }else{
            setPageIndex("0")
        }
    }
    function fPaginationBtnClick(command){
        if(command === PaginationFirst){
            setPageIndex("0")
            fBindGrid(0)
        }else if(command === PaginationBack){
            let index = parseInt(pageIndex) - 1

            if(index >= 0){
                setPageIndex(index)
                fBindGrid(index)
            }
        }else if(command === PaginationNext){
            let index = parseInt(pageIndex) + 1

            if (totalPageCount >= index){
                setPageIndex(index)
                fBindGrid(index)
            }
        }else if(command === PaginationLast){
            let index = totalPageCount

            setPageIndex(index)
            fBindGrid(index)
        }
    }
    function fPaginationIndexChange(index){
        setPageIndex(index)
        fBindGrid(index)
    }

    function fGetStatus(statusCode){
        let status = EmptyString
        
        for (let i = 0; i < statusOptions.length; i++){
            if (statusOptions[i].value === statusCode){
                status = statusOptions[i].label
            }
        }

        return status
    }

    function fEnterKeyDown(e){
		if(e.key === 'Enter'){
			fBindGrid(0)
		}
	}

    return(
        <div className="flex flex-col gap-2">
            <div >
                <span className="font-semibold text-2xl">Kost</span>
            </div>
            <hr />

            <div className="flex justify-between mt-5">
                <div className="flex gap-4">
                    <div className="flex flex-col gap-2 w-72">
                        <span>Kost Name</span>
                        <input className="input" value={kostName} onChange={(e) => { setKostName(e.target.value) }} onKeyDown={(e) => { fEnterKeyDown(e) }} />
                    </div>
                    <div className="flex flex-col gap-2 w-72">
                        <span>Address</span>
                        <input className="input" value={address} onChange={(e) => { setAddress(e.target.value) }} onKeyDown={(e) => { fEnterKeyDown(e) }} />
                    </div>
                    <div className="flex flex-col gap-2 w-72">
                        <span>PIC</span>
                        <input className="input" value={picName} onChange={(e) => { setPicName(e.target.value) }} onKeyDown={(e) => { fEnterKeyDown(e) }} />
                    </div>
                    <div className="flex flex-col gap-2 w-72">
                        <span>Status</span>
                        <Dropdown value={ status } options={ statusOptions } onChange={(e) => { setStatus(e.value) }} />
                    </div>
                </div>
                <div>
                    <div className="flex items-end h-full">
                        <SearchButton onClick={() => { fSearchBtnClick() }} />
                    </div>
                </div>
            </div>

            <div className="flex w-full justify-end">
                <button className="button flex gap-2" onClick={() => {navigate("/kost-list/form?kostId=&formType=" + FormTypeAdd)}}>
                    <PlusIcon />
                    <span>Add</span>
                </button>
            </div>
           
            <div className="mt-5">
                <table className="w-full border">
                    <thead>
                        <tr className="h-12">
                            <th className="font-semibold w-16">No</th>
                            <th className="font-semibold text-left px-2">Kost Name</th>
                            <th className="font-semibold text-left px-2">Address</th>
                            <th className="font-semibold text-left px-2">City</th>
                            <th className="font-semibold text-left px-2">Province</th>
                            <th className="font-semibold text-left px-2">Postal Code</th>
                            <th className="font-semibold text-left px-2">PIC</th>
                            <th className="font-semibold text-left px-2">PIC Phone</th>
                            <th className="font-semibold text-left px-2">Status</th>
                            <th className="font-semibold w-24">Action</th>
                        </tr>
                    </thead>
                    <tbody className="border">
                        {kostList?.data?.map((data, i) => {
                            return(
                                <tr className="my-2 row h-10 border-y" key={ i }>
                                    <td className="text-center">{ data.rowNumber }</td>
                                    <td className="px-2">
                                        <span>{ data.kostName }</span>
                                    </td>
                                    <td className="px-2">
                                        <span>{ data.address }</span>
                                    </td>
                                    <td className="px-2">
                                        <span>{ data.city }</span>
                                    </td>
                                    <td className="px-2">
                                        <span>{ data.province }</span>
                                    </td>
                                    <td className="px-2">
                                        <span>{ data.postalCode }</span>
                                    </td>
                                    <td className="px-2">
                                        <span>{ data.picName }</span>
                                    </td>
                                    <td className="px-2">
                                        <span>{ data.picPhone }</span>
                                    </td>
                                    <td className="px-2">
                                        <span>{ fGetStatus(data.status) }</span>
                                    </td>
                                    <td className="flex justify-center py-2 gap-2 px-2">
                                        <button className="button flex gap-2" onClick={() => fEditBtnClick( data.kostId )}>
                                            <EditIcon className="w-4 fill-white" />
                                        </button>
                                        <button className="button flex gap-2" onClick={() => fDeleteBtnClick( data.kostId )}>
                                            <TrashIcon className="w-4 fill-white" />
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

            <PaginationButton btnFirstClick={() => { fPaginationBtnClick(PaginationFirst) }} btnBackClick={() => { fPaginationBtnClick(PaginationBack) }} 
                options={paginationOptions} value={pageIndex} onChange={(e) => { fPaginationIndexChange(e.value) }} btnNextClick={() => { fPaginationBtnClick(PaginationNext) }}
                btnLastClick={() => { fPaginationBtnClick(PaginationLast) }}
            />

            {/* Modal */}
			{failModal.isOpen && ( <FailModal onClose={() => setFailModal({ isOpen: false, data: {}, message: EmptyString })} data={failModal?.data} message={failModal?.message} /> )}
			{loading ? (<LoadingModal />) : (<div />)}
            {successModal.isOpen && ( <SuccessModal onClose={() => setSuccessModal({ isOpen: false, data: {} })} data={successModal?.data} /> )}
            {confirmationModal.isOpen && ( <ConfirmationModal onClose={() => setConfirmationModal({ isOpen: false, data: {} })} data={confirmationModal?.data} /> )}
        </div>
    )
}