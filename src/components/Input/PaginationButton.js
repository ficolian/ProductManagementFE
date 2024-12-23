import Dropdown from "./Dropdown"
import ChevronsLeftIcon from "assets/icon/ChevronsLeftIcon"
import ChevronLeftIcon from "assets/icon/ChevronLeftIcon"
import ChevronRightIcon from "assets/icon/ChevronRightIcon"
import ChevronsRightIcon from "assets/icon/ChevronsRightIcon"

export default function PaginationButton(props){
    return(
        <div className="mt-5 flex justify-end gap-1">
            <button className="px-2 py-2 bg-black rounded" onClick={props?.btnFirstClick}>
                <ChevronsLeftIcon className="w-6 fill-white" />
            </button>
            <button className="px-2 py-2 bg-black rounded" onClick={props?.btnBackClick}>
                <ChevronLeftIcon className="w-6 fill-white" />
            </button>
            <div className="">
                <Dropdown className="w-24" options={props?.options} value={props?.value} onChange={props?.onChange} />
            </div>                
            <button className="px-2 py-2 bg-black rounded" onClick={props?.btnNextClick}>
                <ChevronRightIcon className="w-6 fill-white" />
            </button>
            <button className="px-2 py-2 bg-black rounded" onClick={props?.btnLastClick}>
                <ChevronsRightIcon className="w-6 fill-white" />
            </button>
        </div>
    )
}