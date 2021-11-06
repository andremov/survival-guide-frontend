import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ModalTemplate } from '../ModalTemplate';
import { faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { setModal } from '../../../services/uiSlice';
import { getMonthlies, getSelectedBill, isMonthlyPrefetching } from '../../../services/billSlice';
import { Monthly, MonthlyBlank, MonthlyMock } from '../../Items/Monthly';
import { Button } from '../../Buttons';

export default function InfoBillModal() {
	const dispatch = useDispatch();
	const billData = useSelector( getSelectedBill )
	const monthlies = useSelector( getMonthlies )
	const monthlyPrefetching = useSelector(isMonthlyPrefetching)

	const onEdit = () => dispatch( setModal( 'edit-bill' ) )
	const onDelete = () => dispatch( setModal( 'delete-bill' ) )
	const onAdd = () => dispatch( setModal( 'create-monthly' ) )

	return (
		<ModalTemplate title={ billData.name } doCloseButton={ true } buttons={ [
			{
				onClick : onEdit,
				className : 'icon-button',
				color : 'yellow',
				icon : faPen,
			},
			{
				onClick : onDelete,
				className : 'icon-button',
				color : 'red',
				icon : faTrash,
			}
		] }>

			<div></div>

			<div className={ 'bill-value' }>
				{ `A nombre de: ${ billData.person_name }` }
			</div>

			<div className={ 'bill-value' }>
				{ `Pagar a: ${ billData.institution }` }
			</div>

			<div className={ 'bill-value' }>
				{ billData.information ? billData.information : 'No hay información adicional.' }
			</div>
			{
				monthlyPrefetching ?
					<div className={ 'bill-value' }>
						{ [ ...new Array( 3 ).keys() ].map( ( item, i ) => <MonthlyMock key={ i }/> ) }
					</div>:
			<div className={ 'bill-value' }>
				{
					monthlies.filter( item => item.parent === billData._id )
						.map( ( item, i ) => <Monthly key={ i } monthlyData={item}/> )
				}
				{ [ ...new Array( 3-monthlies.length ).keys() ].map( ( item, i ) => <MonthlyBlank key={ i }/> ) }
			</div>
			}

			<Button
				color={'green'}
				onClick={onAdd}
				label={'Agregar Mensual'}
				icon={faPlus}
			/>
		</ModalTemplate>
	);
}
