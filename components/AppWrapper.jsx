import React from 'react';
import { ApiLoadModal } from './Modals/ApiLoadModal';
import { Header } from './Header';
import { useDispatch, useSelector } from 'react-redux';
import { isPrecached } from '../services/apiLoadSlice';
import { ModalHandler } from './Modals/ModalHandler';
import { refreshTasks } from '../services/taskSlice';
import { refreshBills, refreshExtras, refreshMonthlies } from '../services/billSlice';

export function AppWrapper({ Component, pageProps }) {
	const precached = useSelector(isPrecached)
	const dispatch = useDispatch()

	React.useEffect( () => dispatch( refreshTasks ), [] )
	React.useEffect( () => dispatch( refreshBills ), [] )
	React.useEffect( () => dispatch( refreshMonthlies ), [] )
	React.useEffect(() => dispatch(refreshExtras), [])

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

