import React from 'react';
import { useSelector } from 'react-redux';
import { getMonthlies } from '../services/billSlice';
import { CardTemplate } from './CardTemplate';
import { formatPrice } from '../services/utils';

export function TotalStatus() {
	const monthlies = useSelector( getMonthlies ).filter(item => item.status !== 'PAID').map(item => item.amount_due)
	return (
		<CardTemplate title={'Total a pagar'}>
			<div style={{margin: '1rem', fontWeight: 'bold', fontSize: '24px'}}>
				{ formatPrice(monthlies.reduce((a,b) => a + b)) }
			</div>
		</CardTemplate>
	);
}

