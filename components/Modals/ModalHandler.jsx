import React from 'react';
import { useSelector } from 'react-redux';
import { getModal } from '../../services/uiSlice';
import { NewTaskModal } from './NewTaskModal';
import { TaskInfoModal } from './TaskInfoModal';

export function ModalHandler() {
  const curModal = useSelector(getModal)

	switch(curModal) {
		case 'new-task':
			return <NewTaskModal />
		case 'task-info':
			return <TaskInfoModal />
		default:
			return <></>
	}
}

