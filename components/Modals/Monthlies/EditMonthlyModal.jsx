import React from 'react';
import { ModalTemplate } from '../ModalTemplate';
import { DualInput, Input } from '../../Input';
import { Button } from '../../Buttons';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { SuccessContents } from '../../SuccessContents';
import { RequestingContents } from '../../RequestingContents';
import { useDispatch, useSelector } from 'react-redux';
import { setModal } from '../../../services/uiSlice';
import { getSelectedMonthly, refreshMonthlies } from '../../../services/billSlice';
import { patchMonthly } from '../../../services/api';

export default function EditMonthlyModal() {
	const initialData = useSelector( getSelectedMonthly )
	const [ monthlyData, setMonthlyData ] = React.useState( { ...initialData } )
	const [ formState, setFormState ] = React.useState( 0 );
	const [ hasError, setError ] = React.useState( false );
	const dispatch = useDispatch();

	const handleChange = ( name, value ) => {
		setMonthlyData( { ...monthlyData, [ name ] : value } )
		setError( false )
	}

	const close = () => dispatch( setModal( 'task-info' ) )

	const editTaskRequest = () => {
		setFormState( 1 )
		patchMonthly( monthlyData )
			.then( () => {
				setFormState( 2 )
				dispatch( refreshMonthlies )
				setTimeout( close, 2000 )
			} )
			.catch( () => {
				setFormState( 0 )
				setError( true )
			} )
	}

	if ( formState === 1 ) {
		return <ModalTemplate>
			<RequestingContents text={ 'Editando...' }/>
		</ModalTemplate>
	}

	if ( formState === 2 ) {
		return <ModalTemplate>
			<SuccessContents/>
		</ModalTemplate>
	}

	return (
		<ModalTemplate
			title={ 'Editar tarea' }
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
					onClick={ editTaskRequest }
					icon={ faPen }
					label={ 'Editar' }
					color={ 'green' }
				/>
			</DualInput>
		</ModalTemplate>
	);
}

