import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ModalTemplate } from '../ModalTemplate';
import { Button } from '../../Buttons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { setModal } from '../../../services/uiSlice';
import { deleteBill } from '../../../services/api';
import { getSelectedBill, refreshBills } from '../../../services/billSlice';
import { DualInput } from '../../Input';
import { isOnline } from '../../../services/apiLoadSlice';

export default function DeleteBillModal() {
	const [ formState, setFormState ] = React.useState( 0 );
	const billData = useSelector( getSelectedBill )
	const dispatch = useDispatch()
	const onlineState = useSelector(isOnline)

	const close = () => dispatch( setModal( '' ) )
	const back = () => dispatch( setModal( 'info-bill' ) )

	const deleteRequest = () => {
		setFormState( 1 )
		deleteBill( billData._id )
			.then( () => {
				setFormState( 2 )
				dispatch( refreshBills )
				setTimeout( close, 1000 )
			} )
			.catch( () => {
				setFormState( 3 )
				setTimeout( () => setFormState(0), 1000 )
			} )
	}

	return (
		<ModalTemplate
			title={ 'Borrar factura' }
			formState={formState}
			processText={'Borrando'}
		>
			<div></div>

			<div className={ 'bill-info' } style={ { textAlign : 'center' } }>
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
					disabled={onlineState}
				/>
			</DualInput>
		</ModalTemplate>
	);
}

