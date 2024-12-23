import TrashIcon from "assets/icon/TrashIcon"

export default function DeleteButton(props){
    return(
        <button className={`button flex gap-2 ${ props?.visible ? 'block' : 'hidden' }`} onClick={props?.onClick}>
            <TrashIcon className="fill-white w-6" />
            <span>Delete</span>
        </button>
    )
}