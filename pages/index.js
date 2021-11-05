import Head from 'next/head'
import { TaskList } from '../components/TaskList';
import { Button } from '../components/Buttons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { NewTaskModal } from '../components/Modals/NewTaskModal';

export default function Home() {
	const [ taskModalActive, setTaskModalActive ] = React.useState( false )

	const toggleTaskModal = () => setTaskModalActive( !taskModalActive )

	return (
		<>
			<Head>
				<title>Guía de Supervivencia</title>
				<meta name="description" content="¿Como sobrevivir sin supervisión?"/>
				<link rel="icon" href="/favicon.ico"/>
			</Head>

			{ taskModalActive && <NewTaskModal closeCallback={ toggleTaskModal }/> }

			<main>
				<div className={ 'card' }>
					<div className={ 'card-header' }>
						<h2>
							Lista de Tareas
						</h2>
						<Button
							className={ 'new-item-button' }
							color={ 'green' }
							icon={ faPlus }
							onClick={ toggleTaskModal }
						/>
					</div>
					<hr/>
					<TaskList/>
				</div>
			</main>
		</>
	)
}
