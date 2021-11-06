import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ModalTemplate } from '../ModalTemplate';
import { faDollarSign, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { setModal } from '../../../services/uiSlice';
import { getSelectedMonthly } from '../../../services/billSlice';
import { Button } from '../../Buttons';
import { formatDate, formatPrice } from '../../../services/utils';
import { DoneBadge } from '../../Items/Badge';

export default function InfoMonthlyModal() {
	const dispatch = useDispatch();
	const monthlyData = useSelector( getSelectedMonthly )

	const onEdit = () => dispatch( setModal( 'edit-monthly' ) )
	const onDelete = () => dispatch( setModal( 'delete-monthly' ) )
	const onPay = () => dispatch( setModal( 'pay-monthly' ) )

	return (
		<ModalTemplate title={ `Mensual [${formatDate(monthlyData.exp_date)}]` } doCloseButton={ true } buttons={ [
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

			<div className={ 'monthly-value' }>
				{ `Valor a pagar: ${formatPrice(monthlyData.amount_due)}` }
			</div>

			<div className={ 'monthly-value' }>
				{ `Pague antes de: ${formatDate( monthlyData.exp_date )}` }
			</div>

			{
				monthlyData.status === 'PAID'?
					<>
						<hr style={{width: '80%'}}/>
						<div className={ 'monthly-value' }>
							{ `Valor pagado: ${formatPrice(monthlyData.amount_paid)}` }
						</div>

						<div className={ 'monthly-value' }>
							{ `Pagado: ${formatDate( monthlyData.paid_date )}` }
						</div>
						<hr style={{width: '80%'}}/>
						<DoneBadge/>
					</> :
					<Button
						color={'blue'}
						onClick={onPay}
						label={'Marcar Pagado'}
						icon={faDollarSign}
					/>
			}
		</ModalTemplate>
	);
}
