import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faInfo } from '@fortawesome/free-solid-svg-icons';
import { patchTask } from '../services/api';
import { Button } from './Buttons';
import { refreshTasks } from '../services/taskSlice';
import { useDispatch } from 'react-redux';

export function Task( { taskData } ) {
	const dispatch = useDispatch()

	const handleClick = async () => {
		const task = { ...taskData, status : taskData.status === 'DONE'? 'PENDING' : 'DONE' }
		await patchTask( task )
		dispatch( refreshTasks )
	}

	return (
		<div className={ `task-item ${taskData.status === 'DONE'? 'checked' : ''}` } onClick={handleClick}>
			<div className={ 'check-box' }>
				{ taskData.status === 'DONE' && <FontAwesomeIcon icon={ faCheck }/> }
			</div>
			<div className={ 'task-label' }>
				{ taskData.name }
			</div>
			<Button
				icon={faInfo}
				className={'bordered'}
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
