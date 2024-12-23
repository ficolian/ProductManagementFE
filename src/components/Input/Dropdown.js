import ReactDropdown from "react-dropdown"
import 'react-dropdown/style.css'

// eslint-disable-next-line import/no-anonymous-default-export
export default function (props){
    return(
        <ReactDropdown options={props?.options} value={props?.value} onChange={props?.onChange} className={props?.className} disabled={props?.disabled} />
    )
}