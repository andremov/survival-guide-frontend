import React from 'react';
import { TaskList } from '../components/TaskList';
import { faPlus, faRetweet } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { refreshTasks } from '../services/taskSlice';
import { setModal } from '../services/uiSlice';
import { CardTemplate } from '../components/CardTemplate';
import { BillList } from '../components/BillList';
import { refreshBills } from '../services/billSlice';

export default function Home() {
	const dispatch = useDispatch()

	const onRefreshTasks = () => dispatch( refreshTasks )
	const onNewTask = () => dispatch( setModal( 'new-task' ) )

	const onRefreshBills = () => dispatch( refreshBills )
	const onNewBill = () => dispatch( setModal( 'new-bill' ) )

	return (
		<>
			<main>
				<CardTemplate
					title={ 'Lista de Tareas' }
					buttons={ [
						{
							className : 'icon-button',
							color : 'blue',
							icon : faRetweet,
							onClick : onRefreshTasks,
						}, {
							className : 'icon-button',
							color : 'green',
							icon : faPlus,
							onClick : onNewTask,
						}
					] }
				>
					<TaskList/>
				</CardTemplate>

				<CardTemplate
					title={ 'Lista de Facturas' }
					buttons={ [
						{
							className : 'icon-button',
							color : 'blue',
							icon : faRetweet,
							onClick : onRefreshBills,
						}, {
							className : 'icon-button',
							color : 'green',
							icon : faPlus,
							onClick : onNewBill,
						}
					] }
				>
					<BillList/>
				</CardTemplate>
			</main>
		</>
	)
}
