import React from 'react';

export function SuccessContents() {
	return (
		<div className={'form-state color-green'}>
			Exito.
		</div>
	);
}

export function RequestingContents({text}) {
	return (
		<div className={'form-state color-blue'}>
			{ text }
		</div>
	);
}

export function FailureContents() {
	return (
		<div className={'form-state color-red'}>
			Error
		</div>
	);
}
