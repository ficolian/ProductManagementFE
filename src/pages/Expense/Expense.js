// import React, { useState, useEffect } from "react"
// import useFetch from "utils/hooks/useFetch"
// import { ApiDeleteExpense, ApiGetExpense, ApiGetExpenseCategory, ApiInsertExpense } from "utils/constants/api"
// import { EmptyString, ApiResponseSuccess, ApiResponseStatusUnauthorized } from "utils/Constant";
// import FailModal from "components/modal/FailModal";
// import LoadingModal from "components/modal/LoadingModal";
// import SuccessModal from "components/modal/SuccessModal";
// import ConfirmationModal from "components/modal/ConfirmationModal";
// import Dropdown from "components/Input/Dropdown";
// import DatePicker from "components/Input/DatePicker";
// import moment from "moment";
// import SaveButton from "components/Button/SaveButton";
// import SearchButton from "components/Button/SearchButton";
// import TrashIcon from "assets/icon/TrashIcon";
// import { RoundTwoDecimals, ThousandSeparator } from "utils/helpers";

// export default function Expense(){
//     const{ fetch: getExpenseCategory } = useFetch(ApiGetExpenseCategory)
//     const{ fetch: insertExpense } = useFetch(ApiInsertExpense)
//     const{ data: expenseData, fetch: getExpenses } = useFetch(ApiGetExpense)
//     const{ fetch: deleteExpense } = useFetch(ApiDeleteExpense)

//     const[expenseCategoryOption, setExpenseCategoryOptions] = useState([])
//     const[expenseCategory, setExpenseCategory] = useState(EmptyString)
//     const[expenseDate, setExpenseDate] = useState(Date.now)
//     const[detail, setDetail] = useState(EmptyString)
//     const[amount, setAmount] = useState(0)

//     const[dateFrom, setDateFrom] = useState(Date.now)
//     const[dateTo, setDateTo] = useState(Date.now)
//     const[searchDetail, setSearchDetail] = useState(EmptyString)
//     const[searchExpenseCategory, setSearchExpenseCategory] = useState(EmptyString)

//     // Modal
//     const [failModal, setFailModal] = useState({ isOpen: false, data: {}, message: EmptyString })
//     const [loading, setLoading] = useState(false)
//     const [successModal, setSuccessModal] = useState({ isOpen: false, data: {} })
//     const [confirmationModal, setConfirmationModal] = useState({ isOpen: false, data: {} })


//     const addCommas = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//     const removeNonNumeric = num => num.toString().replace(/[^0-9]/g, "");

//     const handleChange = event => setAmount(addCommas(removeNonNumeric(event.target.value)));

//     useEffect(() => {
//         setLoading(true)
//         Promise.all([
//             fGetExpenseCategory(),
//             fGetExpense()
//         ]).then(() => {
//             setLoading(false)
//         })
//     }, [])

//     // Function Api Call
//     async function fGetExpense(){
//         await getExpenses({
//             data: {
//                 username: localStorage.getItem("Username"),
//                 dateFrom: moment(dateFrom).format("yyyy-MM-DD"),
//                 dateTo: moment(dateTo).format("yyyy-MM-DD"),
//                 detail: searchDetail,
//                 category: searchExpenseCategory
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
//         })
//     }
//     async function fGetExpenseCategory(){
//         let responseData = []

//         await getExpenseCategory({
//             data: {
//                 username: localStorage.getItem("Username")
//             }
//         }).then((response) => {
//             if(response.status === ApiResponseSuccess){                
//                 for(let i = 0; i < response.data.length; i++){
//                     responseData.push({
//                         label: response.data[i].categoryName,
//                         value: response.data[i].expenseCategoryId
//                     })
//                 }

//                 setExpenseCategoryOptions(responseData)
                    
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
//     async function fInsertExpense(){
//         setLoading(true)

