import ChevronRightIcon from "assets/icon/ChevronRightIcon";
import { useNavigate } from "react-router-dom";

export default function KostSetting(){
    let navigate = useNavigate()

    return(
        <div className="flex flex-col gap-2">
            <div >
                <span className="font-semibold text-2xl">Kost Setting</span>
            </div>
            <hr />
            <div>
                <button className="px-4 py-4  w-full text-left flex justify-between hover" onClick={() => {navigate("/kost/setting/room-type")}}>
                    <span className="">Room Type</span>
                    <ChevronRightIcon className="fill-black w-6" />
                </button>
                <hr />
                <button className="px-4 py-4  w-full text-left flex justify-between hover" onClick={() => {navigate("/kost/setting/room-setting")}}>
                    <span className="">Room Setting</span>
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