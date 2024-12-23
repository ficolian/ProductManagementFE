import { useCallback, useState } from 'react'
import api from 'api'
import { ApiResponseStatusUnauthorized, AxiosNetworkError } from 'utils/Constant'

function useFetch(request) {
	const [data, setData] = useState(null)
	const [loading, setLoading] = useState(true)
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [error, setError] = useState(null)

   	const fetch = useCallback(async ({ query, params, data, headers } = {}) => {
		try {
			setLoading(true)
			setIsSubmitting(true)
			const paramKeys = params ? Object.keys(params) : [];
			const response = await api.request({
				method: request.method,
				url: params ? request.url.replace(`:${paramKeys[0]}`, params[paramKeys[0]]) : request.url,
				params: query || undefined,
				data: data || undefined,
				headers: {
				'Content-Type': 'application/json',
				'Authorization': 'bearer ' + localStorage.getItem("Token"),
				...headers,
				},
			})
			
			setData(response.data)
			return response.data
		} catch (error) {
			console.log(error.code)
			if(error.code === AxiosNetworkError){
				return { status: 0, message: "Network error", data: {} }
			}

			if(error.response.status === ApiResponseStatusUnauthorized){
				return { status: 401, message: "Token has expired", data: {} }
			}
			
			setError(error)
			return { error }
		} finally {
			setIsSubmitting(false)
			setLoading(false)
		}
   	}, [request])

   	return {
		data,
		loading,
		isSubmitting,
		error,
		fetch,
   	}
}

export default useFetch