import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchTasks } from './api';

const initialState = {
	tasks : [],
	prefetching : true,
	loading : true
}

export const taskSlice = createSlice( {
	name : 'tasks',
	initialState,
	reducers : {
		tasksReceived : ( state, action ) => {
			state.tasks = action.payload
			state.prefetching = false
			state.loading = false
		},
		tasksLoading : ( state ) => {
			if ( !state.loading ) {
				state.loading = true
			}
		},
	},
} )

export const { tasksReceived, tasksLoading } = taskSlice.actions

export const refreshTasks = async ( dispatch ) => {
	dispatch( tasksLoading() )
	const tasks = await fetchTasks()
	dispatch( tasksReceived( tasks ) )
}

export const getTasks = ( state ) => state.tasks.tasks
export const isPrefetching = ( state ) => state.tasks.prefetching

export default taskSlice.reducer
