import {useState} from 'react'
import {PaymentsTable} from '../components/PaymentsTable'
import {I18N} from '../constants/i18n'
import {usePaymentsQuery} from '../hooks/usePaymentsQuery'
import {
	ClearButton,
	Container,
	ErrorBox,
	FilterRow,
	FlexRow,
	SearchButton,
	SearchInput,
	Spinner,
	Title
} from './components'

export function PaymentsPage() {
	const [search, setSearch] = useState('')
	const [input, setInput] = useState('')
	const {data, isLoading, error} = usePaymentsQuery({search})
	const filtersActive = search !== ''
	const handleClearFilters = () => {
		setInput('')
		setSearch('')
	}
	const handleSearch = () => {
		setSearch(input)
	}
	console.log({error})
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

			{data && <PaymentsTable payments={data.payments} />}
		</Container>
	)
}
