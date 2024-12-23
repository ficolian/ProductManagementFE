import TrashIcon from "assets/icon/TrashIcon"
import { useEffect, useState } from "react"
import { ApiResponseStatusUnauthorized, ApiResponseSuccess, EmptyString } from "utils/Constant"
import { ApiGetRoomTypeById, ApiUpdateRoomType } from "utils/constants/api"
import useFetch from "utils/hooks/useFetch"
import FailModal from "components/modal/FailModal";
import LoadingModal from "components/modal/LoadingModal";
import SuccessModal from "components/modal/SuccessModal";
import ConfirmationModal from "components/modal/ConfirmationModal";
import { useNavigate } from "react-router-dom"
import PlusIcon from "assets/icon/PlusIcon"
import BackButton from "components/Button/BackButton"
import SaveButton from "components/Button/SaveButton"

export default function RoomTypeSetting(){
    const navigate = useNavigate()

    const{ fetch: updateRoomType } = useFetch(ApiUpdateRoomType)
    const{ fetch: getRoomTypeById } = useFetch(ApiGetRoomTypeById)
    
    const [tableRow, setTableRow] = useState([])

    // Modal
    const [failModal, setFailModal] = useState({ isOpen: false, data: {}, message: EmptyString })
	const [loading, setLoading] = useState(false)
    const [successModal, setSuccessModal] = useState({ isOpen: false, data: {} })
    const [confirmationModal, setConfirmationModal] = useState({ isOpen: false, data: {} })

    useEffect(() => {
        setLoading(true)

        Promise.all([
            fGetRoomTypeById()
        ]).then(() => {
            setLoading(false)
        })
    }, [])
    
    // Function
    function fAddTableRow(){
        setTableRow([
            ...tableRow,
            { roomType: EmptyString, capacity: EmptyString, pricePerDay: EmptyString, pricePerMonth: EmptyString, pricePerYear: EmptyString },  // New row with empty data
        ]);
    }
    function fDeleteRow(rowIndex){
        const updatedRows = tableRow.filter((_, index) => index !== rowIndex);
        setTableRow(updatedRows);
    }
    function fHandleChange(e, rowIndex, field){
        const updatedRows = [...tableRow];
        updatedRows[rowIndex][field] = e.target.value;
        setTableRow(updatedRows);
    }

    // Function Button
    function fSaveBtnClick(){
        setConfirmationModal({ isOpen: true, data: { onSuccess: async () => { 
            setConfirmationModal({ isOpen: false })
            fUpdateRoomType()
        }}})
    }

    // function fFormValidation(){
    //     let errorCount = 0

    //     if(systemId === EmptyString){
    //         errorCount = errorCount + 1
    //         setErrorSystemId(true)
    //     }else{
    //         setErrorSystemId(false)
    //     }

    //     if(errorCount > 0){
    //         return false
    //     }else{
    //         return true
    //     }
    // }

    // Function Api Call
    function fUpdateRoomType(){
        let param = []

        for(let i = 0; i < tableRow.length; i++){
            let datas = {
                kostId: localStorage.getItem("KostId"),
                roomType: tableRow[i].roomType,
                capacity: tableRow[i].capacity,
                pricePerDay: tableRow[i].pricePerDay,
                pricePerMonth: tableRow[i].pricePerMonth,
                pricePerYear: tableRow[i].pricePerYear
            }

            param.push(datas)
        }

        updateRoomType({
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
    async function fGetRoomTypeById(){
        await getRoomTypeById({
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




    return(

        <div className="flex flex-col gap-2">
            <div>
                 <span className="font-semibold text-2xl">Room Type Setting</span>
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
                            <th className="font-semibold w-80">Room Type</th>
                            <th className="font-semibold">Capacity</th>
                            <th className="font-semibold">Price Per Day</th>
                            <th className="font-semibold">Price Per Month</th>
                            <th className="font-semibold">Price Per Year</th>
                            <th className="font-semibold w-24">Action</th>
                        </tr>
                    </thead>
                    <tbody className="border">
                        { tableRow?.map((data, i) => {
                            return(
                                <tr className=" row min-h-14 border-y" key={i}>
                                    <td className="text-center">{i + 1}</td>
                                    <td className="p-2">
                                        <input className="input" value={ data.roomType } onChange={(e) => fHandleChange(e, i, 'roomType')} /> 
                                    </td>
                                    <td className="p-2">
                                        <input className="input" value={ data.capacity } onChange={(e) => fHandleChange(e, i, 'capacity')} /> 
                                    </td>
                                    <td className="p-2">
                                        <input className="input" value={ data.pricePerDay } onChange={(e) => fHandleChange(e, i, 'pricePerDay')} /> 
                                    </td>
                                    <td className="p-2">
                                        <input className="input" value={ data.pricePerMonth } onChange={(e) => fHandleChange(e, i, 'pricePerMonth')} /> 
                                    </td>
                                    <td className="p-2">
                                        <input className="input" value={ data.pricePerYear } onChange={(e) => fHandleChange(e, i, 'pricePerYear')} /> 
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