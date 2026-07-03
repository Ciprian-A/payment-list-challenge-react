import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {renderHook, waitFor} from '@testing-library/react'
import type {ReactNode} from 'react'
import {beforeEach, describe, expect, it, vi} from 'vitest'
import {fetchPayments} from '../api/payments'
import {mockPayments134} from '../mocks/mockPaymentsData'
import {Currency, PaymentStatus} from '../types/payment'
import {usePaymentsQuery} from './usePaymentsQuery'

vi.mock('../../api/payments', () => ({
	fetchPayments: vi.fn()
}))

const mockedFetchPayments = vi.mocked(fetchPayments)

function createWrapper() {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				retry: false
			}
		}
	})

	return function Wrapper({children}: {children: ReactNode}) {
		return (
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		)
	}
}

describe('usePaymentsQuery', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})
	it('calls fetchPayments with default params when no params are given', async () => {
		mockedFetchPayments.mockResolvedValueOnce({
			payments: mockPayments134,
			total: 5,
			page: 1,
			pageSize: 5
		})

		const {result} = renderHook(() => usePaymentsQuery(), {
			wrapper: createWrapper()
		})

		await waitFor(() => expect(result.current.isSuccess).toBe(true))

		expect(mockedFetchPayments).toHaveBeenCalledWith({
			search: '',
			currency: '',
			page: 1,
			pageSize: 5
		})
		expect(mockedFetchPayments).toHaveBeenCalledTimes(1)
	})

	it('calls fetchPayments with the provided params', async () => {
		mockedFetchPayments.mockResolvedValueOnce({
			payments: mockPayments134,
			total: 0,
			page: 2,
			pageSize: 5
		})

		const params = {
			search: 'pay_134_1',
			currency: 'USD',
			page: 1,
			pageSize: 1
		}

		const {result} = renderHook(() => usePaymentsQuery(params), {
			wrapper: createWrapper()
		})

		await waitFor(() => expect(result.current.isSuccess).toBe(true))

		expect(mockedFetchPayments).toHaveBeenCalledWith(params)
	})

	it('returns loading state before resolving, then success with data', async () => {
		const data = {
			payments: [
				{
					id: 'pay_134_1',
					customerName: 'Alice Green',
					amount: 250.0,
					customerAddress: '101 Green St, Springfield, USA',
					currency: 'USD' as Currency,
					status: 'completed' as PaymentStatus,
					date: '2024-04-15T10:00:00Z',
					description: 'Service payment',
					clientId: 'cli_100'
				}
			],
			total: 1,
			page: 2,
			pageSize: 5
		}
		mockedFetchPayments.mockResolvedValueOnce(data)

		const {result} = renderHook(() => usePaymentsQuery(), {
			wrapper: createWrapper()
		})

		expect(result.current.isLoading).toBe(true)

		await waitFor(() => expect(result.current.isSuccess).toBe(true))

		expect(result.current.data).toEqual(data)
	})

	it('returns an error state when fetchPayments rejects', async () => {
		const error = new Error('Network error')
		mockedFetchPayments.mockRejectedValueOnce(error)

		const {result} = renderHook(() => usePaymentsQuery(), {
			wrapper: createWrapper()
		})

		await waitFor(() => expect(result.current.isError).toBe(true))

		expect(result.current.error).toBe(error)

		expect(mockedFetchPayments).toHaveBeenCalledTimes(1)
	})
})
