import {useQuery} from '@tanstack/react-query'
import {fetchPayments} from '../api/payments'

export function usePaymentsQuery(params?: {
	search?: string
	currency?: string
	page?: number
	pageSize?: number
}) {
	const {search = '', currency = '', page = 1, pageSize = 5} = params ?? {}
	return useQuery({
		queryKey: ['payments', {search, currency, page, pageSize}],
		queryFn: () => fetchPayments({search, currency, page, pageSize}),
		retry: false
	})
}
