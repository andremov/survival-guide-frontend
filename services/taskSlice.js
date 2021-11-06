import { createSlice } from '@reduxjs/toolkit'
import { fetchTasks } from './api';

const initialState = {
	tasks : [],
	prefetching : true,
	loading : true,
	selectedTask: ''
}

export const taskSlice = createSlice( {
	name : 'tasks',
	initialState,
	reducers : {
		setSelectedTask: ( state, action ) => {
			state.selectedTask = action.payload
		},
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

export const { tasksReceived, tasksLoading, setSelectedTask } = taskSlice.actions

export const refreshTasks = async ( dispatch ) => {
	dispatch( tasksLoading() )
	const tasks = await fetchTasks()

	if (!tasks) {
		setTimeout(() => dispatch(refreshTasks), 100)
	} else {
		dispatch( tasksReceived( tasks ) )
	}
}

export const getTasks = ( state ) => state.tasks.tasks
export const isPrefetching = ( state ) => state.tasks.prefetching
export const isLoading = ( state ) => state.tasks.loading
export const getSelectedTask = ( state ) => state.tasks.tasks.find(item => item._id === state.tasks.selectedTask)

export default taskSlice.reducer
