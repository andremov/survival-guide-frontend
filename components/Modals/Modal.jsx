import React from 'react';

export function Modal( { children, title } ) {
	return (
		<div className={ 'backdrop' }>
			<div className={ 'modal' }>
				{
					!!title && <>
						<h2>
							{ title }
						</h2>
						<hr/>
					</>
				}
				<div className={ 'modal-body' }>
					{ children }
				</div>
			</div>
		</div>
	)
}

