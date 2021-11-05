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

export default function NewBillModal() {
	const [ billData, setBillData ] = React.useState( {} )
	const [ formState, setFormState ] = React.useState( 0 );
	const [ hasError, setError ] = React.useState( false );
	const dispatch = useDispatch();

	const handleChange = ( name, value ) => {
		setBillData( { ...billData, [ name ] : value } )
		setError( false )
	}

	const close = () => dispatch( setModal( '' ) )

	const createTaskRequest = () => {
		setFormState( 1 )
		createBill( billData )
			.then( () => {
				setFormState( 2 )
				dispatch( refreshTasks )
				setTimeout( close, 2000 )
			} )
			.catch( () => {
				setFormState( 0 )
				setError( true )
			} )
	}

	if ( formState === 1 ) {
		return <ModalTemplate>
			<RequestingContents text={ 'Creando...' }/>
		</ModalTemplate>
	}

	if ( formState === 2 ) {
		return <ModalTemplate>
			<SuccessContents/>
		</ModalTemplate>
	}

	return (
		<ModalTemplate
			title={ 'Nueva Factura' }
		>
			<Input
				value={ billData.name }
				name={ 'name' }
				placeholder={ 'Nombre' }
				onChange={ handleChange }
			/>
			<Input
				value={ billData.information }
				name={ 'information' }
				placeholder={ 'Información' }
				onChange={ handleChange }
			/>
			<Input
				value={ billData.due_date }
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
					onClick={ createTaskRequest }
					icon={ faPlus }
					label={ 'Agregar' }
					color={ 'green' }
				/>
			</DualInput>
		</ModalTemplate>
	);
}

