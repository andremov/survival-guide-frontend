import React from 'react';
import { CardTemplate } from '../CardTemplate';
import { useDispatch } from 'react-redux';
import { setModal } from '../../services/uiSlice';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

export function ModalTemplate( { children, title, doCloseButton=true, buttons = [] } ) {
	const dispatch = useDispatch();
	const closeModal = () => dispatch( setModal( '' ) )

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

