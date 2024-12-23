// import React, { useEffect, useState } from "react"
// import useFetch from "utils/hooks/useFetch"
// import { ApiDeleteExpenseCategory, ApiGetExpenseCategory, ApiInsertCommon, ApiInsertExpenseCategory } from "utils/constants/api"
// import { ApiResponseStatusUnauthorized, ApiResponseSuccess, EmptyString } from "utils/Constant";
// import SaveButton from "components/Button/SaveButton"
// import TrashIcon from "assets/icon/TrashIcon"
// import FailModal from "components/modal/FailModal";
// import LoadingModal from "components/modal/LoadingModal";
// import SuccessModal from "components/modal/SuccessModal";
// import ConfirmationModal from "components/modal/ConfirmationModal";


// export default function IncomeCategory(){
//     const{ data: expenseCategory, fetch: getExpenseCategory } = useFetch(ApiGetExpenseCategory)
//     const{ fetch: insertExpenseCategory } = useFetch(ApiInsertExpenseCategory)
//     const{ fetch: deleteExpenseCategory } = useFetch(ApiDeleteExpenseCategory)

//     const[categoryName, setCategoryName] = useState("")

//     // Modal
//     const [failModal, setFailModal] = useState({ isOpen: false, data: {}, message: EmptyString })
//     const [loading, setLoading] = useState(false)
//     const [successModal, setSuccessModal] = useState({ isOpen: false, data: {} })
//     const [confirmationModal, setConfirmationModal] = useState({ isOpen: false, data: {} })

//     // useEffect(() => {
//     //     fGetExpenseCategory()
//     // },[])

//     // Function
//     function fGetExpenseCategory(){
//         setLoading(true)

//         getExpenseCategory({
//             data: {
//                 username: localStorage.getItem("Username")
//             }
//         }).then((response) => {
//             if(response.status === ApiResponseSuccess){

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
//         }).finally(() => {
//             setLoading(false)
//         })
//     }
//     function fInsertExpenseCategory(){
//         setLoading(true)

//         insertExpenseCategory({
//             data: {
//                 username: localStorage.getItem("Username"),
//                 categoryName: categoryName
//             }
//         }).then((response) => {
//             if(response.status === ApiResponseSuccess){
//                 setSuccessModal({ isOpen: true, data: { onSuccess: async () => { setSuccessModal({ isOpen: false }) }} })
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
//         }).finally(() => {
//             setCategoryName("")
//             fGetExpenseCategory()

//             setLoading(false)
//         })
//     }

//     function fSaveBtnClick(){
//         setConfirmationModal({ 
//             isOpen: true, 
//             data: { onSuccess: async () => { 
//                 setConfirmationModal({ isOpen: false })
//                 fInsertExpenseCategory()
//             }}
//         })
//     }

//     function fDeleteExpenseCategory(id){
//         setLoading(true)

//         deleteExpenseCategory({
//             data: {
//                 username: localStorage.getItem("Username"),
//                 expenseCategoryId: id
//             }
//         }).then((response) => {
//             if(response.status === ApiResponseSuccess){
//                 setSuccessModal({ isOpen: true, data: { onSuccess: async () => { setSuccessModal({ isOpen: false }) }} })
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
//         }).finally(() => {
//             fGetExpenseCategory()

//             setLoading(false)
//         })
//     }

//     function fDeleteBtnClick(id){
//         setConfirmationModal({ 
//             isOpen: true, 
//             data: { onSuccess: async () => { 
//                 setConfirmationModal({ isOpen: false })
//                 fDeleteExpenseCategory(id)
//             }}
//         })
//     }

//     return(
//         <div className="flex flex-col gap-2">
//             <div>
//                 <span className="font-semibold text-2xl">Expense Category Setting</span>
//             </div>
//             <hr />

//             <div className="flex flex-col justify-between mt-5 border rounded-md p-3">
//                 <div>
//                     <span className="font-semibold">Add Income Category</span>
//                 </div>
//                 <div className="flex justify-between mt-3">
//                     <div className="flex items-center">
//                         <div className="w-44">
//                             <span>Category</span>
//                         </div>
//                         <div className="px-4">
//                             <span>:</span>
//                         </div>
//                         <div className="w-72">
//                             <input className="input" value={categoryName} onChange={(e) => { setCategoryName(e.target.value) }} />
//                         </div>
//                     </div>

//                     <div>
//                         <SaveButton onClick={() => { fSaveBtnClick() }} />
//                     </div>
//                 </div>
                
//             </div>

//             <div className="mt-5">
//                 <table className="w-full border">
//                     <thead>
//                         <tr className="h-12">
//                             <th className="font-semibold w-16">No</th>
//                             <th className="font-semibold text-left px-2">Category Name</th>
//                             <th className="font-semibold w-24">Action</th>
//                         </tr>
//                     </thead>
//                     <tbody className="border">
//                         { expenseCategory?.data?.map((data, i) => {
//                             return(
//                                 <tr className="my-2 row h-10 border-y" key={i}>
//                                     <td className="text-center">{i + 1}</td>
//                                     <td className="px-2">
//                                         <span>{data.categoryName}</span>
//                                     </td>
//                                     <td className="flex justify-center py-2 gap-2 px-2">
//                                         <button className="button flex gap-2" onClick={() => { fDeleteBtnClick(data.expenseCategoryId) }}>
//                                             <TrashIcon className="w-4 fill-white" />
//                                         </button>
//                                     </td>
//                                 </tr>
//                             )
//                         })}
//                     </tbody>
//                 </table>
//             </div>

//             {/* Modal */}
// 			{failModal.isOpen && ( <FailModal onClose={() => setFailModal({ isOpen: false, data: {}, message: EmptyString })} data={failModal?.data} message={failModal?.message} /> )}
// 			{loading ? (<LoadingModal />) : (<div />)}
//             {successModal.isOpen && ( <SuccessModal onClose={() => setSuccessModal({ isOpen: false, data: {} })} data={successModal?.data} /> )}
//             {confirmationModal.isOpen && ( <ConfirmationModal onClose={() => setConfirmationModal({ isOpen: false, data: {} })} data={confirmationModal?.data} /> )}
//         </div>
//     )
// }