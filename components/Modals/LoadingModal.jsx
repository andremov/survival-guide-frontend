import React from 'react';
import { ModalTemplate } from './ModalTemplate';

export function LoadingModal() {
	return <ModalTemplate doCloseButton={ false }>
		<div className={ 'loading-spinner' }/>
	</ModalTemplate>
}