//         await insertExpense({
//             data: {
//                 username: localStorage.getItem("Username"),
//                 expenseDate: moment(expenseDate).format("yyyy-MM-DD"),
//                 categoryId: expenseCategory,
//                 detail: detail,
//                 amount: amount.replaceAll(",", "")
//             }
//         }).then((response) => {
//             if(response.status === ApiResponseSuccess){
//                 setSuccessModal({ 
//                     isOpen: true, 
//                     data: { 
//                         onSuccess: async () => { 
//                             fClearForm()
//                             setSuccessModal({ isOpen: false }) 
//                         }
//                     } 
//                 })
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
//             fGetExpense()
//             setLoading(false)
//         })
//     }
//     async function fDeleteExpense(expenseId){
//         setLoading(true)
//         alert(expenseId)

//         await deleteExpense({
//             data: {
//                 id: expenseId,
//                 username: localStorage.getItem("Username")
//             }
//         }).then((response) => {
//             if(response.status === ApiResponseSuccess){
//                 setSuccessModal({ 
//                     isOpen: true, 
//                     data: { 
//                         onSuccess: async () => { 
//                             setSuccessModal({ isOpen: false }) 
//                         }
//                     } 
//                 })
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
    

//     // Function Handle Button Click
//     function fSaveBtnClick(){
//         setConfirmationModal({ 
//             isOpen: true, 
//             data: { onSuccess: async () => { 
//                 setConfirmationModal({ isOpen: false })
//                 fInsertExpense()
//             }}
//         })
//     }
//     function fSearchBtnClick(){
//         fGetExpense()
//     }
//     function fDeleteBtnClick(expenseId){
//         setConfirmationModal({ 
//             isOpen: true, 
//             data: { onSuccess: async () => { 
//                 setConfirmationModal({ isOpen: false })
//                 fDeleteExpense(expenseId)
//             }}
//         })
//     }

//     // Function Other
//     function fClearForm(){
//         setDetail(EmptyString)
//         setExpenseDate(Date.now)
//         setAmount(EmptyString)
//         setExpenseCategory(EmptyString)
//     }
//     function fEnterKeyDown(e){
// 		if(e.key === 'Enter'){
// 			fSaveBtnClick()
// 		}
// 	}

//     return(
//         <div className="flex flex-col gap-2">
//             <div>
//                 <span className="font-semibold text-2xl">Expense</span>
//             </div>
//             <hr />

//             <div className="border p-4 mt-5">
//                 <div className="mt-2">
//                     <div className="flex flex-col gap-4">

//                         <div className="flex items-center">
//                             <div className="w-56">
//                                 <span>Date</span>
//                             </div>
//                             <div className="px-4">
//                                 <span>:</span>
//                             </div>
//                             <div className="w-60">
//                                 <DatePicker value={expenseDate} onChange={(e) => { setExpenseDate(e) }} className="w-full rounded h-10" />
//                             </div>
//                         </div>

//                         <div className="flex items-center">
//                             <div className="w-56">
//                                 <span>Category</span>
//                             </div>
//                             <div className="px-4">
//                                 <span>:</span>
//                             </div>
//                             <div className="w-60">
//                                 <Dropdown options={expenseCategoryOption} value={expenseCategory} onChange={(e) => { setExpenseCategory(e.value) }} placeholder="Select category" />
//                             </div>
//                         </div>

//                         <div className="flex items-center">
//                             <div className="w-56">  
//                                 <span>Detail</span>
//                             </div>
//                             <div className="px-4">
//                                 <span>:</span>
//                             </div>
//                             <div className="w-60">
//                                 <input className="input" value={detail} onChange={(e) => { setDetail(e.target.value) }} />
//                             </div>
//                         </div>

//                         <div className="flex items-center">
//                             <div className="w-56">  
//                                 <span>Amount</span>
//                             </div>
//                             <div className="px-4">
//                                 <span>:</span>
//                             </div>
//                             <div className="w-60">
//                                 <input className="input" value={ amount } onInput={ (e) => { handleChange(e) }} onKeyDown={(e) => { fEnterKeyDown(e) }} />
//                             </div>
//                         </div>
//                     </div>
//                 </div>


//                 <div className="mt-5">
//                     <SaveButton onClick={() => { fSaveBtnClick() }} />
//                 </div>
//             </div>
            

