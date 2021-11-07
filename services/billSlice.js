import { createSlice } from '@reduxjs/toolkit'
import { fetchBills } from './api';

const initialState = {
	bills : [],
	billPrefetching : true,
	billLoading : true,
	selectedBill : '',
}

export const billSlice = createSlice( {
	name : 'bills',
	initialState,
	reducers : {
		setSelectedBill : ( state, action ) => {
			state.selectedBill = action.payload
		},
		billsReceived : ( state, action ) => {
			state.bills = action.payload
			state.billPrefetching = false
			state.billLoading = false
		},
		billsLoading : ( state ) => {
			if ( !state.billLoading ) {
				state.billLoading = true
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

export const getBills = ( state ) => state.bills.bills
export const isBillPrefetching = ( state ) => state.bills.billPrefetching
export const isBillLoading = ( state ) => state.bills.billLoading
export const getSelectedBill = ( state ) => state.bills.bills.find( item => item._id === state.bills.selectedBill )

export default billSlice.reducer
