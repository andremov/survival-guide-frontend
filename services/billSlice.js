import { createSlice } from '@reduxjs/toolkit'
import { fetchBills } from './api';

const initialState = {
	data : [],
	prefetching : true,
	loading : true,
	selected : '',
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
	},
} )

export const {
	billsReceived,
	billsLoading,
	setSelectedBill,
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

export const getBills = ( state ) => state.bills.data
export const isBillPrefetching = ( state ) => state.bills.prefetching
export const isBillLoading = ( state ) => state.bills.loading
export const getSelectedBill = ( state ) => state.bills.data.find( item => item._id === state.bills.selected )

export default billSlice.reducer
