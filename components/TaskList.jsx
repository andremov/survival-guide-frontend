import React from 'react';
import { Task, TaskMock } from './Items/Task';
import { useSelector } from 'react-redux';
import { getTasks, isPrefetching } from '../services/taskSlice';

export function TaskList() {
	const tasks = useSelector( getTasks )
	const prefetching = useSelector( isPrefetching )

	if ( prefetching ) {
		return <div className={ 'task-list' }>
			{
				[ ...new Array( 4 ).keys() ].map( ( item, i ) => <TaskMock key={ i }/> )
			}
		</div>
	}

	if ( tasks.length === 0 ) {
		return <>
			No hay tareas.
		</>
	}

	return <div className={ 'task-list' }>
		{
			tasks.map( ( item, i ) => <Task key={ i } taskData={ item }/> )
		}
	</div>
}

