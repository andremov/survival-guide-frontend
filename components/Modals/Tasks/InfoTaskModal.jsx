import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSelectedTask } from '../../../services/taskSlice';
import { ModalTemplate } from '../ModalTemplate';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { setModal } from '../../../services/uiSlice';
import { formatDate, formatPrice } from '../../../services/utils';
import { DoneBadge, PendingBadge } from '../../Items/Badge';
import { isOnline } from '../../../services/apiLoadSlice';

export default function InfoTaskModal() {
	const taskData = useSelector( getSelectedTask )
	const dispatch = useDispatch();
	const onlineState = useSelector(isOnline)

	const onEdit = () => dispatch( setModal( 'edit-task' ) )
	const onDelete = () => dispatch( setModal( 'delete-task' ) )

	return (
		<ModalTemplate title={ taskData.name } buttons={ [
			{
				onClick : onEdit,
				className : 'icon-button',
				color : 'yellow',
				icon : faPen,
				disabled: !onlineState
			},
			{
				onClick : onDelete,
				className : 'icon-button',
				color : 'red',
				icon : faTrash,
				disabled: !onlineState
			}
		] }>
			<div></div>

			<div className={ 'task-info' }>
				{ taskData.information ? taskData.information : 'No hay información adicional.' }
			</div>

			{ taskData.done_date &&
			<div className={ 'task-info' }>
				<div className={ 'task-info__label' }>
					Fecha de entrega:
				</div>
				<div className={ 'task-info__value' }>
					{ formatDate( taskData.done_date ) }
				</div>
			</div>
			}

			<div className={ 'task-info' }>
				{ taskData.due_date ? <>
					<div className={ 'task-info__label' }>
						Fecha de plazo:
					</div>
					<div className={ 'task-info__value' }>
						{ formatDate( taskData.due_date ) }
					</div>
				</> : 'No hay fecha de plazo establecida.'
				}
			</div>

			<div>
				{ taskData.status === 'DONE' ? <DoneBadge/> : <PendingBadge/> }
			</div>
		</ModalTemplate>
	);
}
