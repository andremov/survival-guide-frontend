import { configureStore } from '@reduxjs/toolkit'
import apiLoadReducer from './apiLoadSlice'
import taskReducer from './taskSlice'

export function makeStore() {
	return configureStore({
		reducer: {
			apiLoad: apiLoadReducer,
			tasks: taskReducer
		},
	})
}

const store = makeStore()

export default store
