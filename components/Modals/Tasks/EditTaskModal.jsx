import React from 'react';
import { ModalTemplate } from '../ModalTemplate';
import { DualInput, Input } from '../../Input';
import { Button } from '../../Buttons';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { patchTask } from '../../../services/api';
import { useDispatch, useSelector } from 'react-redux';
import { setModal } from '../../../services/uiSlice';
import { getSelectedTask, refreshTasks } from '../../../services/taskSlice';
import { formatDateValue } from '../../../services/utils';

export default function EditTaskModal() {
	const initialData = useSelector( getSelectedTask )
	const [ taskData, setTaskData ] = React.useState( { ...initialData } )
	const [ formState, setFormState ] = React.useState( 0 );
	const dispatch = useDispatch();

	const handleChange = ( name, value ) => {
		setTaskData( { ...taskData, [ name ] : value } )
	}

	const close = () => dispatch( setModal( 'info-task' ) )

	const editRequest = () => {
		setFormState( 1 )
		patchTask( taskData )
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
			title={ 'Editar tarea' }
			formState={formState}
			processText={'Editando'}
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
				placeholder={ 'Información' }
				onChange={ handleChange }
			/>
			<Input
				value={ formatDateValue( { date: taskData.due_date }) }
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
					onClick={ editRequest }
					icon={ faPen }
					label={ 'Editar' }
					color={ 'green' }
				/>
			</DualInput>
		</ModalTemplate>
	);
}

