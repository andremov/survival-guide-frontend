import React from 'react';
import { ModalTemplate } from '../ModalTemplate';
import { DualInput, Input } from '../../Input';
import { Button } from '../../Buttons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { createBill } from '../../../services/api';
import { useDispatch, useSelector } from 'react-redux';
import { setModal } from '../../../services/uiSlice';
import { getInstitutions, getPeople, refreshOptions } from '../../../services/optionSlice';
import { refreshBills } from '../../../services/billSlice';
import { isOnline } from '../../../services/apiLoadSlice';

export default function CreateBillModal() {
	const [ billData, setBillData ] = React.useState( {} )
	const [ formState, setFormState ] = React.useState( 0 );
	const dispatch = useDispatch();
	const institutions = useSelector(getInstitutions)
	const people = useSelector(getPeople)
	const onlineState = useSelector(isOnline)

	const handleChange = ( name, value ) => {
		setBillData( { ...billData, [ name ] : value } )
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
				setFormState( 3 )
				setTimeout( () => setFormState(0), 1000 )
			} )
	}

	return (
		<ModalTemplate
			title={ 'Nueva Factura' }
			formState={formState}
			processText={'Creando'}
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
					disabled={!onlineState}
				/>
			</DualInput>
		</ModalTemplate>
	);
}

