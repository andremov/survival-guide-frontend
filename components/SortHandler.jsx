import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSortDirection, getSortField, setSort } from '../services/uiSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortAmountDown, faSortAmountUp } from '@fortawesome/free-solid-svg-icons';

const sortFields = [
	{label: 'Nombre', value: 'name'},
	{label: 'Persona', value: 'person_name'},
	{label: 'Institución', value: 'institution'},
	{label: 'Monto', value: 'amount'},
]

export function SortHandler() {
	const curSortField = useSelector(getSortField)
	const curSortDirection= useSelector(getSortDirection)
	const dispatch = useDispatch()

	const changeSort = value => dispatch(setSort(value))

	return (
		<div className={ 'sorting-container' }>
			{
				sortFields.map(
					( item, i ) =>
						<div
							className={ `sort-item ${item.value === curSortField? ' active' : ''}` }
							key={ i }
							onClick={() => changeSort(item.value)}
						>
							{ item.label }
							{item.value === curSortField &&
							<FontAwesomeIcon
								icon={curSortDirection === 1? faSortAmountDown : faSortAmountUp}
								/>
							}
						</div>
				)
			}

		</div>
	);
}

