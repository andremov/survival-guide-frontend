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
import { getSelectedMonthly, refreshMonthlies } from '../../../services/billSlice';

export default function PayMonthlyModal() {
	const initialData = useSelector( getSelectedMonthly )
	const [ monthlyData, setMonthlyData ] = React.useState( { ...initialData, paid_date: Date.now(), status: 'PAID' } )
	const [ formState, setFormState ] = React.useState( 0 );
	const [ hasError, setError ] = React.useState( false );
	const dispatch = useDispatch();

	const handleChange = ( name, value ) => {
		setMonthlyData( { monthlyDatataskData, [ name ] : value } )
		setError( false )
	}

	const close = () => dispatch( setModal( 'info-monthly' ) )

	const editRequest = () => {
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
			<RequestingContents text={ 'Pagando...' }/>
		</ModalTemplate>
	}

	if ( formState === 2 ) {
		return <ModalTemplate>
			<SuccessContents/>
		</ModalTemplate>
	}

	return (
		<ModalTemplate
			title={ 'Editar mensual' }
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
					label={ 'Editar' }
					color={ 'green' }
				/>
			</DualInput>
		</ModalTemplate>
	);
}

