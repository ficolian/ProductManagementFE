import TrashIcon from "assets/icon/TrashIcon"
import { useEffect, useState } from "react"
import { ApiResponseStatusUnauthorized, ApiResponseSuccess, EmptyString, GuidDefault } from "utils/Constant"
import { ApiGetRoomByKostId, ApiGetRoomTypeById, ApiGetSystemSettingById, ApiUpdateRoom } from "utils/constants/api"
import useFetch from "utils/hooks/useFetch"
import FailModal from "components/modal/FailModal";
import LoadingModal from "components/modal/LoadingModal";
import SuccessModal from "components/modal/SuccessModal";
import ConfirmationModal from "components/modal/ConfirmationModal";
import { useNavigate } from "react-router-dom"
import PlusIcon from "assets/icon/PlusIcon"
import BackButton from "components/Button/BackButton"
import SaveButton from "components/Button/SaveButton"
import Dropdown from "components/Input/Dropdown"

export default function RoomSetting(){
    const navigate = useNavigate()

    const{ fetch: updateRoom } = useFetch(ApiUpdateRoom)
    const{ fetch: getRoomByKostId } = useFetch(ApiGetRoomByKostId)
    const{ fetch: getRoomtypeByKostId } = useFetch(ApiGetRoomTypeById)
    const{ fetch: getRoomStatus } = useFetch(ApiGetSystemSettingById)
    
    const [tableRow, setTableRow] = useState([])
    const [roomTypeOptions, setRoomTypeOptions] = useState([])
    const [roomStatusOptions, setRoomStatusOptions] = useState([])

    // Modal
    const [failModal, setFailModal] = useState({ isOpen: false, data: {}, message: EmptyString })
	const [loading, setLoading] = useState(false)
    const [successModal, setSuccessModal] = useState({ isOpen: false, data: {} })
    const [confirmationModal, setConfirmationModal] = useState({ isOpen: false, data: {} })

    useEffect(() => {
        setLoading(true)

        Promise.all([
            fGetRoomType(),
            fGetRoomStatus()
        ]).then(() => {
            fGetRoomByKostId()
        }).finally(() => {
            setLoading(false)
        })
    }, [])
    
    // Function
    function fAddTableRow(){
        setTableRow([
            ...tableRow,
            { roomId: GuidDefault, roomNumber: EmptyString, floorLevel: EmptyString, roomType: EmptyString, roomStatus: EmptyString },  // New row with empty data
        ]);
    }
    function fDeleteRow(rowIndex){
        const updatedRows = tableRow.filter((_, index) => index !== rowIndex);
        setTableRow(updatedRows);
    }
    function fHandleChange(value, rowIndex, field){
        const updatedRows = [...tableRow];
        updatedRows[rowIndex][field] = value;
        setTableRow(updatedRows);
    }

    // Function Button
    function fSaveBtnClick(){
        setConfirmationModal({ isOpen: true, data: { onSuccess: async () => { 
            setConfirmationModal({ isOpen: false })
            fUpdateRoom()
        }}})
    }

    // Function Api Call
    function fUpdateRoom(){
        let param = []

        for(let i = 0; i < tableRow.length; i++){
            let datas = {
                roomId: tableRow[i].roomId,
                kostId: localStorage.getItem("KostId"),
                roomNumber: tableRow[i].roomNumber,
                floorLevel: tableRow[i].floorLevel,
                roomType: tableRow[i].roomType,
                roomStatus: tableRow[i].roomStatus
            }

            param.push(datas)
        }

        updateRoom({
            data: param
        }).then((response) => {
            if(response.status === ApiResponseSuccess){
                setSuccessModal({ isOpen: true, data: { onSuccess: async () => { navigate("/kost/setting") }} })
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
    async function fGetRoomByKostId(){
        await getRoomByKostId({
            data: {
                kostId: localStorage.getItem("KostId")
            }
        }).then((response) => {
            if(response.status === ApiResponseSuccess){
                setTableRow(response.data)
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
    async function fGetRoomType(){
        getRoomtypeByKostId({
            data:{
                kostId: localStorage.getItem("KostId")
            }
        }).then((response) => {
            if(response.status === ApiResponseSuccess){
                let data = response.data
                let tempArray = []
                
                for (let i = 0; i < data.length; i++){
                    tempArray.push({ label: data[i].roomType, value: data[i].roomType })
                }
                
                setRoomTypeOptions(tempArray)
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
    async function fGetRoomStatus(){
        getRoomStatus({
            data:{
                kostId: GuidDefault,
                systemId: "RoomStatus"
            }
        }).then((response) => {
            if(response.status === ApiResponseSuccess){
                let data = response.data
                let tempArray = []
                
                console.log('tdadas', data)
                for (let i = 0; i < data.length; i++){
                    tempArray.push({ label: data[i].systemText, value: data[i].systemValue })
                }
                console.log('te', tempArray)
                setRoomStatusOptions(tempArray)
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



    return(

        <div className="flex flex-col gap-2">
            <div>
                 <span className="font-semibold text-2xl">Room Setting</span>
            </div>
            <hr />

            <div className="mt-5 w-full flex justify-end">
                <button className="button flex gap-2" onClick={() => {fAddTableRow()}}>
                    <PlusIcon />
                    <span>Add Row</span>
                </button>
            </div>

            <div className="mt-5">
                <table className="w-full border">
                    <thead>
                        <tr className="h-12">
                            <th className="font-semibold w-16">No</th>
                            <th className="font-semibold w-80">Room Number</th>
                            <th className="font-semibold">Floor Level</th>
                            <th className="font-semibold">Room Type</th>
                            <th className="font-semibold">Room Status</th>
                        </tr>
                    </thead>
                    <tbody className="border">
                        { tableRow?.map((data, i) => {
                            return(
                                <tr className=" row min-h-14 border-y" key={i}>
                                    <td className="text-center">{i + 1}</td>
                                    <td className="p-2 hidden">
                                        <input className="input" value={ data.roomId } onChange={(e) => fHandleChange(e.target.value, i, 'roomId')} /> 
                                    </td>
                                    <td className="p-2">
                                        <input className="input" value={ data.roomNumber } onChange={(e) => fHandleChange(e.target.value, i, 'roomNumber')} /> 
                                    </td>
                                    <td className="p-2">
                                        <input className="input" value={ data.floorLevel } onChange={(e) => fHandleChange(e.target.value, i, 'floorLevel')} /> 
                                    </td>
                                    <td className="p-2">
                                        <Dropdown className='w-full' options={ roomTypeOptions } value={ data.roomType } onChange={(e) => fHandleChange(e.value, i, 'roomType')} />
                                    </td>
                                    <td className="p-2">
                                        <Dropdown className='w-full' options={ roomStatusOptions } value={ data.roomStatus } onChange={(e) => fHandleChange(e.value, i, 'roomStatus')} />
                                    </td>
                                    <td className="p-2">
                                        <div className="flex justify-center items-center">
                                            <button className="button flex gap-2" onClick={() => fDeleteRow(i)}>
                                                <TrashIcon className="w-6 fill-white" />
                                            </button>
                                        </div>                                     
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

            <div className="mt-5 w-full flex gap-2 justify-end items-start">
                <BackButton onClick={() => { navigate("/kost/setting") }} />
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