import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ModalTemplate } from '../ModalTemplate';
import { faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { getMonthID, setModal } from '../../../services/uiSlice';
import { Monthly, MonthlyBlank, MonthlyMock } from '../../Items/Monthly';
import { Button } from '../../Buttons';
import { getSurroundingMonths } from '../../../services/utils';
import { LineChart } from '../../LineChart';
import { getMonthlies, isMonthlyPrefetching } from '../../../services/monthlySlice';
import { getSelectedBill } from '../../../services/billSlice';

export default function InfoBillModal() {
	const dispatch = useDispatch();
	const billData = useSelector( getSelectedBill )
	const monthlies = useSelector( getMonthlies ).filter( item => item.parent === billData._id )
	const monthlyPrefetching = useSelector( isMonthlyPrefetching )
	const curMonth = useSelector(getMonthID)

	const onEdit = () => dispatch( setModal( 'edit-bill' ) )
	const onDelete = () => dispatch( setModal( 'delete-bill' ) )
	const onAdd = () => dispatch( setModal( 'create-monthly' ) )

	return (
		<ModalTemplate title={ billData.name } buttons={ [
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

			<div className={ 'bill-info' }>
				<div className={ 'bill-info__label' }>
					A nombre de:
				</div>
				<div className={ 'bill-info__value' }>
					{ billData.person_name }
				</div>
			</div>

			<div className={ 'bill-info' }>
				<div className={ 'bill-info__label' }>
					Pagar a:
				</div>
				<div className={ 'bill-info__value' }>
					{ billData.institution }
				</div>
			</div>

			<div className={ 'bill-info' }>
				{ billData.information ? billData.information : 'No hay información adicional.' }
			</div>

			<LineChart
				monthlies={ monthlies }
			/>

			{
				monthlyPrefetching ?
					<div className={ 'bill-info' }>
						{ [ ...new Array( 3 ).keys() ].map( ( item, i ) => <MonthlyMock key={ i }/> ) }
					</div> :
					<div className={ 'bill-info' }>
						{
							getSurroundingMonths( monthlies, curMonth )
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
