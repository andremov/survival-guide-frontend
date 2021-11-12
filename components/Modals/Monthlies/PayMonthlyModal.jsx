import React from 'react';
import { ModalTemplate } from '../ModalTemplate';
import { DualInput, Input } from '../../Input';
import { Button } from '../../Buttons';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { setModal } from '../../../services/uiSlice';
import { patchMonthly } from '../../../services/api';
import { getSelectedMonthly, refreshMonthlies } from '../../../services/monthlySlice';

export default function PayMonthlyModal() {
	const initialData = useSelector( getSelectedMonthly )
	const [ monthlyData, setMonthlyData ] = React.useState( { ...initialData, paid_date: Date.now(), status: 'PAID', amount_paid:'' } )
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
				setFormState( 3 )
				setTimeout( () => setFormState(0), 1000 )
				setError( true )
			} )
	}

	return (
		<ModalTemplate
			title={ 'Editar mensual' }
			formState={formState}
			processText={'Pagando'}
		>
			<Input
				value={ monthlyData.amount_paid }
				name={ 'amount_paid' }
				placeholder={ 'Valor pagado' }
				onChange={ handleChange }
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
					label={ 'Pagar' }
					color={ 'green' }
				/>
			</DualInput>
		</ModalTemplate>
	);
}

