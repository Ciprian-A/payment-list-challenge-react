import {useState} from 'react'
import {usePaymentsQuery} from './usePaymentsQuery'

type ParsedQuery = {
	search: string
	currency: string
}

export const parseQuery = (input: string): ParsedQuery => {
	const trimmedInput = input.trim()
	if (!trimmedInput.includes(':')) {
		return {search: trimmedInput, currency: ''}
	}

	const filters: Record<string, string> = {}
	const parts = trimmedInput.split(/\s+AND\s+/i)
	for (const part of parts) {
		const [key, value] = part.split(':')
		if (key && value) {
			filters[key.trim().toLowerCase()] = value.trim()
		}
	}

	return {
		search: filters.id ?? '',
		currency: filters.currency ?? ''
	}
}

export function usePaymentsPage() {
	const [search, setSearch] = useState('')
	const [input, setInput] = useState('')
	const [currency, setCurrency] = useState('')
	const [currencyInput, setCurrencyInput] = useState('')
	const [page, setPage] = useState(1)

	const {data, isLoading, error} = usePaymentsQuery({search, currency, page})

	const filtersActive = search !== '' || currency !== ''
	const totalPages = data && Math.ceil(data.total / 5)
	const isLastPage = page === totalPages
	const isFirstPage = page === 1

	const handleSearch = () => {
		const isAdvancedQuery = input.includes(':')

		if (isAdvancedQuery) {
			const parsed = parseQuery(input)
			setSearch(parsed.search)
			setCurrency(parsed.currency)
		} else {
			setSearch(input)
			setCurrency(currencyInput)
		}
		setPage(1)
	}

	const handleClearFilters = () => {
		setInput('')
		setSearch('')
		setCurrency('')
		setCurrencyInput('')
	}

	const goToPreviousPage = () => setPage(p => p - 1)
	const goToNextPage = () => setPage(p => p + 1)

	return {
		data,
		isLoading,
		error,
		input,
		setInput,
		currencyInput,
		setCurrencyInput,
		filtersActive,
		isFirstPage,
		isLastPage,
		page,
		handleSearch,
		handleClearFilters,
		goToPreviousPage,
		goToNextPage
	}
}
