import React from 'react'

function SortIcon({
    className = ""
}) {
    return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M8 16H4l6 6V2H8zm6-11v17h2V8h4l-6-6z"></path>
        </svg>
    )
}

export default SortIcon