import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export function Button( { className = '', color, onClick, ...props } ) {
	return (
		<button className={ `${ className } ${ ( color ? `color-${ color }` : '' ) }` } onClick={ onClick }>
			<ButtonContents
				{ ...props }
			/>
		</button>
	);
}

export function Link( { href, ...props } ) {
	return (
		<a className={ 'button' } href={ href }>
			<ButtonContents
				{ ...props }
			/>
		</a>
	)
}

function ButtonContents( { label, icon, position = 'left' } ) {
	return <>
		{ !!icon && position === 'left' &&
		<FontAwesomeIcon className={ `button-icon ${ !!label ? 'pos-left' : '' }` } icon={ icon }/> }
		{ !!label && <div className={ 'button-label' }>{ label }</div> }
		{ !!icon && position === 'right' &&
		<FontAwesomeIcon className={ `button-icon ${ !!label ? 'pos-right' : '' }` } icon={ icon }/> }
	</>
}
