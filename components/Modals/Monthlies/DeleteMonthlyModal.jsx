import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ModalTemplate } from '../ModalTemplate';
import { DualInput } from '../../Input';
import { Button } from '../../Buttons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { setModal } from '../../../services/uiSlice';
import { RequestingContents } from '../../RequestingContents';
import { SuccessContents } from '../../SuccessContents';
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
				setFormState( 0 )
			} )
	}

	if ( formState === 1 ) {
		return <ModalTemplate doCloseButton={false}>
			<RequestingContents text={ 'Borrando...' }/>
		</ModalTemplate>
	}

	if ( formState === 2 ) {
		return <ModalTemplate doCloseButton={false}>
			<SuccessContents/>
		</ModalTemplate>
	}

	return (
		<ModalTemplate
			title={ 'Borrar mensual' }
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

