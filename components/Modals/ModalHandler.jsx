import React from 'react';
import { useSelector } from 'react-redux';
import { getModal } from '../../services/uiSlice';
import { NewTaskModal } from './Tasks/NewTaskModal';
import { TaskInfoModal } from './Tasks/TaskInfoModal';
import { EditTaskModal } from './Tasks/EditTaskModal';
import { DeleteTaskModal } from './Tasks/DeleteTaskModal';

export function ModalHandler() {
  const curModal = useSelector(getModal)

	switch(curModal) {
		case 'new-task':
			return <NewTaskModal />
		case 'edit-task':
			return <EditTaskModal />
		case 'delete-task':
			return <DeleteTaskModal />
		case 'task-info':
			return <TaskInfoModal />
		default:
			return <></>
	}
}

