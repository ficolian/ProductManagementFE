import ChevronRightIcon from "assets/icon/ChevronRightIcon";
import { useNavigate } from "react-router-dom";

export default function Setting(){
    let navigate = useNavigate()

    return(
        <div className="flex flex-col gap-2">
            <div >
                <span className="font-semibold text-2xl">Setting</span>
            </div>
            <hr />
            <div>
                <button className="px-4 py-4  w-full text-left flex justify-between hover" onClick={() => {navigate("/setting/system-setting")}}>
                    <span className="">System Setting</span>
                    <ChevronRightIcon className="fill-black w-6" />
                </button>
                <hr />
                <button className="px-4 py-4  w-full text-left flex justify-between hover" onClick={() => {navigate("/expense-category")}}>
                    <span className="">Expense Category</span>
                    <ChevronRightIcon className="fill-black w-6" />
                </button>
                <hr />
                <button className="px-4 py-4  w-full text-left flex justify-between hover" onClick={() => {navigate("/income-category")}}>
                    <span className="">Income Category</span>
                    <ChevronRightIcon className="fill-black w-6" />
                </button>
            </div>
        </div>
    )
}