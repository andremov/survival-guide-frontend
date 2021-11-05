import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchTasks } from './api';

const initialState = {
	modal : '',
	toasts : [],
}

export const uiSlice = createSlice( {
	name : 'ui',
	initialState,
	reducers : {
		setModal : ( state, action ) => {
			state.modal = action.payload
		},
		addToast : ( state, action ) => {
			state.toasts = [...state.toasts, action.payload]
		},
	},
} )

export const { setModal, addToast } = uiSlice.actions

export const getModal = ( state ) => state.ui.modal
export const getToasts = ( state ) => state.ui.toasts

export default uiSlice.reducer
