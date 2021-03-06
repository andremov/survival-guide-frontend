import React from 'react';
import { ApiLoadModal } from './Modals/ApiLoadModal';
import { useDispatch, useSelector } from 'react-redux';
import { isOnline, isPrecached } from '../services/apiLoadSlice';
import { ModalHandler } from './Modals/ModalHandler';
import { refreshTasks } from '../services/taskSlice';
import { refreshMonthlies } from '../services/monthlySlice';
import { refreshOptions } from '../services/optionSlice';
import { refreshBills } from '../services/billSlice';
import { refreshMonthID } from '../services/uiSlice';

export function AppWrapper({ Component, pageProps }) {
	const precached = useSelector(isPrecached)
	const onlineState = useSelector(isOnline)
	const dispatch = useDispatch()

	React.useEffect( () => {
		let interval = undefined

		const refreshAll = () => {
			if (onlineState) {
				dispatch( refreshTasks )
				dispatch( refreshBills )
				dispatch( refreshMonthlies )
				dispatch( refreshOptions )
				dispatch( refreshMonthID )
			}
		}

		if (precached) {
			refreshAll()
			interval = setInterval(refreshAll, 5000)
		}

		return () => clearInterval(interval)
	}, [precached, onlineState])

	return (
		<>
			{/*<Header/>*/}
			<ModalHandler/>
			<ApiLoadModal
				precached={precached}
			/>
			{ precached && <Component { ...pageProps } /> }
		</>
	);
}

