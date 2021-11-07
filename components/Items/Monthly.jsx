import React from 'react';
import { useDispatch } from 'react-redux';
import { setModal } from '../../services/uiSlice';
import { formatDate, formatPrice } from '../../services/utils';
import { setSelectedBill } from '../../services/billSlice';
import { setSelectedMonthly } from '../../services/monthlySlice';

export function Monthly( { monthlyData } ) {
	const dispatch = useDispatch()

	const openMonthly = () => {
		dispatch( setSelectedMonthly( monthlyData._id ) )
		dispatch( setModal( 'info-monthly' ) )
	}

	return (
		<div
			className={ `monthly-item ${ monthlyData.status === 'PAID' ? 'paid' : '' }` }
			onClick={ openMonthly }
		>
			<div className={ 'monthly-price' }>
				{ `${ formatPrice( monthlyData.status === 'PAID' ? monthlyData.amount_paid : monthlyData.amount_due ) }` }
			</div>

			<div
				className={ 'monthly-date' }
				style={ monthlyData.status !== 'PAID' && Date.parse(monthlyData.exp_date) < Date.now() ? { color : '#ff0000' } : {} }
			>
				{ `${ formatDate( monthlyData.status === 'PAID' ? monthlyData.paid_date : monthlyData.exp_date ) }` }
			</div>
		</div>
	);
}

export function MonthlyMock() {
	return (
		<div className={ 'monthly-item mock-up' }/>
	);
}

export function MonthlyBlank( { parent, month } ) {
	const dispatch = useDispatch()
	const onAdd = () => {
		dispatch( setSelectedBill( parent ) )
		dispatch( setModal( 'create-monthly' ) )
	}

	return (
		<div className={ 'monthly-item blank' } onClick={ onAdd }>
			<div className={ 'monthly-price' }>
				{`Mes ${month}`}
			</div>
		</div>
	);
}

