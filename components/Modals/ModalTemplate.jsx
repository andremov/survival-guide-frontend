import React from 'react';
import { CardTemplate } from '../CardTemplate';
import { useDispatch } from 'react-redux';
import { setModal } from '../../services/uiSlice';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FailureContents, RequestingContents, SuccessContents } from '../Contents';

export function ModalTemplate( { children, title, doCloseButton=true, buttons = [], formState, processText } ) {
	const dispatch = useDispatch();
	const closeModal = () => dispatch( setModal( '' ) )

	if ( formState === 1 ) {
		return <ModalTemplate doCloseButton={false}>
			<RequestingContents text={ `${processText}...` }/>
		</ModalTemplate>
	}

	if ( formState === 2 ) {
		return <ModalTemplate doCloseButton={false}>
			<SuccessContents/>
		</ModalTemplate>
	}

	if ( formState === 3 ) {
		return <ModalTemplate doCloseButton={false}>
			<FailureContents/>
		</ModalTemplate>
	}

	return (
		<div className={ 'backdrop' }>
			<CardTemplate
				className={ 'modal' }
				title={ title }
				buttons={ doCloseButton ? [...buttons,
					{
						onClick : closeModal,
						className : 'icon-button',
						color : 'transp',
						icon : faTimes,
					}
				] : buttons }
			>
				{ children }
			</CardTemplate>
		</div>
	)
}

