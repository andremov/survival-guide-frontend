import { createSlice } from '@reduxjs/toolkit'
import { fetchMonthlies } from './api';

const initialState = {
	monthlies : [],
	monthlyPrefetching : true,
	monthlyLoading : true,
	selectedMonthly : '',
}

export const monthlySlice = createSlice( {
	name : 'monthlies',
	initialState,
	reducers : {
		setSelectedMonthly : ( state, action ) => {
			state.selectedMonthly = action.payload
		},
		monthlyReceived : ( state, action ) => {
			state.monthlies = action.payload
			state.monthlyPrefetching = false
			state.monthlyLoading = false
		},
		monthlyLoading : ( state ) => {
			if ( !state.monthlyLoading ) {
				state.monthlyLoading = true
			}
		},
	},
} )

export const {
	setSelectedMonthly,
	monthlyReceived,
	monthlyLoading,
} = monthlySlice.actions


export const refreshMonthlies = async ( dispatch ) => {
	dispatch( monthlyLoading() )
	const monthlies = await fetchMonthlies()

	if ( !monthlies ) {
		setTimeout( () => dispatch( refreshMonthlies ), 100 )
	} else {
		dispatch( monthlyReceived( monthlies ) )
	}
}

export const getMonthlies = ( state ) => state.monthlies.monthlies
export const isMonthlyPrefetching = ( state ) => state.monthlies.monthlyPrefetching
export const isMonthlyLoading = ( state ) => state.monthlies.monthlyLoading
export const getSelectedMonthly = ( state ) => state.monthlies.monthlies.find(
	item => item._id === state.monthlies.selectedMonthly )

export default monthlySlice.reducer
