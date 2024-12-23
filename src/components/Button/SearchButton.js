import SearchIcon from "assets/icon/SearchIcon"

export default function SearchButton(props){
    return(
        <button className="button flex gap-2" onClick={props?.onClick}>
            <SearchIcon className="w-6 fill-white" />
            <span>Search</span>
        </button>
    )
}