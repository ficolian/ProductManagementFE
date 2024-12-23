import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default function MainContainer({ children }) {
	let pathName = window.location.pathname
	let pathArray = pathName.split("/")

	if (pathArray[1] === "login"){
		return(
			<div className="overflow-hidden">
				<div className="">{ children }</div>
			</div>
		)
	}

	return (
		<div className="overflow-hidden h-screen w-full flex flex-col bg-black">
			<div className="sticky top-0 left-0 bottom-0 z-30 shadow-md">
				<Navbar />
			</div>
			<div className='w-full overflow-hidden flex bg-white shadow-md'>
				<div className='sticky top-0 z-30'>
					<Sidebar sidebarIsOpen={ localStorage.getItem("SidebarState") === null ? "true" : localStorage.getItem("SidebarState") } />
				</div>
				<div className='p-6 w-full overflow-auto bg-slate-50'>
					{ children }
				</div>
			</div>
		</div>
	)
}
