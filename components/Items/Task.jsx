import React from 'react';
import { faInfo } from '@fortawesome/free-solid-svg-icons';
import { patchTask } from '../../services/api';
import { Button } from '../Buttons';
import { refreshTasks, setSelectedTask } from '../../services/taskSlice';
import { useDispatch } from 'react-redux';
import { setModal } from '../../services/uiSlice';
import { Checkbox } from '../Input';

export function Task( { taskData } ) {
	const dispatch = useDispatch()

	const openTask = () => {
		dispatch( setSelectedTask( taskData._id ) )
		dispatch( setModal( 'info-task' ) )
	}

	const handleClick = async () => {
		const task = {
			...taskData,
			status : taskData.status === 'DONE' ? 'PENDING' : 'DONE',
			done_date: taskData.status === 'DONE' ? '' : Date.now()
		}
		await patchTask( task )
		dispatch( refreshTasks )
	}

	return (
		<div className={ 'task-item' }>
			<Checkbox
				isDone={taskData.status === 'DONE'}
				handleClick={handleClick}
				label={taskData.name}
				labelClass={'task-label'}
			/>
			<Button
				icon={ faInfo }
				className={ 'icon-button' }
				onClick={ openTask }
				color={'transp'}
			/>
		</div>
	);
}

export function TaskMock() {
	return (
		<div className={ 'task-item mock-up' }>
			<Checkbox/>
		</div>
	);
}
