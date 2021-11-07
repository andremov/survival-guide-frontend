import { createSlice } from '@reduxjs/toolkit'
import { fetchMonthID} from './api';

const initialState = {
	modal : '',
	toasts : [],
	month : 0
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
		monthIdReceived : ( state, action ) => {
			state.month = action.payload
		},
	},
} )

export const {
	setModal, addToast, monthIdReceived,
} = uiSlice.actions

export const refreshMonthID = async ( dispatch ) => {
	const id = await fetchMonthID()

	if ( !id ) {
		setTimeout( () => dispatch( refreshMonthID ), 100 )
	} else {
		dispatch( monthIdReceived( id ) )
	}
}

export const getModal = ( state ) => state.ui.modal
export const getToasts = ( state ) => state.ui.toasts
export const getMonthID = ( state ) => state.ui.month

export default uiSlice.reducer
