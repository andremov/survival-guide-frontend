import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFilters, setFilters } from '../services/billSlice';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function FilterBreadcrumbs() {
	const dispatch = useDispatch()
	const { person_name, institution } = useSelector( getFilters )

	const onToggleFilter = ( type, value ) => dispatch( setFilters( { type, value } ) )

	return (
		<div className={ 'crumb-container' }>
			{ person_name.map( ( item, i ) => <Crumb value={item} key={ i } removeFilter={() => onToggleFilter('person_name', item)}/> ) }
			{ institution.map( ( item, i ) => <Crumb value={item} key={ i } removeFilter={() => onToggleFilter('institution', item)}/> ) }
		</div>
	);
}

const Crumb = ( { value, removeFilter } ) => <div className={ 'crumb' } onClick={removeFilter}>
	<div>
		{ value }
	</div>
	<FontAwesomeIcon icon={ faTimes }/>
</div>
