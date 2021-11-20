import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSelectedTask, refreshTasks } from '../../../services/taskSlice';
import { ModalTemplate } from '../ModalTemplate';
import { DualInput } from '../../Input';
import { Button } from '../../Buttons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { setModal } from '../../../services/uiSlice';
import { deleteTask } from '../../../services/api';
import { isOnline } from '../../../services/apiLoadSlice';

export default function DeleteTaskModal() {
	const [ formState, setFormState ] = React.useState( 0 );
	const taskData = useSelector( getSelectedTask )
	const dispatch = useDispatch()
	const onlineState = useSelector(isOnline)

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
				setFormState( 3 )
				setTimeout( () => setFormState(0), 1000 )
			} )
	}

	return (
		<ModalTemplate
			title={ 'Borrar tarea' }
			formState={formState}
			processText={'Borrando'}
		>
			<div></div>

			<div className={ 'task-info' } style={ { textAlign : 'center' } }>
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
					disabled={onlineState}
				/>
			</DualInput>
		</ModalTemplate>
	);
}

