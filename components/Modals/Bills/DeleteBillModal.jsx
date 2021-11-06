import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ModalTemplate } from '../ModalTemplate';
import { DualInput } from '../../Input';
import { Button } from '../../Buttons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { setModal } from '../../../services/uiSlice';
import { deleteBill } from '../../../services/api';
import { RequestingContents } from '../../RequestingContents';
import { SuccessContents } from '../../SuccessContents';
import { getSelectedBill, refreshBills } from '../../../services/billSlice';

export default function DeleteBillModal() {
	const billData = useSelector( getSelectedBill )
	const dispatch = useDispatch()
	const [ formState, setFormState ] = React.useState( 0 );

	const close = () => dispatch( setModal( '' ) )
	const back = () => dispatch( setModal( 'task-info' ) )

	const deleteRequest = () => {
		setFormState( 1 )
		deleteBill( billData._id )
			.then( () => {
				setFormState( 2 )
				dispatch( refreshBills )
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
			title={ 'Borrar factura' }
		>
			<div></div>

			<div className={ 'bill-value' } style={ { textAlign : 'center' } }>
				{ `¿ Seguro desea borrar factura "${ billData.name }" ?` }
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
