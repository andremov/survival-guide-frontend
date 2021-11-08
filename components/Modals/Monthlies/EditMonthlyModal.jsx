import React from 'react';
import { ModalTemplate } from '../ModalTemplate';
import { DualInput, Input } from '../../Input';
import { Button } from '../../Buttons';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { SuccessContents } from '../../SuccessContents';
import { RequestingContents } from '../../RequestingContents';
import { useDispatch, useSelector } from 'react-redux';
import { setModal } from '../../../services/uiSlice';
import { patchMonthly } from '../../../services/api';
import { formatDateValue } from '../../../services/utils';
import { getSelectedMonthly, refreshMonthlies } from '../../../services/monthlySlice';

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

	const close = () => dispatch( setModal( 'info-monthly' ) )

	const editRequest = () => {
		setFormState( 1 )
		patchMonthly( monthlyData )
			.then( () => {
				setFormState( 2 )
				dispatch( refreshMonthlies )
				setTimeout( close, 1000 )
			} )
			.catch( () => {
				setFormState( 0 )
				setError( true )
			} )
	}

	if ( formState === 1 ) {
		return <ModalTemplate doCloseButton={false}>
			<RequestingContents text={ 'Editando...' }/>
		</ModalTemplate>
	}

	if ( formState === 2 ) {
		return <ModalTemplate doCloseButton={false}>
			<SuccessContents/>
		</ModalTemplate>
	}

	return (
		<ModalTemplate
			title={ 'Editar mensual' }
		>
			<Input
				value={ monthlyData.amount_due }
				name={ 'amount_due' }
				placeholder={ 'Valor a pagar' }
				onChange={ handleChange }
			/>
			<Input
				value={ formatDateValue(monthlyData.exp_date) }
				name={ 'exp_date' }
				placeholder={ 'Plazo' }
				onChange={ handleChange }
				type={'date'}
			/>
			{
				monthlyData.status === 'PAID' ?
					<>
					<Input
						value={ monthlyData.amount_paid }
						name={ 'amount_paid' }
						placeholder={ 'Valor pagado' }
						onChange={ handleChange }
					/>
					<Input
						value={ formatDateValue(monthlyData.paid_date) }
						name={ 'paid_date' }
						placeholder={ 'Fecha de pago' }
						onChange={ handleChange }
						type={'date'}
					/>
					</>
				: <></>
			}
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

