import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ModalTemplate } from '../ModalTemplate';
import { faDollarSign, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { setModal } from '../../../services/uiSlice';
import { Button } from '../../Buttons';
import { formatDate, formatPrice } from '../../../services/utils';
import { DoneBadge } from '../../Items/Badge';
import { getSelectedMonthly } from '../../../services/monthlySlice';

export default function InfoMonthlyModal() {
	const dispatch = useDispatch();
	const monthlyData = useSelector( getSelectedMonthly )

	const onEdit = () => dispatch( setModal( 'edit-monthly' ) )
	const onDelete = () => dispatch( setModal( 'delete-monthly' ) )
	const onPay = () => dispatch( setModal( 'pay-monthly' ) )
	const onClose = () => dispatch( setModal( '' ) )

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

			<div className={ 'monthly-info' }>
				<div className={ 'monthly-info__label' }>
					Valor a pagar:
				</div>
				<div className={ 'monthly-info__value' }>
					{ monthlyData.amount_due }
				</div>
			</div>

			<div className={ 'monthly-info' }>
				<div className={ 'monthly-info__label' }>
					Pague antes de:
				</div>
				<div className={ 'monthly-info__value' }>
					{ formatDate( monthlyData.exp_date ) }
				</div>
			</div>

			{
				monthlyData.status === 'PAID'?
					<>
						<hr style={{width: '80%'}}/>
						<div className={ 'monthly-info' }>
							<div className={ 'monthly-info__label' }>
								Valor pagado:
							</div>
							<div className={ 'monthly-info__value' }>
								{ formatPrice( monthlyData.amount_paid ) }
							</div>
						</div>

						<div className={ 'monthly-info' }>
							<div className={ 'monthly-info__label' }>
								Fecha de pago:
							</div>
							<div className={ 'monthly-info__value' }>
								{ formatDate( monthlyData.paid_date ) }
							</div>
						</div>
						<hr style={{width: '80%'}}/>
						<DoneBadge
							onClick={onClose}
						/>
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
