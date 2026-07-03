export type Currency =
	| 'USD'
	| 'EUR'
	| 'GBP'
	| 'AUD'
	| 'CAD'
	| 'ZAR'
	| 'JPY'
	| 'CZK'
export type PaymentStatus = 'completed' | 'pending' | 'failed' | 'refunded'
export interface Payment {
	id: string
	customerName: string
	amount: number
	customerAddress: string
	currency: Currency
	status: PaymentStatus
	date: string
	description: string
	clientId: string
}

export interface PaymentsResponse {
	payments: Payment[]
	total: number
	page: number
	pageSize: number
}
