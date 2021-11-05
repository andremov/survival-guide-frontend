import React from 'react';
import { ApiLoadModal } from './Modals/ApiLoadModal';
import { Header } from './Header';
import { useSelector } from 'react-redux';
import { isPrecached } from '../services/apiLoadSlice';
import { ModalHandler } from './Modals/ModalHandler';

export function AppWrapper({ Component, pageProps }) {
	const precached = useSelector(isPrecached)

	return (
		<>
			<Header/>
			<ModalHandler/>
			<ApiLoadModal
				precached={precached}
			/>
			{ precached && <Component { ...pageProps } /> }
		</>
	);
}

