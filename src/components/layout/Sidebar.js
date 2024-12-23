import React, { useState, useEffect } from 'react';
import UserIcon from 'assets/icon/UserIcon';
import CategoryIcon from 'assets/icon/CategoryIcon';
import SettingIcon from 'assets/icon/SettingIcon';
import DockTopIcon from 'assets/icon/DockTop';
import NotepadIcon from 'assets/icon/NotepadIcon';
import MenuIcon from 'assets/icon/MenuIcon';
import DashboardIcon from 'assets/icon/DashboardIcon';

export default function Sidebar() {
	let sidebarState = localStorage.getItem("SidebarState")
	const [sidebarIsOpen, setSidebarIsOpen] = useState()
	const [isSidebarHome, setIsSidebarHome] = useState(true)
	let pathArray = window.location.pathname.split("/")
	
	useEffect(() => {
		if (sidebarState !== null){
			if (sidebarState === "open"){
				setSidebarIsOpen(true)
			}else{
				setSidebarIsOpen(false)
			}
		}
		else{
			localStorage.setItem("SidebarState", "open")
			setSidebarIsOpen(true)
		}
	}, [])

	useEffect(() => {
		if (pathArray[1] === "kost"){
			setIsSidebarHome(false)
		}else{
			setIsSidebarHome(true)
		}
	}, [pathArray])

	function fHandleSidebarIconClick(){
		if(!sidebarIsOpen){
			localStorage.setItem("SidebarState", "open")
			setSidebarIsOpen(true)
		}else{
			localStorage.setItem("SidebarState", "close")
			setSidebarIsOpen(false)
		}
	}
  
	return (
		<div className={`h-screen shadow-md transition-all z-20 ${ sidebarIsOpen ? 'w-80' : 'w-24' } `}>
			{ isSidebarHome ?
				<div className={`h-screen flex flex-col items-center gap-6 md:text-xs lg:text-base py-4 w-full`}>
					<div className={`flex w-full items-center px-4 ${ sidebarIsOpen ? 'flex-row' : 'flex-row justify-center' } `}>
						{ sidebarIsOpen ? 
								<a className="flex w-full px-4 gap-4" href="/">
									<h1 className={`my-auto font-bold italic `}>Admin</h1>
								</a>
							:
							<div />
						}
						<button onClick={() => { fHandleSidebarIconClick()  }}>
							<MenuIcon className='fill-black w-5' />
						</button>
					</div>
					<div className="items-start flex flex-col w-full gap-2 px-4">
						<a className={`w-full py-3 px-4 cursor-pointer hover:bg-slate-300 transition-all rounded-md flex items-center
								${ window.location.pathname === '/' ? 'bg-slate-300' : '' } 
								${ sidebarIsOpen ? '' : 'justify-center' } 
							`}
							href="/"
						>
							<DashboardIcon className='fill-black w-6' />
							<p className={`px-4 ${ sidebarIsOpen ? 'block' : 'hidden' }`}>Home</p>
						</a>

						<a className={`w-full py-3 px-4 cursor-pointer hover:bg-slate-300 transition-all rounded-md flex items-center
								${ window.location.pathname === '/product' ? 'bg-slate-300' : '' }
								${ sidebarIsOpen ? '' : 'justify-center' }
							`}
							href="/product"
						>
							<CategoryIcon className='fill-black w-6' />
							<p className={`px-4 ${ sidebarIsOpen ? 'block' : 'hidden' }`}>Product</p>
						</a>

						{/* <a className={`w-full py-3 px-4 cursor-pointer hover:bg-slate-300 transition-all rounded-md flex items-center
								${ window.location.pathname === '/income' ? 'bg-slate-300' : '' }
								${ sidebarIsOpen ? '' : 'justify-center' }
							`}
							href="/income"
						>
							<UserIcon className='fill-black w-6' />
							<p className={`px-4 ${ sidebarIsOpen ? 'block' : 'hidden' }`}>Income</p>
						</a>
						<a
							className={`w-full py-3 px-4 cursor-pointer hover:bg-slate-300 transition-all rounded-md flex items-center
								${ window.location.pathname === '/tables' ? 'bg-slate-300' : '' } 
								${ sidebarIsOpen ? '' : 'justify-center' }
							`}
							href="/tables"
						>
							<DockTopIcon className='fill-black w-6' />
							<p className={`px-4 ${ sidebarIsOpen ? 'block' : 'hidden' }`}>Tables</p>
						</a>
						<a
							className={`w-full py-3 px-4 cursor-pointer hover:bg-slate-300 transition-all rounded-md flex items-center
								${ window.location.pathname === '/bill-history' ? 'bg-slate-300' : '' } 
								${ sidebarIsOpen ? '' : 'justify-center' }\
							`}
							href="/bill-history"
						>
							<NotepadIcon className='fill-black w-6' />
							<p className={`px-4 ${ sidebarIsOpen ? 'block' : 'hidden' }`}>Bill History</p>
						</a> */}
						<a
							className={`w-full py-3 px-4 cursor-pointer hover:bg-slate-300 transition-all rounded-md flex items-center
								${ window.location.pathname === '/setting' ? 'bg-slate-300' : '' } 
								${ sidebarIsOpen ? '' : 'justify-center' }
							`}
							href="/setting"
						>
							<SettingIcon className='fill-black w-6' />
							<p className={`px-4 ${ sidebarIsOpen ? 'block' : 'hidden' }`}>Setting</p>
						</a>
					</div>
				</div>	

				:

				<div className={`h-screen flex flex-col items-center gap-6 md:text-xs lg:text-base py-4 w-full`}>
					<div className={`flex w-full items-center px-4 ${ sidebarIsOpen ? 'flex-row' : 'flex-row justify-center' } `}>
						{ sidebarIsOpen ? 
								<a className="flex w-full px-4 gap-4" href="/">
									<h1 className={`my-auto font-bold italic `}>{ localStorage.getItem("KostName") }</h1>
								</a>
							:
							<div />
						}
						<button onClick={() => { fHandleSidebarIconClick() }}>
							<MenuIcon className='fill-black w-5' />
						</button>
					</div>

					<div className="items-start flex flex-col w-full gap-2 px-4">
						<a className={`w-full py-3 px-4 cursor-pointer hover:bg-slate-300 transition-all rounded-md flex items-center
								${ window.location.pathname === '/kost/dashboard' ? 'bg-slate-300' : '' } 
								${ sidebarIsOpen ? '' : 'justify-center' } 
							`}
							onClick={() => {  }}
							href="/kost/dashboard"
						>
							<DashboardIcon className='fill-black w-6' />
							<p className={`px-4 ${ sidebarIsOpen ? 'block' : 'hidden' }`}>Dashboard</p>
						</a>

						<a className={`w-full py-3 px-4 cursor-pointer hover:bg-slate-300 transition-all rounded-md flex items-center
								${ window.location.pathname === '/kost/tenant' ? 'bg-slate-300' : '' }
								${ sidebarIsOpen ? '' : 'justify-center' }
							`}
							href="/kost/tenant"
						>
							<CategoryIcon className='fill-black w-6' />
							<p className={`px-4 ${ sidebarIsOpen ? 'block' : 'hidden' }`}>Tenant</p>
						</a>

						<a className={`w-full py-3 px-4 cursor-pointer hover:bg-slate-300 transition-all rounded-md flex items-center
								${ window.location.pathname === '/kost/room' ? 'bg-slate-300' : '' }
								${ sidebarIsOpen ? '' : 'justify-center' }
							`}
							href="/kost/room"
						>
							<UserIcon className='fill-black w-6' />
							<p className={`px-4 ${ sidebarIsOpen ? 'block' : 'hidden' }`}>Room</p>
						</a>

						<a
							className={`w-full py-3 px-4 cursor-pointer hover:bg-slate-300 transition-all rounded-md flex items-center
								${ window.location.pathname === '/kost/booking' ? 'bg-slate-300' : '' } 
								${ sidebarIsOpen ? '' : 'justify-center' }\
							`}
							href="/kost/booking"
						>
							<NotepadIcon className='fill-black w-6' />
							<p className={`px-4 ${ sidebarIsOpen ? 'block' : 'hidden' }`}>Booking</p>
						</a>

						<a
							className={`w-full py-3 px-4 cursor-pointer hover:bg-slate-300 transition-all rounded-md flex items-center
								${ window.location.pathname === '/kost/payment' ? 'bg-slate-300' : '' } 
								${ sidebarIsOpen ? '' : 'justify-center' }
							`}
							href="/kost/payment"
						>
							<DockTopIcon className='fill-black w-6' />
							<p className={`px-4 ${ sidebarIsOpen ? 'block' : 'hidden' }`}>Payment</p>
						</a>
						
						<a
							className={`w-full py-3 px-4 cursor-pointer hover:bg-slate-300 transition-all rounded-md flex items-center
								${ window.location.pathname === '/kost/setting' ? 'bg-slate-300' : '' } 
								${ sidebarIsOpen ? '' : 'justify-center' }
							`}
							href="/kost/setting"
						>
							<SettingIcon className='fill-black w-6' />
							<p className={`px-4 ${ sidebarIsOpen ? 'block' : 'hidden' }`}>Setting</p>
						</a>
					</div>
				</div>


			}
				
		{/* {loadingModal.isOpen && (
			<LoadingModal
			onClose={() => setLoadingModal({ isOpen: false })}
			data={loadingModal?.data}
			/>
		)}
		{failModal.isOpen && (
			<FailModal
			onClose={() => setFailModal({ isOpen: false, data: {} })}
			data={failModal?.data}
			/>
		)}
		{successModal.isOpen && (
			<SuccessModal
			onClose={() => setSuccessModal({ isOpen: false, data: {} })}
			data={successModal?.data}
			/>
		)} */}
		</div>
  	)
}
