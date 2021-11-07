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

	React.useEffect( () => dispatch( refreshTasks ), [] )
	React.useEffect( () => dispatch( refreshBills ), [] )
	React.useEffect( () => dispatch( refreshMonthlies ), [] )
	React.useEffect(() => dispatch(refreshOptions), [])
	React.useEffect(() => dispatch(refreshMonthID), [])

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

