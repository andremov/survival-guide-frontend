import React from 'react';
import { useSelector } from 'react-redux';
import { getFilters } from '../../services/billSlice';
import { getSortDirection, getSortField } from '../../services/uiSlice';
import { useCurrentMonthBills } from './useCurrentMonthBills';

const applyFilters = (bills,filters) => {

	const { person_name, institution, monthly_status } = filters
	let filteredBills = [ ...bills ]
	if ( person_name.length > 0 ) {
		filteredBills = filteredBills.filter( bill => person_name.includes( bill.person_name ) )
	}
	if ( institution.length > 0 ) {
		filteredBills = filteredBills.filter( bill => institution.includes( bill.institution ) )
	}
	if ( monthly_status.length > 0 ) {
		filteredBills = filteredBills.filter( bill => monthly_status.includes( bill.monthly.status ) )
	}
	return filteredBills
}

const applySort = (bills, sortField, sortDirection) => {
	if ( sortField === 'amount' ) {
		console.log(bills)
		return bills.sort(
			( a, b ) => ( b.monthly.amount - a.monthly.amount ) * sortDirection
		)
	} else {
		return bills.sort(
			( a, b ) => a[ sortField ].localeCompare( b[ sortField ] ) * sortDirection
		)
	}
}

export function useListedBills() {
  let bills = useCurrentMonthBills()
	const filters=useSelector(getFilters)
	const sortField = useSelector(getSortField)
	const sortDirection = useSelector(getSortDirection)


	bills = applyFilters(bills,filters)
	bills = applySort(bills, sortField,sortDirection)

	return bills
}

