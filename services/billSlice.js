import { createSlice } from '@reduxjs/toolkit'
import { fetchBills } from './api';
import { setOnline, updateLastRequestDate } from './apiLoadSlice';

const initialState = {
	data : [],
	prefetching : true,
	loading : true,
	selected : '',
	filters : { person_name : [], institution : [], monthly_status: [] },
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
			state.filters = { ...state.filters, [ action.payload.type ] : filterData }
		},
		clearFilters : ( state ) => {
			state.filters = { person_name : [], institution : [], monthly_status: [] }
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
		// setTimeout( () => dispatch( refreshBills ), 5000 )
		dispatch(setOnline(false))
	} else {
		dispatch( billsReceived( bills ) )
		dispatch( updateLastRequestDate() )
	}
}

export const getBills = ( state ) => state.bills.data
export const isBillPrefetching = ( state ) => state.bills.prefetching
export const isBillLoading = ( state ) => state.bills.loading
export const getSelectedBill = ( state ) => state.bills.data.find( item => item._id === state.bills.selected )
export const getFilters = ( state ) => state.bills.filters

export default billSlice.reducer
