import {PaymentsTable} from '../components/PaymentsTable'
import {I18N} from '../constants/i18n'
import {usePaymentsQuery} from '../hooks/usePaymentsQuery'
import {Container, ErrorBox, Spinner, Title} from './components'

export function PaymentsPage() {
	const {data, isLoading, error} = usePaymentsQuery()

	return (
		<Container>
			<Title>{I18N.PAGE_TITLE}</Title>

			{isLoading && <Spinner />}

			{error && <ErrorBox>{I18N.SOMETHING_WENT_WRONG}</ErrorBox>}

			{data && <PaymentsTable payments={data.payments} />}
		</Container>
	)
}
