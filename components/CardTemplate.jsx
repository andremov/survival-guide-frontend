import React from 'react';
import { Button } from './Buttons';

export function CardTemplate({title='', className='', buttons=[], children}) {
	return (
		<div className={ `card ${className}` }>
			<div className={ 'card-header' }>
				<h2>
					{ title }
				</h2>
				{ buttons.length > 0 && <div className={ 'header-buttons' }>
					{
						buttons.map( ( item, i ) => <Button
							className={ item.className }
							color={ item.color }
							icon={ item.icon }
							onClick={ item.onClick }
							key={ i }
						/> )
					}
				</div> }
			</div>
			<hr/>
			{ children }
		</div>
	);
}

