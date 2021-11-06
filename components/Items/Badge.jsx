import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faQuestion } from '@fortawesome/free-solid-svg-icons';

const Badge = ({ children, color } ) => <div className={ `badge color-${ color }` }>
		{ children }
	</div>

export const DoneBadge = () => <Badge color={ 'green' }>
  <FontAwesomeIcon icon={ faCheck }/>
  <div className={ 'badge-label' }>
    Hecho
  </div>
</Badge>

export  const PendingBadge = () => <Badge color={ 'yellow' }>
  <FontAwesomeIcon icon={ faQuestion }/>
  <div className={ 'badge-label' }>
    Pendiente
  </div>
</Badge>

