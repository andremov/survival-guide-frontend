import React from 'react';
import { TaskList } from '../components/TaskList';
import { Button } from '../components/Buttons';
import { faPlus, faRetweet } from '@fortawesome/free-solid-svg-icons';
import { NewTaskModal } from '../components/Modals/NewTaskModal';
import { useDispatch } from 'react-redux';
import { refreshTasks } from '../services/taskSlice';

export default function Home() {
	const [ taskModalActive, setTaskModalActive ] = React.useState( false )
	const dispatch = useDispatch()

	const toggleTaskModal = () => setTaskModalActive( !taskModalActive )

	return (
		<>
			{ taskModalActive && <NewTaskModal closeCallback={ toggleTaskModal }/> }

			<main>
				<div className={ 'card' }>
					<div className={ 'card-header' }>
						<h2>
							Lista de Tareas
						</h2>
						<div className={ 'header-buttons' }>
							<Button
								className={ 'icon-button' }
								color={ 'blue' }
								icon={ faRetweet }
								onClick={ () => dispatch( refreshTasks ) }
							/>
							<Button
								className={ 'icon-button' }
								color={ 'green' }
								icon={ faPlus }
								onClick={ toggleTaskModal }
							/>
						</div>
					</div>
					<hr/>
					<TaskList/>
				</div>
			</main>
		</>
	)
}
