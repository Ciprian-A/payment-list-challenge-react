import {I18N} from '../constants/i18n'
import {Payment} from '../types/payment'
import {
	PaginationButton,
	PaginationRow,
	StatusBadge,
	Table,
	TableBodyWrapper,
	TableCell,
	TableHeader,
	TableHeaderRow,
	TableHeaderWrapper,
	TableRow,
	TableWrapper
} from './components'

type PaymentsTableProps = {
	payments: Payment[]
	page: number
	onPrevious: () => void
	onNext: () => void
	isFirstPage: boolean
	isLastPage: boolean
}

export function PaymentsTable({
	payments,
	page,
	onPrevious,
	onNext,
	isFirstPage,
	isLastPage
}: PaymentsTableProps) {
	return (
		<TableWrapper>
			<Table>
				<TableHeaderWrapper>
					<TableHeaderRow>
						<TableHeader>{I18N.TABLE_HEADER_PAYMENT_ID}</TableHeader>
						<TableHeader>{I18N.TABLE_HEADER_DATE}</TableHeader>
						<TableHeader>{I18N.TABLE_HEADER_AMOUNT}</TableHeader>
						<TableHeader>{I18N.TABLE_HEADER_CUSTOMER}</TableHeader>
						<TableHeader>{I18N.TABLE_HEADER_CURRENCY}</TableHeader>
						<TableHeader>{I18N.TABLE_HEADER_STATUS}</TableHeader>
					</TableHeaderRow>
				</TableHeaderWrapper>

				<TableBodyWrapper>
					{payments.map(p => (
						<TableRow key={p.id}>
							<TableCell>{p.id}</TableCell>

							<TableCell>
								{new Intl.DateTimeFormat('en-GB', {
									dateStyle: 'short',
									timeStyle: 'medium'
								}).format(new Date(p.date))}
							</TableCell>

							<TableCell>
								{new Intl.NumberFormat('en-US', {
									style: 'currency',
									currency: p.currency
								}).format(p.amount)}
							</TableCell>

							<TableCell>{p.customerName || I18N.EMPTY_CUSTOMER}</TableCell>
							<TableCell>{p.currency || I18N.EMPTY_CURRENCY}</TableCell>

							<TableCell>
								<StatusBadge status={p.status}>{p.status}</StatusBadge>
							</TableCell>
						</TableRow>
					))}
				</TableBodyWrapper>
			</Table>

			<PaginationRow>
				<PaginationButton
					disabled={isFirstPage}
					onClick={onPrevious}
					aria-label={I18N.PREVIOUS_BUTTON}>
					{I18N.PREVIOUS_BUTTON}
				</PaginationButton>
				<span aria-live='polite'>
					{I18N.PAGE_LABEL} {page}
				</span>
				<PaginationButton
					disabled={isLastPage}
					onClick={onNext}
					aria-label={I18N.NEXT_BUTTON}>
					{I18N.NEXT_BUTTON}
				</PaginationButton>
			</PaginationRow>
		</TableWrapper>
	)
}
