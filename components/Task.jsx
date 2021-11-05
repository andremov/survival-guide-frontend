import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faInfo } from '@fortawesome/free-solid-svg-icons';
import { patchTask } from '../services/api';
import { Button } from './Buttons';
import { refreshTasks, setSelectedTask } from '../services/taskSlice';
import { useDispatch } from 'react-redux';
import { setModal } from '../services/uiSlice';

export function Task( { taskData } ) {
	const dispatch = useDispatch()

	const openTask = () => {
		dispatch( setSelectedTask( taskData._id ) )
		dispatch( setModal( 'task-info' ) )
	}

	const handleClick = async () => {
		const task = { ...taskData, status : taskData.status === 'DONE' ? 'PENDING' : 'DONE' }
		await patchTask( task )
		dispatch( refreshTasks )
	}

	return (
		<div className={ `task-item ${ taskData.status === 'DONE' ? 'checked' : '' }` }>
			<div className={ 'check-box' } onClick={ handleClick }>
				{ taskData.status === 'DONE' && <FontAwesomeIcon icon={ faCheck }/> }
			</div>
			<div className={ 'task-label' }>
				{ taskData.name }
			</div>
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
			<div className={ 'check-box' }/>
			<div className={ 'task-label' }/>
		</div>
	);
}
