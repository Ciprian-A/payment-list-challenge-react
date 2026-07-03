import {useState} from 'react'
import {CURRENCIES} from '../constants'
import {I18N} from '../constants/i18n'
import {usePaymentsQuery} from '../hooks/usePaymentsQuery'
import {
	ClearButton,
	Container,
	EmptyBox,
	ErrorBox,
	FilterRow,
	FlexRow,
	SearchButton,
	SearchInput,
	Select,
	Spinner,
	Title
} from './components'
import {PaymentsTable} from './PaymentsTable'

export function PaymentsPage() {
	const [search, setSearch] = useState('')
	const [input, setInput] = useState('')
	const [currency, setCurrency] = useState('')
	const [currencyInput, setCurrencyInput] = useState('')
	const [page, setPage] = useState(1)

	const {data, isLoading, error} = usePaymentsQuery({search, currency, page})
	const filtersActive = search !== '' || currency !== ''

	const handleClearFilters = () => {
		setInput('')
		setSearch('')
		setCurrency('')
		setCurrencyInput('')
	}
	const handleSearch = () => {
		setSearch(input)
		setCurrency(currencyInput)
	}
	const totalPages = data && Math.ceil(data.total / 5)
	const isLastPage = page === totalPages

	return (
		<Container>
			<Title>{I18N.PAGE_TITLE}</Title>
			<FilterRow>
				<FlexRow>
					<SearchInput
						placeholder={I18N.SEARCH_PLACEHOLDER}
						value={input}
						onChange={e => setInput(e.target.value)}
					/>
					<Select
						aria-label={I18N.CURRENCY_FILTER_LABEL}
						value={currencyInput}
						onChange={e => setCurrencyInput(e.target.value)}>
						<option value=''>{I18N.CURRENCIES_OPTION}</option>
						{CURRENCIES.map(c => (
							<option value={c} key={c}>
								{c}
							</option>
						))}
					</Select>
					<SearchButton onClick={handleSearch}>
						{I18N.SEARCH_BUTTON}
					</SearchButton>
					{filtersActive && (
						<ClearButton onClick={handleClearFilters}>
							{I18N.CLEAR_FILTERS}
						</ClearButton>
					)}
				</FlexRow>
			</FilterRow>
			{isLoading && <Spinner />}

			{error && (
				<ErrorBox>
					{error.message === 'NOT_FOUND' && I18N.PAYMENT_NOT_FOUND}
					{error.message === 'SERVER_ERROR' && I18N.INTERNAL_SERVER_ERROR}
				</ErrorBox>
			)}

			{!error &&
				data &&
				(data.payments.length === 0 ? (
					<EmptyBox>{I18N.NO_PAYMENTS_FOUND}</EmptyBox>
				) : (
					<PaymentsTable
						payments={data.payments}
						page={page}
						onPrevious={() => setPage(page - 1)}
						onNext={() => setPage(page + 1)}
						isFirstPage={page === 1}
						isLastPage={isLastPage}
					/>
				))}
		</Container>
	)
}
