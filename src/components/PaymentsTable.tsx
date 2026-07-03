import {I18N} from '../constants/i18n'
import {Payment} from '../types/payment'
import {
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

export function PaymentsTable({payments}: {payments: Payment[]}) {
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
		</TableWrapper>
	)
}
