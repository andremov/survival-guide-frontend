import React from 'react';
import { ApiLoadModal } from './Modals/ApiLoadModal';
import { useDispatch, useSelector } from 'react-redux';
import { isPrecached } from '../services/apiLoadSlice';
import { ModalHandler } from './Modals/ModalHandler';
import { refreshTasks } from '../services/taskSlice';
import { refreshMonthlies } from '../services/monthlySlice';
import { refreshOptions } from '../services/optionSlice';
import { refreshBills } from '../services/billSlice';
import { refreshMonthID } from '../services/uiSlice';

export function AppWrapper({ Component, pageProps }) {
	const precached = useSelector(isPrecached)
	const dispatch = useDispatch()

	React.useEffect( () => {
		if (precached) {
			dispatch( refreshTasks )
			dispatch( refreshBills )
			dispatch( refreshMonthlies )
			dispatch( refreshOptions )
			dispatch( refreshMonthID )
		}
	}, [precached])

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

