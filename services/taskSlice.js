import { createSlice } from '@reduxjs/toolkit'
import { fetchTasks } from './api';
import { updateLastRequestDate } from './apiLoadSlice';

const initialState = {
	data : [],
	prefetching : true,
	loading : true,
	selected: ''
}

export const taskSlice = createSlice( {
	name : 'tasks',
	initialState,
	reducers : {
		setSelectedTask: ( state, action ) => {
			state.selected = action.payload
		},
		tasksReceived : ( state, action ) => {
			state.data = action.payload
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

export const { tasksReceived, tasksLoading, setSelectedTask } = taskSlice.actions

export const refreshTasks = async ( dispatch ) => {
	dispatch( tasksLoading() )
	const tasks = await fetchTasks()

	if (!tasks) {
		setTimeout(() => dispatch(refreshTasks), 100)
	} else {
		dispatch( tasksReceived( tasks ) )
		dispatch( updateLastRequestDate() )
	}
}

export const getTasks = ( state ) => state.tasks.data
export const isPrefetching = ( state ) => state.tasks.prefetching
export const isLoading = ( state ) => state.tasks.loading
export const getSelectedTask = ( state ) => state.tasks.data.find(item => item._id === state.tasks.selected)

export default taskSlice.reducer
