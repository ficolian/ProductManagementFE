import SaveIcon from "assets/icon/SaveIcon"

export default function SaveButton(props){
    return(
        <button className={`button flex gap-2 ${ props?.visible ? 'block' : 'hidden' }`} onClick={props?.onClick}>
            <SaveIcon className="fill-white w-6" />
            <span>Save</span>
        </button>
    )
}