// import React, {useState, useEffect} from "react";
// import PlusIcon from "assets/icon/PlusIcon";
// import TrashIcon from "assets/icon/TrashIcon";
// import BackButton from "components/Button/BackButton";
// import SaveButton from "components/Button/SaveButton";
// import DeleteButton from "components/Button/DeleteButton";
// import useFetch from "utils/hooks/useFetch";
// import { useNavigate } from "react-router-dom";
// import { ApiResponseStatusUnauthorized, ApiResponseSuccess, EmptyString, FormTypeAdd, FormTypeEdit } from "utils/Constant";
// import FailModal from "components/modal/FailModal";
// import LoadingModal from "components/modal/LoadingModal";
// import SuccessModal from "components/modal/SuccessModal";
// import ConfirmationModal from "components/modal/ConfirmationModal";
// import { ApiDeleteCommon, ApiGetCommonById, ApiInsertCommon, ApiUpdateCommon } from "utils/constants/api";


// export default function CommonSettingForm(){
//     let navigate = useNavigate()

//     const{ fetch: insertCommon } = useFetch(ApiInsertCommon)
//     const{ fetch: updateCommon } = useFetch(ApiUpdateCommon)
//     const{ fetch: deleteCommon } = useFetch(ApiDeleteCommon)
//     const{ fetch: getCommonById } = useFetch(ApiGetCommonById)

//     let queryString = new URLSearchParams(window.location.search)
//     let formType = queryString.get("formType")
//     let paramSystemId = queryString.get("systemId")
    
//     const[systemId, setSystemId] = useState(EmptyString)
//     const[systemIdDisabled, setSystemIdDisabled] = useState(false)
//     const[errorSystemId, setErrorSystemId] = useState(false)
//     const[errorSystemText, setErrorSystemText] = useState(false)
//     const[errorSystemValue, setErrorSystemValue] = useState(false)
//     const[tableRow, setTableRow] = useState([])

//     // Modal
//     const [failModal, setFailModal] = useState({ isOpen: false, data: {}, message: EmptyString })
// 	const [loading, setLoading] = useState(false)
//     const [successModal, setSuccessModal] = useState({ isOpen: false, data: {} })
//     const [confirmationModal, setConfirmationModal] = useState({ isOpen: false, data: {} })

//     useEffect(() => {
//         if(formType === FormTypeAdd){
//             setSystemIdDisabled(false)
//         }else{
//             setSystemIdDisabled(true)
//             setLoading(true)

//             Promise.all([
//                 fGetCommonById(paramSystemId)
//             ]).then(() => {
//                 setLoading(false)
//             })
            
//         }
//     }, [])
    
//     // Function
//     function fAddTableRow(){
//         setTableRow([
//             ...tableRow,
//             { text: EmptyString, value: EmptyString, description: EmptyString },  // New row with empty data
//         ]);
//     }
//     function fDeleteRow(rowIndex){
//         const updatedRows = tableRow.filter((_, index) => index !== rowIndex);
//         setTableRow(updatedRows);
//     }
//     function fHandleChange(e, rowIndex, field){
//         const updatedRows = [...tableRow];
//         updatedRows[rowIndex][field] = e.target.value;
//         setTableRow(updatedRows);
//     }

//     // Function Button
//     function fSaveBtnClick(){
//         if(fFormValidation()){
//             setConfirmationModal({ isOpen: true, data: { onSuccess: async () => { 
//                 setConfirmationModal({ isOpen: false })
//                 if(formType === FormTypeAdd){
//                     fInsertCommon() 
//                 }else{
//                     fUpdateCommon()
//                 }
//             }}})
//         }
//     }
//     function fDeleteBtnClick(){
//         setConfirmationModal({ isOpen: true, data: { onSuccess: async () => { 
//             setConfirmationModal({ isOpen: false })
//             fDeleteCommon(systemId)
//         }}})
//     }

//     function fFormValidation(){
//         let errorCount = 0
//             console.log(tableRow)
//         if(systemId === EmptyString){
//             errorCount = errorCount + 1
//             setErrorSystemId(true)
//         }else{
//             setErrorSystemId(false)
//         }

