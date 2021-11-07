import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faQuestion } from '@fortawesome/free-solid-svg-icons';

const Badge = ({ children, color, onClick= () => {} } ) => <div className={ `badge color-${ color }` } onClick={onClick}>
		{ children }
	</div>

export const DoneBadge = (props) => <Badge color={ 'green' } {...props}>
  <FontAwesomeIcon icon={ faCheck }/>
  <div className={ 'badge-label' }>
    Hecho
  </div>
</Badge>

export  const PendingBadge = (props) => <Badge color={ 'yellow' } {...props}>
  <FontAwesomeIcon icon={ faQuestion }/>
  <div className={ 'badge-label' }>
    Pendiente
  </div>
</Badge>

