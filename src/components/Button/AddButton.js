import PlusIcon from "assets/icon/PlusIcon"

export default function AddButton(props){
    return(
        <button className="button flex gap-2" onClick={ props?.onClick }>
            <PlusIcon />
            <span>Add</span>
        </button>
    )
}