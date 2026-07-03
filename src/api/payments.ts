import {PaymentsResponse} from '../types/payment'

export async function fetchPayments(params: {
	search: string
	currency: string
	page: number
	pageSize: number
}): Promise<PaymentsResponse> {
	const query = new URLSearchParams({
		search: params.search,
		currency: params.currency,
		page: String(params.page),
		pageSize: String(params.pageSize)
	})
	const url = new URL(`/api/payments?${query.toString()}`, 'http://localhost')
	const res = await fetch(url)

	if (!res.ok) {
		if (res.status === 404) throw new Error('NOT_FOUND')
		if (res.status === 500) throw new Error('SERVER_ERROR')
		throw new Error('UNKNOWN_ERROR')
	}

	return res.json()
}
