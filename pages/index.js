import React from 'react';
import { TaskList } from '../components/TaskList';
import { faFilter, faPlus, faSync } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { isTaskLoading, refreshTasks } from '../services/taskSlice';
import { setModal } from '../services/uiSlice';
import { CardTemplate } from '../components/CardTemplate';
import { BillList } from '../components/BillList';
import { isBillLoading, refreshBills } from '../services/billSlice';
import { TotalStatus } from '../components/TotalStatus';
import { LineChart } from '../components/LineChart';
import { isMonthlyLoading, refreshMonthlies } from '../services/monthlySlice';
import { FilterBreadcrumbs } from '../components/FilterBreadcrumbs';
import { SortHandler } from '../components/SortHandler';
import { isOptionPrefetching } from '../services/optionSlice';
import { isOnline } from '../services/apiLoadSlice';

export default function Home() {
	const dispatch = useDispatch()
	const filtersLoading = useSelector( isOptionPrefetching )
	const billsLoading = useSelector(isBillLoading)
	const monthlyLoading = useSelector(isMonthlyLoading)
	const taskLoading = useSelector(isTaskLoading)
	const onlineState = useSelector(isOnline)

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
								disabled: taskLoading || !onlineState
							}, {
								className : 'icon-button',
								color : 'green',
								icon : faPlus,
								onClick : onNewTask,
								disabled: !onlineState
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
							disabled: filtersLoading
						}, {
							className : 'icon-button',
							color : 'blue',
							icon : faSync,
							onClick : onRefreshBills,
							disabled: billsLoading || monthlyLoading || !onlineState
						}, {
							className : 'icon-button',
							color : 'green',
							icon : faPlus,
							onClick : onNewBill,
							disabled : !onlineState
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
