import React from 'react';
import { useSelector } from 'react-redux';
import { getSelectedTask } from '../../services/taskSlice';
import { ModalTemplate } from './ModalTemplate';

export function TaskInfoModal() {
	const taskData = useSelector(getSelectedTask)

	return (
		<ModalTemplate title={taskData.name} doCloseButton={true}>
			<div>
				{taskData.information}
			</div>
			<div>
				{taskData.dueDate}
			</div>
		</ModalTemplate>
	);
}

