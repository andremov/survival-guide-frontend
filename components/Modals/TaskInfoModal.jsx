import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSelectedTask } from '../../services/taskSlice';
import { ModalTemplate } from './ModalTemplate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPen, faQuestion, faTrash } from '@fortawesome/free-solid-svg-icons';
import { setModal } from '../../services/uiSlice';

export function TaskInfoModal() {
	const taskData = useSelector( getSelectedTask )
	const dispatch = useDispatch();
	const onEdit = () => dispatch( setModal( 'edit-task' ) )
	const onDelete = () => dispatch( setModal( 'delete-task' ) )

	return (
		<ModalTemplate title={ taskData.name } doCloseButton={ true } buttons={[
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
		]}>
			<div className={'task-value'}>
				{ taskData.information ? taskData.information : 'No hay información.' }
			</div>

			<div className={'task-value'}>
				{ taskData.due_date ? `Fecha de plazo: ${(new Date(taskData.due_date)).toLocaleDateString('es')}` : 'No hay fecha de plazo establecida.'}
			</div>

			<div>
				{ taskData.status === 'DONE'? <DoneBadge /> : <PendingBadge/> }
			</div>
		</ModalTemplate>
	);
}

const Badge = ({children, color}) => <div
	className={`badge color-${color}`}
	style={{
		position: 'absolute',
		bottom: '20px',
		left: '50%',
		transform: 'translateX(-50%)'
	}}
>
	{children}
</div>

const DoneBadge = () => <Badge color={ 'green' }>
	<FontAwesomeIcon icon={ faCheck }/>
	<div className={'badge-label'}>
		Hecho
	</div>
</Badge>


const PendingBadge = () => <Badge color={ 'yellow' }>
	<FontAwesomeIcon icon={ faQuestion }/>
	<div className={'badge-label'}>
		Pendiente
	</div>
</Badge>

