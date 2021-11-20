import React from 'react';
import { ModalTemplate } from '../ModalTemplate';
import { DualInput, Input } from '../../Input';
import { Button } from '../../Buttons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { createMonthly } from '../../../services/api';
import { useDispatch, useSelector } from 'react-redux';
import { setModal } from '../../../services/uiSlice';
import { getSelectedBill } from '../../../services/billSlice';
import { getMonthlies, refreshMonthlies } from '../../../services/monthlySlice';
import { formatDate, formatDateValue, formatPrice } from '../../../services/utils';
import { isOnline } from '../../../services/apiLoadSlice';

export default function CreateMonthlyModal() {
	const parent = useSelector(getSelectedBill)._id
	const prevMonthly = useSelector( getMonthlies ).filter( item => item.parent === parent ).slice(-1)[0]
	const [ monthlyData, setMonthlyData ] = React.useState( {
		parent, status: 'PENDING',
		exp_date: formatDateValue(
			{ date: prevMonthly?.exp_date, monthsToAdd: 1}
		)
	} )
	const [ formState, setFormState ] = React.useState( 0 );
	const dispatch = useDispatch();
	const onlineState = useSelector(isOnline)

	const handleChange = ( name, value ) => {
		setMonthlyData( { ...monthlyData, [ name ] : value } )
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
			} )
	}

	return (
		<ModalTemplate
			title={ 'Nuevo Mensual' }
			formState={formState}
			processText={'Creando'}
		>
			{ prevMonthly && <div style={{backgroundColor: '#ccc', width: '100%', padding: '0 0.5rem', borderRadius: '10px'}}>
				<div className={ 'monthly-info' }>
					<div className={ 'monthly-info__label' }>
						Valor previo:
					</div>
					<div className={ 'monthly-info__value' }>
						{ formatPrice( prevMonthly.amount_due ) }
					</div>
				</div>

				<div className={ 'monthly-info' }>
					<div className={ 'monthly-info__label' }>
						Fecha previa:
					</div>
					<div className={ 'monthly-info__value' }>
						{ formatDate( prevMonthly.exp_date ) }
					</div>
				</div>
			</div>
			}
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
					disabled={!onlineState}
				/>
			</DualInput>
		</ModalTemplate>
	);
}

