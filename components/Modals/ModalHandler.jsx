import React from 'react';
import { useSelector } from 'react-redux';
import { getModal } from '../../services/uiSlice';
import { DeleteTaskModal, EditTaskModal, NewTaskModal, TaskInfoModal } from './Tasks';
import { NewBillModal, EditBillModal, DeleteBillModal, BillInfoModal } from './Bills';
import { DeleteMonthlyModal, EditMonthlyModal, MonthlyInfoModal, NewMonthlyModal } from './Monthlies';

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

		case 'new-bill':
			return <NewBillModal />
		case 'edit-bill':
			return <EditBillModal />
		case 'delete-bill':
			return <DeleteBillModal />
		case 'bill-info':
			return <BillInfoModal />

		case 'new-monthly':
			return <NewMonthlyModal />
		case 'edit-monthly':
			return <EditMonthlyModal />
		case 'delete-monthly':
			return <DeleteMonthlyModal />
		case 'monthly-info':
			return <MonthlyInfoModal />

		default:
			return <></>
	}
}

