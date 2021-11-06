import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ModalTemplate } from '../ModalTemplate';
import { DualInput } from '../../Input';
import { Button } from '../../Buttons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { setModal } from '../../../services/uiSlice';
import { RequestingContents } from '../../RequestingContents';
import { SuccessContents } from '../../SuccessContents';
import { getSelectedMonthly, refreshMonthlies } from '../../../services/billSlice';
import { deleteMonthly } from '../../../services/api';
import { formatDate } from '../../../services/utils';

export default function DeleteMonthlyModal() {
	const monthlyData = useSelector( getSelectedMonthly )
	const dispatch = useDispatch()
	const [ formState, setFormState ] = React.useState( 0 );

	const close = () => dispatch( setModal( '' ) )
	const back = () => dispatch( setModal( 'task-info' ) )

	const deleteRequest = () => {
		setFormState( 1 )
		deleteMonthly( monthlyData._id )
			.then( () => {
				setFormState( 2 )
				dispatch( refreshMonthlies )
				setTimeout( close, 2000 )
			} )
			.catch( () => {
				setFormState( 0 )
			} )
	}

	if ( formState === 1 ) {
		return <ModalTemplate>
			<RequestingContents text={ 'Borrando...' }/>
		</ModalTemplate>
	}

	if ( formState === 2 ) {
		return <ModalTemplate>
			<SuccessContents/>
		</ModalTemplate>
	}

	return (
		<ModalTemplate
			title={ 'Borrar mensual' }
		>
			<div></div>

			<div className={ 'monthly-value' } style={ { textAlign : 'center' } }>
				{ `¿ Seguro desea borrar mensual "${ formatDate(monthlyData.due_date) }" ?` }
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

