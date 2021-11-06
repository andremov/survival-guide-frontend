import React from 'react';
import { useDispatch } from 'react-redux';
import { setModal } from '../../services/uiSlice';
import { setSelectedMonthly } from '../../services/billSlice';
import { formatDate, formatPrice } from '../../services/utils';

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
			<div className={'monthly-price'}>
				{ `${formatPrice( monthlyData.paid ? monthlyData.amount_paid : monthlyData.amount_due )}` }
			</div>

			<div className={'monthly-date'}>
				{ `${formatDate( monthlyData.paid ? monthlyData.paid_date : monthlyData.exp_date )}` }
			</div>
		</div>
	);
}

export function MonthlyMock() {
	return (
		<div className={ 'monthly-item mock-up' }/>
	);
}

export function MonthlyBlank() {
	return (
		<div className={ 'monthly-item blank' }/>
	);
}

