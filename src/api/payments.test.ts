import {describe, expect, test} from 'vitest'
import {fetchPayments} from './payments'

describe('fetchPayments', () => {
	test('returns payments successfully', async () => {
		const data = await fetchPayments({
			search: '',
			currency: '',
			page: 1,
			pageSize: 5
		})

		expect(data).toHaveProperty('payments')
		expect(data.payments.length).toBe(5)
	})

	test('throws NOT_FOUND for pay_404', async () => {
		await expect(
			fetchPayments({
				search: 'pay_404',
				currency: '',
				page: 1,
				pageSize: 5
			})
		).rejects.toThrow('NOT_FOUND')
	})

	test('throws SERVER_ERROR for pay_500', async () => {
		await expect(
			fetchPayments({
				search: 'pay_500',
				currency: '',
				page: 1,
				pageSize: 5
			})
		).rejects.toThrow('SERVER_ERROR')
	})
})
