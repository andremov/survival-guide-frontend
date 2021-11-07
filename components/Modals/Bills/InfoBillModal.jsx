import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ModalTemplate } from '../ModalTemplate';
import { faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { setModal } from '../../../services/uiSlice';
import { Monthly, MonthlyBlank, MonthlyMock } from '../../Items/Monthly';
import { Button } from '../../Buttons';
import { getSurroundingMonths } from '../../../services/utils';
import { LineChart } from '../../LineChart';
import { getMonthlies, isMonthlyPrefetching } from '../../../services/monthlySlice';
import { getSelectedBill } from '../../../services/billSlice';

export default function InfoBillModal() {
	const dispatch = useDispatch();
	const billData = useSelector( getSelectedBill )
	const monthlies = useSelector( getMonthlies )
		.filter( item => item.parent === billData._id )
	const monthlyPrefetching = useSelector( isMonthlyPrefetching )

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

			<LineChart
				monthlies={ monthlies }
			/>

			{
				monthlyPrefetching ?
					<div className={ 'bill-value' }>
						{ [ ...new Array( 3 ).keys() ].map( ( item, i ) => <MonthlyMock key={ i }/> ) }
					</div> :
					<div className={ 'bill-value' }>
						{
							getSurroundingMonths( monthlies )
								.map(
									( item, i ) => item.exists ?
										<Monthly key={ i } monthlyData={ item }/> :
										<MonthlyBlank parent={ billData._id } month={ item.month } key={ i }/>
								)
						}
					</div>
			}

			<Button
				color={ 'green' }
				onClick={ onAdd }
				label={ 'Agregar Mensual' }
				icon={ faPlus }
			/>
		</ModalTemplate>
	);
}
