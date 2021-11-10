import React from 'react';
import { useSelector } from 'react-redux';
import { CardTemplate } from './CardTemplate';
import { formatPrice } from '../services/utils';
import { getMonthlies, isMonthlyLoading } from '../services/monthlySlice';
import { getMonthID } from '../services/uiSlice';
import { getFilteredBills } from '../services/billSlice';

export function TotalStatus() {
	const monthlies = useSelector( getMonthlies )
	const loading = useSelector( isMonthlyLoading )
	const bills = useSelector( getFilteredBills ).map(bill => bill._id)
	const month_id = useSelector( getMonthID )

	let totalDueValue = monthlies.filter( item => bills.includes(item.parent) && item.status !== 'PAID' && item.month_id === month_id )
		.map( item => item.amount_due )
	let totalPaidValue = monthlies.filter( item => bills.includes(item.parent) && item.status === 'PAID' && item.month_id === month_id )
		.map( item => item.amount_paid )

	const totalDueCount = totalDueValue.length
	const totalPaidCount = totalPaidValue.length
	const totalMissingCount = bills.length - totalDueCount - totalPaidCount

	totalDueValue = totalDueValue.reduce( ( a, b ) => a + b, 0 )
	totalPaidValue = totalPaidValue.reduce( ( a, b ) => a + b, 0 )

	const totalPaidPercent = (( totalPaidValue / ( totalPaidValue + totalDueValue ) ) * 100)
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
			value : totalDueCount + totalPaidCount + totalMissingCount,
		},
		{
			label : 'Facturas por pagar:',
			value : totalDueCount,
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
		<div className={`bar ${percent === 100? 'borderless':''} `} style={{width: `${percent.toFixed(2)}%`}}/>
		<div className={'perc-display'}>{`${label}: ${percent.toFixed(2)}%`}</div>
	</div>
