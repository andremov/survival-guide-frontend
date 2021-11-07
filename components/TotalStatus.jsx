import React from 'react';
import { useSelector } from 'react-redux';
import { CardTemplate } from './CardTemplate';
import { formatPrice } from '../services/utils';
import { getMonthlies } from '../services/monthlySlice';

export function TotalStatus() {
	const monthlies = useSelector( getMonthlies )
	const totalDue = monthlies.filter(item => item.status !== 'PAID').map(item => item.amount_due)
	const totalPaid = monthlies.filter(item => item.status === 'PAID').map(item => item.amount_paid)
	// const

	return (
		<CardTemplate title={'Totales'}>
			<div style={{margin: '1rem', fontWeight: 'bold', fontSize: '24px'}}>
				{/*{ formatPrice(totalDue.reduce((a,b) => a + b), 0) }*/}
			</div>
			<div style={{margin: '1rem', fontWeight: 'bold', fontSize: '24px'}}>
				{/*{ formatPrice(totalDue.reduce((a,b) => a + b), 0) }*/}
			</div>
			<div style={{margin: '1rem', fontWeight: 'bold', fontSize: '24px'}}>
				{/*{ formatPrice(totalDue.reduce((a,b) => a + b), 0) }*/}
			</div>
		</CardTemplate>
	);
}