//         if(errorCount > 0){
//             return false
//         }else{
//             return true
//         }
//     }

//     // Function Api Call
//     function fInsertCommon(){
//         let param = []

//         for(let i = 0; i < tableRow.length; i++){
//             let datas = {
//                 systemId: systemId,
//                 text: tableRow[i].text,
//                 value: tableRow[i].value,
//                 description: tableRow[i].description
//             }

//             param.push(datas)
//         }

//         insertCommon({
//             data: param
//         }).then((response) => {
//             if(response.status === ApiResponseSuccess){
//                 setSuccessModal({ isOpen: true, data: { onSuccess: async () => { navigate("/common-setting") }} })
//             }else if(response.status === ApiResponseStatusUnauthorized){
//                 setFailModal({
//                     isOpen: true,
//                     data: {
//                         onSuccess: async () => {
//                             setFailModal({isOpen: false})
//                             window.location.href = "/login"
//                         }
//                     },
//                     message: response.message
//                 })
//             }else{
//                 setFailModal({
//                     isOpen: true,
//                     data: {
//                         onSuccess: async () => {
//                             setFailModal({isOpen: false})
//                         }
//                     },
//                     message: response.message
//                 })
//             }
//         })
//     }
//     function fUpdateCommon(){
//         let param = []

//         for(let i = 0; i < tableRow.length; i++){
//             let datas = {
//                 systemId: systemId,
//                 text: tableRow[i].text,
//                 value: tableRow[i].value,
//                 description: tableRow[i].description
//             }

//             param.push(datas)
//         }

//         updateCommon({
//             data: param
//         }).then((response) => {
//             if(response.status === ApiResponseSuccess){
//                 setSuccessModal({ isOpen: true, data: { onSuccess: async () => { navigate("/common-setting") }} })
//             }else if(response.status === ApiResponseStatusUnauthorized){
//                 setFailModal({
//                     isOpen: true,
//                     data: {
//                         onSuccess: async () => {
//                             setFailModal({isOpen: false})
//                             window.location.href = "/login"
//                         }
//                     },
//                     message: response.message
//                 })
//             }else{
//                 setFailModal({
//                     isOpen: true,
//                     data: {
//                         onSuccess: async () => {
//                             setFailModal({isOpen: false})
//                         }
//                     },
//                     message: response.message
//                 })
//             }
//         })
//     }
//     async function fDeleteCommon(systemId){
//         setLoading(true)

//         await deleteCommon({
//             data: {
//                 systemId: systemId
//             }
//         }).then((response) => {
//             if(response.status === ApiResponseSuccess){
//                 setSuccessModal({ 
//                     isOpen: true, 
//                     data: {
//                         onSuccess: async () => {
//                             setSuccessModal({ isOpen: false })
//                             navigate("/common-setting")
//                         }
//                     }
//                 })
//             }else if(response.status === ApiResponseStatusUnauthorized){
//                 setFailModal({
//                     isOpen: true,
//                     data: {
//                         onSuccess: async () => {
//                             setFailModal({ isOpen: false })
//                             window.location.href = "/login"
//                         }
//                     },
//                     message: response.message
//                 })
//             }else{
//                 setFailModal({
//                     isOpen: true,
//                     data: {
//                         onSuccess: async () => {
//                             setFailModal({ isOpen: false })
//                         }
//                     },
//                     message: response.message
//                 })
//             }
//         }).finally(() => {
//             setLoading(false)
//         })
//     }
//     async function fGetCommonById(systemId){
//         await getCommonById({
//             data: {
//                 systemId: systemId
//             }
//         }).then((response) => {
//             if(response.status === ApiResponseSuccess){
//                 setSystemId(response.data[0].systemId)
//                 setTableRow(response.data)
//             }else if(response.status === ApiResponseStatusUnauthorized){
//                 setFailModal({
//                     isOpen: true,
//                     data: {
//                         onSuccess: async () => {
//                             setFailModal({isOpen: false})
//                             window.location.href = "/login"
//                         }
//                     },
//                     message: response.message
//                 })
//             }else{
//                 setFailModal({
//                     isOpen: true,
//                     data: {
//                         onSuccess: async () => {
//                             setFailModal({isOpen: false})
//                         }
//                     },
//                     message: response.message
//                 })
//             }
//         })
//     }

