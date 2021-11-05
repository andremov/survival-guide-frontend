import React from 'react';

export function Toast( { fadeOut, children } ) {
	return (
		<div className={ `toast ${ fadeOut ? 'do-fade-out' : '' }` }>
			{ children }
		</div>
	);
}

