import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	precached : false,
	online : false,
	lastRequest : 0
}

export const apiLoadSlice = createSlice( {
	name : 'apiLoad',
	initialState,
	reducers : {
		setOnline : ( state, action ) => {
			if (!state.precached) {
				state.precached = action.payload
			}
			state.online = action.payload
		},
		updateLastRequestDate : ( state ) => {
			state.lastRequest = Date.now()
		},
	},
} )

export const { setOnline, updateLastRequestDate } = apiLoadSlice.actions

export const isOnline = (state) => state.apiLoad.online
export const isPrecached = (state) => state.apiLoad.precached
export const lastRequestDate = (state) => state.apiLoad.lastRequest

export default apiLoadSlice.reducer
