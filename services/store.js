import { configureStore } from '@reduxjs/toolkit'
import apiLoadReducer from './apiLoadSlice'
import taskReducer from './taskSlice'
import uiReducer from './uiSlice'

export function makeStore() {
	return configureStore({
		reducer: {
			apiLoad: apiLoadReducer,
			tasks: taskReducer,
			ui: uiReducer
		},
	})
}

const store = makeStore()

export default store
