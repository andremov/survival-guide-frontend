import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSelectedTask, refreshTasks } from '../../../services/taskSlice';
import { ModalTemplate } from '../ModalTemplate';
import { DualInput } from '../../Input';
import { Button } from '../../Buttons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { setModal } from '../../../services/uiSlice';
import { deleteTask } from '../../../services/api';
import { RequestingContents } from '../../RequestingContents';
import { SuccessContents } from '../../SuccessContents';

export default function DeleteTaskModal() {
	const taskData = useSelector( getSelectedTask )
	const dispatch = useDispatch()
	const [ formState, setFormState ] = React.useState( 0 );

	const close = () => dispatch( setModal( '' ) )
	const back = () => dispatch( setModal( 'info-task' ) )

	const deleteRequest = () => {
		setFormState( 1 )
		deleteTask( taskData._id )
			.then( () => {
				setFormState( 2 )
				dispatch( refreshTasks )
				setTimeout( close, 1000 )
			} )
			.catch( () => {
				setFormState( 0 )
			} )
	}

	if ( formState === 1 ) {
		return <ModalTemplate>
			<RequestingContents text={ 'Borrando...' }/>
		</ModalTemplate>
	}

	if ( formState === 2 ) {
		return <ModalTemplate>
			<SuccessContents/>
		</ModalTemplate>
	}

	return (
		<ModalTemplate
			title={ 'Borrar tarea' }
		>
			<div></div>

			<div className={ 'task-value' } style={ { textAlign : 'center' } }>
				{ `¿ Seguro desea borrar tarea "${ taskData.name }" ?` }
			</div>

			<DualInput>
				<Button
					onClick={ back }
					label={ 'Cancelar' }
					color={ 'gray' }
				/>
				<Button
					onClick={ deleteRequest }
					icon={ faTrash }
					label={ 'Borrar' }
					color={ 'red' }
				/>
			</DualInput>
		</ModalTemplate>
	);
}

