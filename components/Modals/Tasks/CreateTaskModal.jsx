import React from 'react';
import { ModalTemplate } from '../ModalTemplate';
import { DualInput, Input } from '../../Input';
import { Button } from '../../Buttons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { createTask } from '../../../services/api';
import { useDispatch } from 'react-redux';
import { setModal } from '../../../services/uiSlice';
import { refreshTasks } from '../../../services/taskSlice';

export default function CreateTaskModal() {
	const [ taskData, setTaskData ] = React.useState( {
		status : 'PENDING'
	} )
	const [ formState, setFormState ] = React.useState( 0 );
	const dispatch = useDispatch();

	const handleChange = ( name, value ) => {
		setTaskData( { ...taskData, [ name ] : value } )
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
				setFormState( 3 )
				setTimeout( () => setFormState(0), 1000 )
			} )
	}

	return (
		<ModalTemplate
			title={ 'Nueva tarea' }
			formState={formState}
			processText={'Creando'}
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

