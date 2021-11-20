import { createSlice } from '@reduxjs/toolkit'
import { fetchMonthlies } from './api';
import { updateLastRequestDate } from './apiLoadSlice';

const initialState = {
	data : [],
	prefetching : true,
	loading : true,
	selected : '',
}

export const monthlySlice = createSlice( {
	name : 'monthlies',
	initialState,
	reducers : {
		setSelectedMonthly : ( state, action ) => {
			state.selected = action.payload
		},
		monthlyReceived : ( state, action ) => {
			state.data = action.payload
				.map(monthly => ({...monthly, status: getMonthlyStatusText(monthly.status, monthly.exp_date)}))
			state.prefetching = false
			state.loading = false
		},
		monthlyLoading : ( state ) => {
			if ( !state.loading ) {
				state.loading = true
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
		dispatch( updateLastRequestDate() )
	}
}

const getMonthlyStatusText = (curText, expDate) => (curText === 'PENDING' ? ( new Date( expDate ) < new Date() ? 'OVERDUE' : 'PENDING' ) : curText)

export const getMonthlies = ( state ) => state.monthlies.data
export const isMonthlyPrefetching = ( state ) => state.monthlies.prefetching
export const isMonthlyLoading = ( state ) => state.monthlies.loading
export const getSelectedMonthly = ( state ) => state.monthlies.data
	.find(item => item._id === state.monthlies.selected )
export const getCurrentMonthlies = ( state ) => state.monthlies.data
	.filter(item => item.month_id === state.ui.month )

export default monthlySlice.reducer
