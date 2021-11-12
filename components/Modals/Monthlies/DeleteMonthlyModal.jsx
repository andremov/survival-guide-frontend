import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ModalTemplate } from '../ModalTemplate';
import { DualInput } from '../../Input';
import { Button } from '../../Buttons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { setModal } from '../../../services/uiSlice';
import { deleteMonthly } from '../../../services/api';
import { formatDate } from '../../../services/utils';
import { getSelectedMonthly, refreshMonthlies } from '../../../services/monthlySlice';

export default function DeleteMonthlyModal() {
	const monthlyData = useSelector( getSelectedMonthly )
	const dispatch = useDispatch()
	const [ formState, setFormState ] = React.useState( 0 );

	const close = () => dispatch( setModal( '' ) )
	const back = () => dispatch( setModal( 'info-monthly' ) )

	const deleteRequest = () => {
		setFormState( 1 )
		deleteMonthly( monthlyData._id )
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
			title={ 'Borrar mensual' }
			formState={formState}
			processText={'Borrando'}
		>
			<div></div>

			<div className={ 'monthly-info' } style={ { textAlign : 'center' } }>
				{ `¿ Seguro desea borrar mensual [${ formatDate(monthlyData.exp_date) }] ?` }
			</div>

			<DualInput>
				<Button
					onClick={ back }
					label={ 'Cancelar' }
					color={ 'gray' }
				/>
				<Button
					onClick={ deleteRequest }
					icon={ faTrash }
					label={ 'Borrar' }
					color={ 'red' }
				/>
			</DualInput>
		</ModalTemplate>
	);
}

