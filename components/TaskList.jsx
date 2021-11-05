import React from 'react';
import { useTasks } from '../hooks/useTasks';
import { Task, TaskMock } from './Task';

export function TaskList() {
	const [ tasks, updateTasks, isPrefetching ] = useTasks();

	if ( isPrefetching ) {
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
			tasks.map( ( item, i ) => <Task key={ i } taskData={item} refreshTasks={updateTasks} /> )
		}
	</>
}

