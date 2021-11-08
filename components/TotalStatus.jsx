import React from 'react';
import { useSelector } from 'react-redux';
import { CardTemplate } from './CardTemplate';
import { formatPrice } from '../services/utils';
import { getMonthlies } from '../services/monthlySlice';
import { getMonthID } from '../services/uiSlice';
import { getBills } from '../services/billSlice';

export function TotalStatus() {
	const monthlies = useSelector( getMonthlies )
	const bills = useSelector( getBills )
	const month_id = useSelector( getMonthID )

	let totalDueValue = monthlies.filter( item => item.status !== 'PAID' && item.month_id === month_id )
		.map( item => item.amount_due )
	let totalPaidValue = monthlies.filter( item => item.status === 'PAID' && item.month_id === month_id )
		.map( item => item.amount_paid )

	const totalDueCount = totalDueValue.length
	const totalPaidCount = totalPaidValue.length
	const totalMissingCount = bills.length - totalDueCount - totalPaidCount

	totalDueValue = totalDueValue.reduce( ( a, b ) => a + b, 0 )
	totalPaidValue = totalPaidValue.reduce( ( a, b ) => a + b, 0 )

	return (
		<CardTemplate className={ 'totals-card' } title={ 'Totales' }>
			<div className={ 'totals-info' }>
				<div className={ 'totals-info__label' }>
					Total por pagar:
				</div>
				<div className={ 'totals-info__price' }>
					{ formatPrice( totalDueValue ) }
				</div>
			</div>

			<div className={ 'totals-info' }>
				<div className={ 'totals-info__label' }>
					Total pagado:
				</div>
				<div className={ 'totals-info__price' }>
					{ formatPrice( totalPaidValue ) }
				</div>
			</div>

			<hr style={{width: '80%'}}/>

			<div className={ 'totals-info' }>
				<div className={ 'totals-info__label' }>
					Facturas totales:
				</div>
				<div className={ 'totals-info__price' }>
					{ totalDueCount+totalPaidCount+totalMissingCount }
				</div>
			</div>

			<div className={ 'totals-info' }>
				<div className={ 'totals-info__label' }>
					Facturas por pagar:
				</div>
				<div className={ 'totals-info__price' }>
					{ totalDueCount }
				</div>
			</div>

			<div className={ 'totals-info' }>
				<div className={ 'totals-info__label' }>
					Facturas pagadas:
				</div>
				<div className={ 'totals-info__price' }>
					{ totalPaidCount }
				</div>
			</div>

			<div className={ 'totals-info' }>
				<div className={ 'totals-info__label' }>
					Facturas por reportar:
				</div>
				<div className={ 'totals-info__price' }>
					{ totalMissingCount }
				</div>
			</div>
		</CardTemplate>
	);
}

