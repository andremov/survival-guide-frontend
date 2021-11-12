import React from 'react';
import { ModalTemplate } from '../ModalTemplate';
import { Input } from '../../Input';
import { Button } from '../../Buttons';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { patchBill } from '../../../services/api';
import { useDispatch, useSelector } from 'react-redux';
import { setModal } from '../../../services/uiSlice';
import { getSelectedBill, refreshBills } from '../../../services/billSlice';
import { getInstitutions, getPeople, refreshOptions } from '../../../services/optionSlice';

export default function EditBillModal() {
	const initialData = useSelector( getSelectedBill )
	const [ billData, setBillData ] = React.useState( { ...initialData } )
	const [ formState, setFormState ] = React.useState( 0 );
	const [ hasError, setError ] = React.useState( false );
	const dispatch = useDispatch();
	const institutions = useSelector(getInstitutions)
	const people = useSelector(getPeople)

	const handleChange = ( name, value ) => {
		setBillData( { ...billData, [ name ] : value } )
		setError( false )
	}

	const close = () => dispatch( setModal( 'info-bill' ) )

	const editRequest = () => {
		setFormState( 1 )
		patchBill( billData )
			.then( () => {
				setFormState( 2 )
				dispatch( refreshBills )
				dispatch( refreshOptions )
				setTimeout( close, 1000 )
			} )
			.catch( () => {
				setFormState( 3 )
				setTimeout( () => setFormState(0), 1000 )
				setError( true )
			} )
	}

	return (
		<ModalTemplate
			title={ 'Editar factura' }
			formState={formState}
			processText={'Editando'}
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
					onClick={ editRequest }
					icon={ faPen }
					label={ 'Editar' }
					color={ 'green' }
				/>
			</DualInput>
		</ModalTemplate>
	);
}

