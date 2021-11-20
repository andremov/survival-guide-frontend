import { createSlice } from '@reduxjs/toolkit'
import { fetchMonthID} from './api';
import { updateLastRequestDate } from './apiLoadSlice';

const initialState = {
	modal : '',
	toasts : [],
	month : 0,
	sortField : 'amount',
	sortDirection : 1
}

export const uiSlice = createSlice( {
	name : 'ui',
	initialState,
	reducers : {
		setModal : ( state, action ) => {
			state.modal = action.payload
		},
		addToast : ( state, action ) => {
			state.toasts = [ ...state.toasts, action.payload ]
		},
		setSort : ( state, action ) => {
			if (state.sortField === action.payload) {
				state.sortDirection = state.sortDirection * -1
			} else {
				state.sortField = action.payload
				state.sortDirection = 1
			}
		},
		monthIdReceived : ( state, action ) => {
			state.month = action.payload
		},
	},
} )

export const {
	setModal, addToast, monthIdReceived, setSort
} = uiSlice.actions

export const refreshMonthID = async ( dispatch ) => {
	const id = await fetchMonthID()

	if ( !id ) {
		setTimeout( () => dispatch( refreshMonthID ), 100 )
	} else {
		dispatch( monthIdReceived( id ) )
		dispatch( updateLastRequestDate() )
	}
}

export const getModal = ( state ) => state.ui.modal
export const getToasts = ( state ) => state.ui.toasts
export const getMonthID = ( state ) => state.ui.month
export const getSortField = ( state ) => state.ui.sortField
export const getSortDirection = ( state ) => state.ui.sortDirection

export default uiSlice.reducer
