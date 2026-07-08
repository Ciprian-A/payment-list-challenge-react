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
} from '../components/components'
import {PaymentsTable} from '../components/PaymentsTable'
import {CURRENCIES} from '../constants'
import {I18N} from '../constants/i18n'
import {usePaymentsPage} from '../hooks/usePaymentsPage'

export function PaymentsPage() {
	const {
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
	} = usePaymentsPage()

	return (
		<Container>
			<Title>{I18N.PAGE_TITLE}</Title>
			<FilterRow>
				<FlexRow>
					<SearchInput
						data-testid='search-input'
						placeholder={I18N.SEARCH_PLACEHOLDER}
						value={input}
						onChange={e => setInput(e.target.value)}
						aria-label={I18N.SEARCH_LABEL}
						name={I18N.SEARCH_LABEL}
					/>
					<Select
						data-testid='currency-select'
						aria-label={I18N.CURRENCY_FILTER_LABEL}
						name={I18N.CURRENCY_FILTER_LABEL}
						value={currencyInput}
						onChange={e => setCurrencyInput(e.target.value)}>
						<option value=''>{I18N.CURRENCIES_OPTION}</option>
						{CURRENCIES.map(c => (
							<option value={c} key={c}>
								{c}
							</option>
						))}
					</Select>
					<SearchButton
						data-testid='search-button'
						onClick={handleSearch}
						aria-label={I18N.SEARCH_BUTTON}>
						{I18N.SEARCH_BUTTON}
					</SearchButton>
					{filtersActive && (
						<ClearButton
							data-testid='clear-filters-button'
							onClick={handleClearFilters}
							aria-label={I18N.CLEAR_FILTERS}>
							{I18N.CLEAR_FILTERS}
						</ClearButton>
					)}
				</FlexRow>
			</FilterRow>
			{isLoading && <Spinner data-testid='spinner' />}

			{error && (
				<ErrorBox role='alert' data-testid='error-box'>
					{error.message === 'NOT_FOUND' && I18N.PAYMENT_NOT_FOUND}
					{error.message === 'SERVER_ERROR' && I18N.INTERNAL_SERVER_ERROR}
				</ErrorBox>
			)}

			{!error &&
				data &&
				(data.payments.length === 0 ? (
					<EmptyBox role='status' data-testid='empty-box'>
						{I18N.NO_PAYMENTS_FOUND}
					</EmptyBox>
				) : (
					<PaymentsTable
						payments={data.payments}
						page={page}
						onPrevious={goToPreviousPage}
						onNext={goToNextPage}
						isFirstPage={isFirstPage}
						isLastPage={isLastPage}
					/>
				))}
		</Container>
	)
}
