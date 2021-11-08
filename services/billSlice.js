import { createSlice } from '@reduxjs/toolkit'
import { fetchBills } from './api';

const initialState = {
	data : [],
	prefetching : true,
	loading : true,
	selected : '',
	filters : { person_name : [], institution : [] },
	filtered : []
}

export const billSlice = createSlice( {
	name : 'bills',
	initialState,
	reducers : {
		setSelectedBill : ( state, action ) => {
			state.selected = action.payload
		},
		billsReceived : ( state, action ) => {
			state.data = action.payload
			state.filtered = applyFilters( action.payload, state.filters )
			state.prefetching = false
			state.loading = false
		},
		billsLoading : ( state ) => {
			if ( !state.loading ) {
				state.loading = true
			}
		},
		setFilters : ( state, action ) => {
			let filterData = [ ...state.filters[ action.payload.type ] ]
			if ( filterData.includes( action.payload.value ) ) {
				filterData = [
					...filterData.slice( 0, filterData.indexOf( action.payload.value ) ),
					...filterData.slice( filterData.indexOf( action.payload.value ) + 1 )
				]
			} else {
				filterData = [ ...filterData, action.payload.value ]
			}
			const newFilters = { ...state.filters, [ action.payload.type ] : filterData }
			state.filters = newFilters
			state.filtered = applyFilters( state.data, newFilters )
		},
		clearFilters : ( state ) => {
			state.filters = {}
		}
	},
} )

export const {
	billsReceived,
	billsLoading,
	setSelectedBill,
	setFilters,
	clearFilters
} = billSlice.actions

export const refreshBills = async ( dispatch ) => {
	dispatch( billsLoading() )
	const bills = await fetchBills()

	if ( !bills ) {
		setTimeout( () => dispatch( refreshBills ), 100 )
	} else {
		dispatch( billsReceived( bills ) )
	}
}

const applyFilters = ( bills, filters ) => {
	const { person_name, institution } = filters
	console.log(bills)
	let filteredBills = [...bills]
	if (person_name.length > 0) {
		filteredBills = filteredBills.filter( bill => person_name.includes(bill.person_name))
	}
	if (institution.length > 0) {
		filteredBills = filteredBills.filter( bill => institution.includes(bill.institution))
	}
	return filteredBills
}

export const getBills = ( state ) => state.bills.data
export const getFilteredBills = ( state ) => state.bills.filtered
export const isBillPrefetching = ( state ) => state.bills.prefetching
export const isBillLoading = ( state ) => state.bills.loading
export const getSelectedBill = ( state ) => state.bills.data.find( item => item._id === state.bills.selected )
export const getFilters = ( state ) => state.bills.filters

export default billSlice.reducer
