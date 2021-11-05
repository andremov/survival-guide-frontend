import React from 'react';
import { Modal } from './Modal';
import { DualInput, Input } from '../Input';
import { Button } from '../Buttons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { createTask } from '../../services/api';
import { SuccessForm } from '../SuccessForm';
import { RequestingForm } from '../RequestingForm';

export function NewTaskModal( { closeCallback } ) {
	const [ taskData, setTaskData ] = React.useState( {
		status : 'PENDING'
	} )
	const [formState, setFormState] = React.useState(0);
	const [ hasError, setError ] = React.useState( false );

	const handleChange = ( name, value ) => {
		setTaskData( { ...taskData, [ name ] : value } )
		setError(false)
	}
	const createTaskRequest = () => {
		setFormState(1)
		createTask( taskData )
			.then(() => {
				setFormState( 2 )
				setTimeout(closeCallback, 3000)
			})
			.catch( () => {
				setFormState( 0 )
				setError( true )
			} )
	}

	return (
		<Modal
			title={ 'Nueva tarea' }
		>
			{
				formState === 0 && <>
					<Input value={ taskData.name } name={ 'name' } placeholder={ 'Nombre' } onChange={ handleChange }/>
					<Input value={ taskData.information } name={ 'information' } placeholder={ 'Información' }
					       onChange={ handleChange }/>
					<Input value={ taskData.due_date } name={ 'due_date' } placeholder={ 'Fecha limite' } onChange={ handleChange }
					       type={ 'date' }/>
					<DualInput>
						<Button
							onClick={ closeCallback }
							label={ 'Cancelar' }
							color={ 'gray' }
						/>
						<Button
							onClick={ createTaskRequest }
							icon={ faPlus }
							label={ 'Agregar' }
							color={ 'green' }
						/>
					</DualInput>
				</>
			}
			{
				formState === 1 && <>
					<RequestingForm/>
				</>
			}
			{
				formState === 2 && <>
					<SuccessForm/>
				</>
			}
		</Modal>
	);
}

