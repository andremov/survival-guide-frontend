import React from 'react';
import { useSelector } from 'react-redux';
import { getCurrentMonthlies} from '../../services/monthlySlice';
import { getBills } from '../../services/billSlice';

export function useCurrentMonthBills() {
	const monthlies = useSelector(getCurrentMonthlies)
		.map(monthly => ({...monthly, amount: monthly.amount_due - (monthly.amount_paid ?? 0)}))
	const bills = useSelector(getBills)
		.map(bill => ({...bill, monthly: monthlies.find(monthly => monthly.parent === bill._id) ?? {status: 'UNREPORTED', amount: 0 }}))

	return bills;
}

