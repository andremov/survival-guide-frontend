import React from 'react';
import { Task, TaskMock } from './Task';
import { useDispatch, useSelector } from 'react-redux';
import { getTasks, isPrefetching, refreshTasks } from '../services/taskSlice';

export function TaskList() {
	const tasks = useSelector(getTasks)
	const prefetching = useSelector(isPrefetching)
const dispatch = useDispatch()

	React.useEffect(() => dispatch(refreshTasks), [])

	if ( prefetching ) {
		return <>
			{
				[ ...new Array( 4 ).keys() ].map( ( item, i ) => <TaskMock key={ i }/> )
			}
		</>
	}

	if ( tasks.length === 0 ) {
		return <>
			No hay tareas.
		</>
	}

	return <>
		{
			tasks.map( ( item, i ) => <Task key={ i } taskData={item} /> )
		}
	</>
}

