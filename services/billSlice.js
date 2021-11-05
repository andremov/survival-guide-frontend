import { createSlice } from '@reduxjs/toolkit'
import { fetchBills, fetchMonthlies } from './api';

const initialState = {
	bills : [],
	billPrefetching : true,
	billLoading : true,
	selectedBill: '',

	monthlies: [],
	monthlyPrefetching : true,
	monthlyLoading : true,
	selectedMonthly: '',
}

export const billSlice = createSlice( {
	name : 'bills',
	initialState,
	reducers : {
		setSelectedBill: ( state, action ) => {
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
		setSelectedMonthly: ( state, action ) => {
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

export const { billsReceived, billsLoading, setSelectedBill, setSelectedMonthly, monthlyReceived, monthlyLoading } = billSlice.actions

export const refreshBills = async ( dispatch ) => {
	dispatch( billsLoading() )
	const bills = await fetchBills()
	dispatch( billsReceived( bills ) )
}

export const refreshMonthlies = async ( dispatch ) => {
	dispatch( monthlyLoading() )
	const monthlies = await fetchMonthlies()
	dispatch( monthlyReceived( monthlies ) )
}

export const getBills = ( state ) => state.bills.bills
export const isBillPrefetching = ( state ) => state.bills.billPrefetching
export const isBillLoading = ( state ) => state.bills.billLoading
export const getSelectedBill = ( state ) => state.bills.bills.find(item => item._id === state.bills.selectedBill)

export const getMonthlies = ( state ) => state.bills.monthlies
export const isMonthlyPrefetching = ( state ) => state.bills.monthlyPrefetching
export const isMonthlyLoading = ( state ) => state.bills.monthlyLoading
export const getSelectedMonthly = ( state ) => state.bills.monthlies.find(item => item._id === state.bills.selectedMonthly)

export default billSlice.reducer