//             <div className="mt-5 flex justify-between">
//                 <div className="flex gap-5">
//                     <div className="flex flex-col">
//                         <span>Date From</span>
//                         <DatePicker value={dateFrom} onChange={(e) => { setDateFrom(e) }} className="w-full rounded h-10" />
//                     </div>
//                     <div className="flex flex-col">
//                         <span>Date To</span>
//                         <DatePicker value={dateTo} onChange={(e) => { setDateTo(e) }} className="w-full rounded h-10" />
//                     </div>
//                     <div className="flex flex-col">
//                         <span>Detail</span>
//                         <input className="input" value={searchDetail} onChange={(e) => { setSearchDetail(e.target.value) }} />
//                     </div>
//                     <div className="flex flex-col">
//                         <span>Category</span>
//                         <div className="w-60">
//                             <Dropdown options={expenseCategoryOption} value={searchExpenseCategory} onChange={(e) => { setSearchExpenseCategory(e.value) }} placeholder="Select category" />
//                         </div>
//                     </div>
//                 </div>
//                 <div className="flex items-end">
//                     <SearchButton onClick={() => { fSearchBtnClick() }} />
//                 </div>
//             </div>

//             <div className="mt-5">
//                 <table className="w-full border">
//                     <thead>
//                         <tr className="h-12">
//                             <th className="font-semibold w-16">No</th>
//                             <th className="font-semibold text-left px-2">Expense Date</th>
//                             <th className="font-semibold text-left px-2">Category</th>
//                             <th className="font-semibold text-left px-2">Detail</th>
//                             <th className="font-semibold text-center px-2 w-36">Amount</th>
//                             <th className="font-semibold text-center px-2">Create Date</th>
//                             <th className="font-semibold text-left px-2">Update Date</th>
//                             <th className="font-semibold w-24">Action</th>
//                         </tr>
//                     </thead>
//                     <tbody className="border">
//                         { expenseData?.data?.expenseData?.map((data, i) => {
//                             return(
//                                 <tr className="my-2 row h-10 border-y" key={i}>
//                                     <td className="text-center">{i + 1}</td>
//                                     <td className="px-2">
//                                         <span>{ moment(data.expenseDate).format("DD MMM yyyy") }</span>
//                                     </td>
//                                     <td className="px-2">
//                                         <span>{ data?.category }</span>
//                                     </td>
//                                     <td className="px-2">
//                                         <span>{ data?.detail }</span>
//                                     </td>
//                                     <td className="px-2 text-right">
//                                         <span>Rp { new Intl.NumberFormat().format(RoundTwoDecimals(data?.amount || 0)) }</span>
//                                     </td>
//                                     <td className="px-2 text-center">
//                                         <span>{ moment(data?.createDate).format("DD MMM yyyy") }</span>
//                                     </td>
//                                     <td className="px-2">
//                                         <span>{ moment(data?.updateDate).format("DD MMM yyyy") }</span>
//                                     </td>
//                                     <td className="flex justify-center py-2 gap-2 px-2">
//                                         <button className="button flex gap-2" onClick={() => { fDeleteBtnClick(data?.id) }}>
//                                             <TrashIcon className="w-4 fill-white" />
//                                         </button>
//                                     </td>
//                                 </tr>
//                             )
//                         })}
//                     </tbody>
//                     <tfoot>
//                         <tr className="my-2 row h-10 border-y">
//                             <td></td>
//                             <td></td>
//                             <td></td>
//                             <td></td>
//                             <td className="px-2 text-right">Rp { new Intl.NumberFormat().format(RoundTwoDecimals(expenseData?.data?.grandTotal || 0)) }</td>
//                             <td></td>
//                             <td></td>
//                             <td></td>
//                         </tr>
//                     </tfoot>
//                 </table>
//             </div>


//             {/* Modal */}
// 			{failModal.isOpen && ( <FailModal onClose={() => setFailModal({ isOpen: false, data: {}, message: EmptyString })} data={failModal?.data} message={failModal?.message} /> )}
//             {loading ? (<LoadingModal />) : (<div />)}
//             {successModal.isOpen && ( <SuccessModal onClose={() => setSuccessModal({ isOpen: false, data: {} })} data={successModal?.data} /> )}
//             {confirmationModal.isOpen && ( <ConfirmationModal onClose={() => setConfirmationModal({ isOpen: false, data: {} })} data={confirmationModal?.data} /> )}
//         </div>
//     )
// }