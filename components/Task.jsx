import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { patchTask } from '../services/api';

export function Task( { taskData, refreshTasks } ) {

	const handleClick = async () => {
		await patchTask( { ...taskData, status : taskData.status === 'DONE'? 'PENDING' : 'DONE' } )
		refreshTasks()
	}

	return (
		<div className={ `task-item ${taskData.status === 'DONE'? 'checked' : ''}` } onClick={handleClick}>
			<div className={ 'check-box' }>
				{ taskData.status === 'DONE' && <FontAwesomeIcon icon={ faCheck }/> }
			</div>
			<div className={ 'task-label' }>
				{ taskData.name }
			</div>
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
