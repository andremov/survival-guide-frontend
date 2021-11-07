import React from 'react';
import { ModalTemplate } from '../ModalTemplate';
import { DualInput, Input } from '../../Input';
import { Button } from '../../Buttons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { createBill } from '../../../services/api';
import { SuccessContents } from '../../SuccessContents';
import { RequestingContents } from '../../RequestingContents';
import { useDispatch, useSelector } from 'react-redux';
import { setModal } from '../../../services/uiSlice';
import { getInstitutions, getPeople, refreshOptions } from '../../../services/optionSlice';
import { refreshBills } from '../../../services/billSlice';

export default function CreateBillModal() {
	const [ billData, setBillData ] = React.useState( {} )
	const [ formState, setFormState ] = React.useState( 0 );
	const [ hasError, setError ] = React.useState( false );
	const dispatch = useDispatch();
	const institutions = useSelector(getInstitutions)
	const people = useSelector(getPeople)

	const handleChange = ( name, value ) => {
		setBillData( { ...billData, [ name ] : value } )
		setError( false )
	}

	const close = () => dispatch( setModal( '' ) )

	const createRequest = () => {
		setFormState( 1 )
		createBill( billData )
			.then( () => {
				setFormState( 2 )
				dispatch( refreshBills )
				dispatch( refreshOptions )
				setTimeout( close, 1000 )
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
				value={ billData.institution }
				name={ 'institution' }
				placeholder={ 'Institución' }
				onChange={ handleChange }
				type={'smart'}
				options={institutions}
			/>
			<Input
				value={ billData.person_name }
				name={ 'person_name' }
				placeholder={ 'A nombre de' }
				onChange={ handleChange }
				type={'smart'}
				options={people}
			/>
			<Input
				value={ billData.information }
				name={ 'information' }
				placeholder={ 'Información adicional' }
				onChange={ handleChange }
			/>
			<Input
				value={ billData.bill_type }
				name={ 'bill_type' }
				placeholder={ 'Tipo de Factura' }
				onChange={ handleChange }
				type={ 'select' }
				options={[
					{ label : 'Fisica', val : 'PHYSICAL' },
					{ label : 'Virtual', val : 'VIRTUAL' },
					{ label : 'Ambos', val : 'BOTH' }
				]}
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

