import React from 'react';
import { Modal } from './Modal';

export function LoadingModal() {
	return (
		<Modal>
			<div className={ 'loading-spinner' }/>
		</Modal>
	);
}