//     return(
//         <div className="flex flex-col gap-2">
//             <div>
//                 <span className="font-semibold text-2xl">Common Setting Detail - {formType}</span>
//             </div>
//             <hr />

//             <div className="mt-5 flex flex-col gap-3">
//                 <div>
//                     <div className="flex items-center">
//                         <div className="w-48">
//                             <span>System Id</span>
//                         </div>
//                         <div className="px-4">
//                             <span>:</span>
//                         </div>
//                         <div className="w-72">
//                             <input className="input" value={systemId} onChange={(e) => { setSystemId(e.target.value) }} disabled={systemIdDisabled} />
//                         </div>
//                     </div>
//                     <div className={`flex items-center ${errorSystemId ? 'block' : 'hidden'}`}>
//                         <div className="w-48" />
//                         <div className="w-9" />
//                         <span className="text-red-500">System Id is required!</span>
//                     </div>
//                 </div>
//             </div>

//             <div className="mt-5 w-full flex justify-end">
//                 <button className="button flex gap-2" onClick={() => {fAddTableRow()}}>
//                     <PlusIcon />
//                     <span>Add Row</span>
//                 </button>
//             </div>

//             <div className="mt-5">
//                 <table className="w-full border">
//                     <thead>
//                         <tr className="h-12">
//                             <th className="font-semibold w-16">No</th>
//                             <th className="font-semibold w-80">System Text</th>
//                             <th className="font-semibold">System Value</th>
//                             <th className="font-semibold">Description</th>
//                             <th className="font-semibold w-24">Action</th>
//                         </tr>
//                     </thead>
//                     <tbody className="border">
//                         { tableRow?.map((data, i) => {
//                             return(
//                                 <tr className=" row min-h-14 border-y" key={i}>
//                                     <td className="text-center">{i + 1}</td>
//                                     <td className="p-2">
//                                         <input className="input" value={data.text} onChange={(e) => fHandleChange(e, i, 'text')} /> 
//                                         <span className="text-red-500 hidden">System text is required!</span>
//                                     </td>
//                                     <td className="p-2">
//                                         <input className="input" value={data.value} onChange={(e) => fHandleChange(e, i, 'value')} /> 
//                                         <span className="text-red-500 hidden">System value is required!</span>
//                                     </td>
//                                     <td className="p-2">
//                                         <input className="input" value={data.description} onChange={(e) => fHandleChange(e, i, 'description')} /> 
//                                     </td>
//                                     <td className="p-2">
//                                         <div className="flex justify-center items-center">
//                                             <button className="button flex gap-2" onClick={() => fDeleteRow(i)}>
//                                                 <TrashIcon className="w-6 fill-white" />
//                                             </button>
//                                         </div>
                                        
//                                     </td>
//                                 </tr>
//                             )
//                         })}
//                     </tbody>
//                 </table>
//             </div>

//             <div className="mt-5 flex justify-end gap-2">
//                 <BackButton onClick={() => { navigate("/common-setting") }} />
//                 <DeleteButton onClick={() => { fDeleteBtnClick() }} visible={formType === FormTypeEdit ? true : false} />
//                 <SaveButton onClick={() => { fSaveBtnClick() }} />
//             </div>

//             {/* Modal */}
// 			{failModal.isOpen && ( <FailModal onClose={() => setFailModal({ isOpen: false, data: {}, message: EmptyString })} data={failModal?.data} message={failModal?.message} /> )}
// 			{loading ? (<LoadingModal />) : (<div />)}
//             {successModal.isOpen && ( <SuccessModal onClose={() => setSuccessModal({ isOpen: false, data: {} })} data={successModal?.data} /> )}
//             {confirmationModal.isOpen && ( <ConfirmationModal onClose={() => setConfirmationModal({ isOpen: false, data: {} })} data={confirmationModal?.data} /> )}
//         </div>


//     )
// }