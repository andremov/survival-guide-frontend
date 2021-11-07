import React from 'react';
import { useSelector } from 'react-redux';
import { CardTemplate } from './CardTemplate';
import { formatPrice } from '../services/utils';
import { getMonthlies } from '../services/monthlySlice';
import { getMonthID } from '../services/uiSlice';

export function TotalStatus() {
	const monthlies = useSelector( getMonthlies )
	const month_id = useSelector( getMonthID )
	const totalDue = monthlies.filter(item => item.status !== 'PAID' && item.month_id === month_id ).map(item => item.amount_due).reduce((a,b) => a + b, 0)
	const totalPaid = monthlies.filter(item => item.status === 'PAID' && item.month_id === month_id).map(item => item.amount_paid).reduce((a,b) => a + b, 0)

	return (
		<CardTemplate className={'totals-card'} title={'Totales'}>
			<div className={'totals-info'} >
				<div className={'totals-info__label'}>
					Total por pagar:
				</div>
				<div className={'totals-info__price'}>
					{ formatPrice(totalDue) }
				</div>
			</div>
			<div className={'totals-info'} >
				<div className={'totals-info__label'}>
					Total pagado:
				</div>
				<div className={'totals-info__price'}>
					{ formatPrice(totalPaid) }
				</div>
			</div>
		</CardTemplate>
	);
}

