import React from 'react';
import { useSelector } from 'react-redux';
import { CardTemplate } from './CardTemplate';
import { formatPrice } from '../services/utils';
import { isMonthlyLoading } from '../services/monthlySlice';
import { useListedBills } from './Hooks/useListedBills';

export function TotalStatus() {
	const loading = useSelector( isMonthlyLoading )
	const bills = useListedBills()

	let totalDueValue = bills.filter( bill => bill.monthly.status === 'PENDING' )
		.map( item => item.monthly.amount_due )
	let totalOverdueValue = bills.filter( bill => bill.monthly.status === 'OVERDUE' )
		.map( item => item.monthly.amount_due )
	let totalPaidValue = bills.filter( bill => bill.monthly.status === 'PAID' )
		.map( item => item.monthly.amount_paid )

	const totalDueCount = totalDueValue.length
	const totalOverdueCount = totalOverdueValue.length
	const totalPaidCount = totalPaidValue.length
	const totalMissingCount = bills.length - totalDueCount - totalPaidCount - totalOverdueCount

	totalDueValue = totalDueValue.reduce( ( a, b ) => a + b, 0 ) + totalOverdueValue.reduce( ( a, b ) => a + b, 0 )
	totalPaidValue = totalPaidValue.reduce( ( a, b ) => a + b, 0 )

	const totalPaidPercent = totalPaidValue + totalDueValue === 0? 0 : (( totalPaidValue / ( totalPaidValue + totalDueValue ) ) * 100)
	const billsPaidPercent = (( totalPaidCount / bills.length ) * 100)
	const billsMissingPercent = (((bills.length-totalMissingCount) / bills.length ) * 100)

	const totals = [
		{
			label : 'Total por pagar:',
			value : formatPrice( totalDueValue ),
		},
		{
			label : 'Total pagado:',
			value : formatPrice( totalPaidValue ),
		},
		{
			label : 'Facturas totales:',
			value : bills.length,
		},
		{
			label : 'Facturas por pagar:',
			value : totalDueCount,
		},
		{
			label : 'Facturas atrasadas:',
			value : totalOverdueCount,
		},
		{
			label : 'Facturas pagadas:',
			value : totalPaidCount,
		},
		{
			label : 'Facturas por reportar:',
			value : totalMissingCount,
		},
	]

	return (
		<CardTemplate className={ 'totals-card' } title={ 'Totales' }>
			{
				loading ? totals.slice( 0, 2 )
					.map( ( item, i ) => <TotalInfoMockup
						{ ...item }
						key={ i }
					/> ) : totals.slice( 0, 2 )
					.map( ( item, i ) => <TotalInfoItem
						{ ...item }
						key={ i }
					/> )
			}

			<ProgressBar
				percent={totalPaidPercent}
				label={'Total pagado'}
			/>

			<hr style={ { width : '80%' } }/>

			{

				loading ? totals.slice( 2 )
					.map( ( item, i ) => <TotalInfoMockup
						{ ...item }
						key={ i }
					/> ) : totals.slice( 2 )
					.map( ( item, i ) => <TotalInfoItem
						{ ...item }
						key={ i }
					/> )
			}

			<ProgressBar
				percent={billsMissingPercent}
				label={'Facturas reportadas'}
			/>

			<ProgressBar
				percent={billsPaidPercent}
				label={'Facturas pagadas'}
			/>

		</CardTemplate>
	);
}

const TotalInfoItem = ( { label, value } ) => <div className={ 'totals-info' }>
	<div className={ 'totals-info__label' }>
		{ label }
	</div>
	<div className={ 'totals-info__value' }>
		{ value }
	</div>
</div>

const TotalInfoMockup = ({label}) => <div className={ 'totals-info mock-up' }>
	<div className={ 'totals-info__label' }>
		{ label }
	</div>
	<div className={ 'totals-info__value' }/>
</div>

const ProgressBar = ({percent, label}) =>	<div className={'progress-bar-container'}>
		<div className={`bar ${percent%100 === 0? 'borderless':''} `} style={{width: `${percent.toFixed(2)}%`}}/>
		<div className={'perc-display'}>{`${label}: ${percent.toFixed(2)}%`}</div>
	</div>
