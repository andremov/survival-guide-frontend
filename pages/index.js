import React from 'react';
import { TaskList } from '../components/TaskList';
import { Button } from '../components/Buttons';
import { faPlus, faRetweet } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { refreshTasks } from '../services/taskSlice';
import { setModal } from '../services/uiSlice';
import { CardTemplate } from '../components/CardTemplate';

export default function Home() {
	const dispatch = useDispatch()

	const onNewTask = () => dispatch( refreshTasks )
	const onRefreshTasks = () => dispatch( setModal( 'new-task' ) )

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
							onClick : onNewTask,
						}, {
							className : 'icon-button',
							color : 'green',
							icon : faPlus,
							onClick : onRefreshTasks,
						}
					] }
				>
					<TaskList/>
				</CardTemplate>
			</main>
		</>
	)
}
