import { useEffect, useState } from 'react';
import useFetch from 'utils/hooks/useFetch';
import { ApiResponseSuccess, EmptyString } from 'utils/Constant';
import { ApiLogin } from 'utils/constants/api';
import FailModal from '../components/modal/FailModal';
import LoadingModal from 'components/modal/LoadingModal';

export default function Login() {
	const { fetch: login } = useFetch(ApiLogin)

	const[username, setUsername] = useState(EmptyString)
	const[password, setPassword] = useState(EmptyString)
	const[loginMessage, setLoginMessage] = useState()
	const[isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(true)
	const[isShowPassword, setIsShowPassword] = useState(false)

	// Modal
	const [failModal, setFailModal] = useState({ isOpen: false, data: {}, message: EmptyString })
	const [loadingModal, setLoadingModal] = useState({ isOpen: false })

	useEffect(() => {
		if(username !== EmptyString && password !== EmptyString){
			setIsLoginButtonDisabled(false)
		}else{
			setIsLoginButtonDisabled(true)
		}
	}, [username, password])

	async function fLogin(){
		setLoadingModal({isOpen: true})

		await login({
			data: {
				username: username,
				password: password
			}
		}).then((response) => {
			if(response !== null){
				if(response.status === ApiResponseSuccess){
					let data = response.data
					localStorage.setItem("Id", data.id)
					localStorage.setItem("Username", data.username)
					localStorage.setItem("FirstName", data.firstName)
					localStorage.setItem("LastName", data.lastName)
					localStorage.setItem("Email", data.email)
					localStorage.setItem("Token", data.token)

					window.location.assign('/')
				
				}else{
					setFailModal({
						isOpen: true,
						data: {
							onSuccess: async () => {
								setFailModal({isOpen: false})
							}
						},
						message: response.message
					})
				}
			}else{
				setFailModal({
					isOpen: true,
					data: {
						onSuccess: async () => {
							setFailModal({isOpen: false})
						}
					},
					message: "Server error"
				})
			}
		}).finally(() => {
			setLoadingModal({isOpen: false})
		})
	}

	function fEnterKeyDown(e){
		if(e.key === 'Enter'){
			fLogin()
		}
	}

	function fLoginBtnClick(){
		fLogin()
	}

	return (
		<div className='w-full h-screen overflow-hidden flex flex-col justify-center items-center gap-8'>
			{/* Login title */}
			<div className='flex flex-col gap-4 items-center'>
				<span className='text-3xl md:text-5xl font-semibold'>Kost Management</span>
				<span className='text-2xl'>Login</span>
			</div>
			{/* Login form */}
			<div className='flex flex-col bg-blue w-80 gap-2'>
				<div>
					<h1 className=''>Username</h1>
					<input className='seq-input' value={username} onChange={(e) => {setUsername(e.target.value)}} onKeyDown={(e) => { fEnterKeyDown(e) }} />
				</div>
				
				<div>
					<h1 className=''>Password</h1>
					<input className='seq-input' value={password} onChange={(e) => {setPassword(e.target.value)}} onKeyDown={(e) => { fEnterKeyDown(e) }} type={isShowPassword ? 'text' : 'password'} />
				</div>

				<div className='flex gap-2'>
					<input className='w-4' value={isShowPassword} checked={isShowPassword} onClick={() => { setIsShowPassword(!isShowPassword) }} type='checkbox' />
					<span>Show password</span>
				</div>

				<div>
					<span className='text-red-500'>{loginMessage}</span>
				</div>

				<button className={`login-button mt-4 ${isLoginButtonDisabled ? 'bg-app-light-grey' : 'bg-app-matte-black'}`} disabled={isLoginButtonDisabled} onClick={() => {fLoginBtnClick()}} >Login</button>
			</div>

			{/* Modal */}
			{failModal.isOpen && (
                <FailModal onClose={() => setFailModal({ isOpen: false, data: {}, message: EmptyString })} data={failModal?.data} message={failModal?.message} />
            )}
			{loadingModal.isOpen && (<LoadingModal onClose={() => setLoadingModal({ isOpen: false })} />)}
		</div>
	);
}
