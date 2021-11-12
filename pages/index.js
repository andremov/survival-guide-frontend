import React from 'react';
import { TaskList } from '../components/TaskList';
import { faFilter, faPlus, faSync } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { refreshTasks } from '../services/taskSlice';
import { setModal } from '../services/uiSlice';
import { CardTemplate } from '../components/CardTemplate';
import { BillList } from '../components/BillList';
import { clearFilters, refreshBills } from '../services/billSlice';
import { TotalStatus } from '../components/TotalStatus';
import { LineChart } from '../components/LineChart';
import { refreshMonthlies } from '../services/monthlySlice';
import { FilterBreadcrumbs } from '../components/FilterBreadcrumbs';
import { SortHandler } from '../components/SortHandler';

export default function Home() {
	const dispatch = useDispatch()

	const onRefreshTasks = () => dispatch( refreshTasks )
	const onNewTask = () => dispatch( setModal( 'create-task' ) )

	const onRefreshBills = () => {
		dispatch( refreshBills )
		dispatch( refreshMonthlies )
	}
	const onNewBill = () => dispatch( setModal( 'create-bill' ) )
	const onFilter = () => dispatch( setModal( 'filter-bill' ) )

	return (
		<>
			<main>

				<div className={ 'left-panel' }>
					<TotalStatus/>

					<CardTemplate className={ 'chart' }>
						<LineChart/>
					</CardTemplate>

					<CardTemplate
						title={ 'Lista de Tareas' }
						buttons={ [
							{
								className : 'icon-button',
								color : 'blue',
								icon : faSync,
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
				</div>

				<CardTemplate
					title={ 'Lista de Facturas' }
					buttons={ [
						{
							className : 'icon-button',
							color : 'gray',
							icon : faFilter,
							onClick : onFilter,
						}, {
							className : 'icon-button',
							color : 'blue',
							icon : faSync,
							onClick : onRefreshBills,
						}, {
							className : 'icon-button',
							color : 'green',
							icon : faPlus,
							onClick : onNewBill,
						}
					] }
				>
					<SortHandler/>
					<FilterBreadcrumbs/>
					<BillList/>
				</CardTemplate>
			</main>
		</>
	)
}
