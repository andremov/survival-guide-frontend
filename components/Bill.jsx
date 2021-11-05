import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faInfo } from '@fortawesome/free-solid-svg-icons';
import { patchTask } from '../services/api';
import { Button } from './Buttons';
import { refreshTasks, setSelectedTask } from '../services/taskSlice';
import { useDispatch } from 'react-redux';
import { setModal } from '../services/uiSlice';

export function Bill( { billData } ) {
	const dispatch = useDispatch()

	const openTask = () => {
		dispatch( setSelectedTask( billData._id ) )
		dispatch( setModal( 'task-info' ) )
	}

	const handleClick = async () => {
		const bill = {
			...billData,
			status : billData.status === 'DONE' ? 'PENDING' : 'DONE',
			done_date: billData.status === 'DONE' ? '' : Date.now()
		}
		await patchTask( bill )
		dispatch( refreshTasks )
	}

	return (
		<div className={ `bill-item ${ billData.status === 'DONE' ? 'checked' : '' }` }>
			<div className={ 'bill-label' }>
				{ billData.name }
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

export function BillMock() {
	return (
		<div className={ 'bill-item mock-up' }>
			<div className={ 'bill-label' }/>
		</div>
	);
}
