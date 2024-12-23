import AvatarIcon from 'assets/icon/AvatarIcon'
import MenuIcon from 'assets/icon/MenuIcon'
import LogoutButton from 'components/Button/LogoutButton'

function Navbar() {
	function fLogoutBtnClick(){
		localStorage.removeItem("Token")
		localStorage.removeItem("Username")
		localStorage.removeItem("FirstName")
		localStorage.removeItem("LastName")
		localStorage.removeItem("Email")
		window.location.href = "/login"
	}

   	return (
		<div className={`sticky top-0 bg-white transition-all z-20 w-full flex justify-between items-center py-2 px-4`}>
			<div className='flex items-center gap-4'>
				<span className='text-lg font-semibold'>Kost Management System</span>
			</div>
			<div className='flex gap-3 justify-between items-center'>
				<h1 className='pl-12 sm:pl-0'>Welcome back, { localStorage.getItem("FirstName") }</h1>
				<div className="relative flex items-center justify-center">
					<button className="rounded" >
						<AvatarIcon />
					</button>
					
					<LogoutButton onClick={() => { fLogoutBtnClick() }} />
				</div>
			</div>
		</div>
	)
}

export default Navbar