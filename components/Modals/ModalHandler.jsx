import React from 'react';
import { useSelector } from 'react-redux';
import { getModal } from '../../services/uiSlice';
import { DeleteTaskModal, EditTaskModal, CreateTaskModal, InfoTaskModal } from './Tasks';
import { CreateBillModal, EditBillModal, DeleteBillModal, InfoBillModal, FilterBillModal } from './Bills';
import { DeleteMonthlyModal, EditMonthlyModal, InfoMonthlyModal, CreateMonthlyModal, PayMonthlyModal } from './Monthlies';

export function ModalHandler() {
  const curModal = useSelector(getModal)

	switch(curModal) {
		case 'create-task':
			return <CreateTaskModal />
		case 'edit-task':
			return <EditTaskModal />
		case 'delete-task':
			return <DeleteTaskModal />
		case 'info-task':
			return <InfoTaskModal />

		case 'create-bill':
			return <CreateBillModal />
		case 'edit-bill':
			return <EditBillModal />
		case 'delete-bill':
			return <DeleteBillModal />
		case 'info-bill':
			return <InfoBillModal />
		case 'filter-bill':
			return <FilterBillModal />

		case 'create-monthly':
			return <CreateMonthlyModal />
		case 'edit-monthly':
			return <EditMonthlyModal />
		case 'delete-monthly':
			return <DeleteMonthlyModal />
		case 'info-monthly':
			return <InfoMonthlyModal />
		case 'pay-monthly':
			return <PayMonthlyModal />

		default:
			return <></>
	}
}

