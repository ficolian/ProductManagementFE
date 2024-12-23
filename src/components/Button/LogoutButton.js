import ExitIcon from "assets/icon/ExitIcon"

export default function LogoutButton(props){
    return(
        <button className='flex gap-2 px-4 py-2 hover' onClick={props?.onClick}>
            <span>Logout</span>
            <ExitIcon />
        </button>
    )
}