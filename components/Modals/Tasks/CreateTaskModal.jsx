import React from 'react';
import { ModalTemplate } from '../ModalTemplate';
import { DualInput, Input } from '../../Input';
import { Button } from '../../Buttons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { createTask } from '../../../services/api';
import { SuccessContents } from '../../SuccessContents';
import { RequestingContents } from '../../RequestingContents';
import { useDispatch } from 'react-redux';
import { setModal } from '../../../services/uiSlice';
import { refreshTasks } from '../../../services/taskSlice';

export default function CreateTaskModal() {
	const [ taskData, setTaskData ] = React.useState( {
		status : 'PENDING'
	} )
	const [ formState, setFormState ] = React.useState( 0 );
	const [ hasError, setError ] = React.useState( false );
	const dispatch = useDispatch();

	const handleChange = ( name, value ) => {
		setTaskData( { ...taskData, [ name ] : value } )
		setError( false )
	}

	const close = () => dispatch( setModal( '' ) )

	const createRequest = () => {
		setFormState( 1 )
		createTask( taskData )
			.then( () => {
				setFormState( 2 )
				dispatch( refreshTasks )
				setTimeout( close, 1000 )
			} )
			.catch( () => {
				setFormState( 0 )
				setError( true )
			} )
	}

	if ( formState === 1 ) {
		return <ModalTemplate doCloseButton={false}>
			<RequestingContents text={ 'Creando...' }/>
		</ModalTemplate>
	}

	if ( formState === 2 ) {
		return <ModalTemplate doCloseButton={false}>
			<SuccessContents/>
		</ModalTemplate>
	}

	return (
		<ModalTemplate
			title={ 'Nueva tarea' }
		>
			<Input
				value={ taskData.name }
				name={ 'name' }
				placeholder={ 'Nombre' }
				onChange={ handleChange }
			/>
			<Input
				value={ taskData.information }
				name={ 'information' }
				placeholder={ 'Información adicional' }
				onChange={ handleChange }
			/>
			<Input
				value={ taskData.due_date }
				name={ 'due_date' }
				placeholder={ 'Fecha limite' }
				onChange={ handleChange }
				type={ 'date' }
			/>
			<DualInput>
				<Button
					onClick={ close }
					label={ 'Cancelar' }
					color={ 'gray' }
				/>
				<Button
					onClick={ createRequest }
					icon={ faPlus }
					label={ 'Agregar' }
					color={ 'green' }
				/>
			</DualInput>
		</ModalTemplate>
	);
}

