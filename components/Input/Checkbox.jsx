import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const emptyFunc = () => {
}

export default function Checkbox( { handleClick = emptyFunc, isDone = false, label = '', } ) {
	return (
		<>
			<div className={ `checkbox ${isDone? 'checked':''}` } onClick={ handleClick }>
				{ isDone && <FontAwesomeIcon icon={ faCheck }/> }
			</div>
			<div className={ `checkbox-label ${isDone? 'checked':''}` } onClick={ handleClick }>
				{ label }
			</div>
		</>
	);
}

