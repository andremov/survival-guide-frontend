import React from 'react';
import { fetchTasks } from '../services/api';

export function useTasks() {
	const [ tasks, setTasks ] = React.useState( [] )
	const [isPrefetching, setPrefetching] = React.useState( true )

	const refreshTasks = () => {
		fetchTasks().then(taskData => {
			setTasks(taskData)
			setPrefetching(false)
		})
	}

	React.useEffect( refreshTasks, [] )

	return [ tasks, refreshTasks, isPrefetching ]
}
