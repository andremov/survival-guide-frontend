import React from 'react';
import { ModalTemplate } from './ModalTemplate';

export function LoadingModal() {
	return (
		<ModalTemplate>
			<div className={ 'loading-spinner' }/>
		</ModalTemplate>
	);
}

