import React, { useEffect, useState } from "react";
import PlusIcon from "assets/icon/PlusIcon";
import TrashIcon from "assets/icon/TrashIcon";
import { useNavigate } from "react-router-dom";
import { ApiResponseStatusUnauthorized, ApiResponseSuccess, EmptyString, FormTypeAdd, PageSize, PageTypeCount, PageTypeGetPaged, PaginationBack, PaginationFirst, PaginationLast, PaginationNext } from "utils/Constant";
import { ApiGetSystemSettingList, ApiDeleteSystemSetting } from "utils/constants/api";
import useFetch from "utils/hooks/useFetch";
import FailModal from "components/modal/FailModal";
import LoadingModal from "components/modal/LoadingModal";
import SuccessModal from "components/modal/SuccessModal";
import ConfirmationModal from "components/modal/ConfirmationModal";
import EditIcon from "assets/icon/EditIcon";
import PaginationButton from "components/Input/PaginationButton";
import SearchButton from "components/Button/SearchButton";

export default function SystemSetting(){
    let navigate = useNavigate()

    const{ data: commonList, fetch: getCommonList } = useFetch(ApiGetSystemSettingList)
    const{ fetch: getCommonCount } = useFetch(ApiGetSystemSettingList)
    const{ fetch: deleteCommon } = useFetch(ApiDeleteSystemSetting)

    const[systemId, setSystemId] = useState(EmptyString)

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
        fBindGrid(0)    
    },[])

    // Function Button
    function fEditBtnClick(kostId, systemId){
        navigate("/setting/system-setting/form?kostId="+kostId+"&systemId=" + systemId + "&formType=Edit")
    }
    function fDeleteBtnClick(kostId, systemId){
        setConfirmationModal({
            isOpen: true,
            data: {
                onSuccess: async () => {
                    setConfirmationModal({ isOpen: false })
                    fDeleteCommon(kostId, systemId)
                }
            }
        })
    }

    // Function Api Call
    async function fGetCommonList(index){
        await getCommonList({
            data: {
                systemId: systemId,
                pageSize: PageSize,
                pageIndex: parseInt(index),
                pageType: PageTypeGetPaged,
                sortBy: "SystemId",
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
    async function fGetCommonCount(){
        let dataCount = 0

        await getCommonCount({
            data: {
                systemId: systemId,
                pageSize: PageSize,
                pageIndex: 0,
                pageType: PageTypeCount,
                sortBy: "SystemId",
                sortOrder: "ASC"
            }
        }).then((response) => {
            if(response.status === ApiResponseSuccess){
                dataCount = response.data.dataCount
                // setDataCount(response.data.dataCount)
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
    async function fDeleteCommon(systemId){
        setLoading(true)

        await deleteCommon({
            data: {
                systemId: systemId
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

    // Function Grid
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
    async function fBindGrid(index){
        setLoading(true)

        let totalData = await fGetCommonCount()
        
        let i = index !== null ? (index !== "" ? parseInt(index) : 0) : 0

        Promise.all([
            fSetPaginationOptions(totalData, index)
        ]).then(() => {
            fGetCommonList(i)
        }).finally(() => {
            setLoading(false)
        })        
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

    function fSearchBtnClick(){
        fBindGrid(0)
    }

    function fEnterKeyDown(e){
		if(e.key === 'Enter'){
			fBindGrid(0)
		}
	}

    return(
        <div className="flex flex-col gap-2">
            <div >
                <span className="font-semibold text-2xl">System Setting</span>
            </div>
            <hr />

            <div className="flex justify-between mt-5">
                <div className="flex gap-4">
                    <div className="flex flex-col gap-2 w-72">
                        <span>System Text</span>
                        <input className="input" value={systemId} onChange={(e) => { setSystemId(e.target.value) }} onKeyDown={(e) => { fEnterKeyDown(e) }} />
                    </div>
                </div>
                <div>
                    <div className="flex items-end h-full">
                        <SearchButton onClick={() => { fSearchBtnClick() }} />
                    </div>
                </div>
            </div>

            <div className="flex w-full justify-end">
                <button className="button flex gap-2" onClick={() => {navigate("/setting/system-setting/form?kostId=systemId=&formType=" + FormTypeAdd)}}>
                    <PlusIcon />
                    <span>Add</span>
                </button>
            </div>
           
            <div className="mt-5 bg-white">
                <table className="w-full border">
                    <thead>
                        <tr className="h-12">
                            <th className="font-semibold w-16">No</th>
                            <th className="font-semibold text-left px-2">System Id</th>
                            <th className="font-semibold w-24">Action</th>
                        </tr>
                    </thead>
                    <tbody className="border">
                        { commonList?.data?.map((data, i) => {
                            return(
                                <tr className="my-2 row h-10 border-y" key={ i }>
                                    <td className="text-center">{ i + 1 }</td>
                                    <td className="px-2">
                                        <span>{ data.systemId }</span>
                                    </td>
                                    <td className="flex justify-center py-2 gap-2 px-2">
                                        <button className="button flex gap-2" onClick={() => fEditBtnClick(data.kostId, data.systemId)}>
                                            <EditIcon className="w-4 fill-white" />
                                        </button>
                                        <button className="button flex gap-2" onClick={() => fDeleteBtnClick(data.systemId)}>
                                            <TrashIcon className="w-4 fill-white" />
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
			{failModal.isOpen && ( <FailModal onClose={() => setFailModal({ isOpen: false, data: {}, message: EmptyString })} data={failModal?.data} message={failModal?.message} /> )}
			{loading ? (<LoadingModal />) : (<div />)}
            {successModal.isOpen && ( <SuccessModal onClose={() => setSuccessModal({ isOpen: false, data: {} })} data={successModal?.data} /> )}
            {confirmationModal.isOpen && ( <ConfirmationModal onClose={() => setConfirmationModal({ isOpen: false, data: {} })} data={confirmationModal?.data} /> )}
        </div>
    )
}