import React from 'react';
import { ModalTemplate } from '../ModalTemplate';
import { DualInput, Input } from '../../Input';
import { Button } from '../../Buttons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { createMonthly } from '../../../services/api';
import { useDispatch, useSelector } from 'react-redux';
import { setModal } from '../../../services/uiSlice';
import { getSelectedBill } from '../../../services/billSlice';
import { refreshMonthlies } from '../../../services/monthlySlice';

export default function CreateMonthlyModal() {
	const parent = useSelector(getSelectedBill)._id
	const [ monthlyData, setMonthlyData ] = React.useState( {parent, status: 'PENDING'} )
	const [ formState, setFormState ] = React.useState( 0 );
	const [ hasError, setError ] = React.useState( false );
	const dispatch = useDispatch();

	const handleChange = ( name, value ) => {
		setMonthlyData( { ...monthlyData, [ name ] : value } )
		setError( false )
	}

	const close = () => dispatch( setModal( '' ) )

	const createRequest = () => {
		setFormState( 1 )
		createMonthly( monthlyData )
			.then( () => {
				setFormState( 2 )
				dispatch( refreshMonthlies )
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
			title={ 'Nuevo Mensual' }
			formState={formState}
			processText={'Creando'}
		>
			<Input
				value={ monthlyData.amount_due }
				name={ 'amount_due' }
				placeholder={ 'Valor a pagar' }
				onChange={ handleChange }
			/>
			<Input
				value={ monthlyData.exp_date }
				name={ 'exp_date' }
				placeholder={ 'Plazo' }
				onChange={ handleChange }
				type={'date'}
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

