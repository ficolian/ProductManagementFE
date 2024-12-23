import XIcon from "assets/icon/XIcon"

export default function BackButton(props){
    return(
        <button className="button flex gap-2" onClick={props?.onClick}>
            <XIcon className="w-6 fill-white" />
            <span>Back</span>
        </button>
    )
}