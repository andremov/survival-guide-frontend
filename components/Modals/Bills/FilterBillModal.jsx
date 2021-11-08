import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ModalTemplate } from '../ModalTemplate';
import { getInstitutions, getPeople } from '../../../services/optionSlice';
import { clearFilters, getBills, getFilters, setFilters } from '../../../services/billSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackspace, faCheck } from '@fortawesome/free-solid-svg-icons';

export default function FilterBillModal() {
	const institutions = useSelector( getInstitutions )
	const people = useSelector( getPeople )
	const bills = useSelector( getBills )
	const filters = useSelector( getFilters )
	const dispatch = useDispatch()

	const onClearFilters = () => dispatch( clearFilters )
	const onToggleFilter = ( type, value ) => dispatch( setFilters( { type, value } ) )

	return <ModalTemplate
		title={ 'Filtrar Facturas' }
		buttons={ [
			{
				onClick : onClearFilters,
				className : 'icon-button',
				color : 'red',
				icon : faBackspace,
			},
		] }
	>
		<FilterSection
			title={ 'Institución' }
			options={ institutions }
			bills={ bills.map( item => item.institution ) }
			toggleFilterCallback={ value => onToggleFilter( 'institution', value ) }
			activeFilters={ filters.institution ?? [] }
		/>
		<FilterSection
			title={ 'Persona' }
			options={ people }
			bills={ bills.map( item => item.person_name ) }
			toggleFilterCallback={ value => onToggleFilter( 'person_name', value ) }
			activeFilters={ filters.person_name ?? [] }
		/>
	</ModalTemplate>
}

const FilterSection = ( { title, options = [], bills = [], toggleFilterCallback, activeFilters } ) =>
	<div className={ 'filter-section' }>
		<h3>
			{ title }
		</h3>
		{
			options.map(
				( option, i ) => {
					const checked = !!activeFilters.find( item => item === option.val )

					return <div
						key={ i }
						className={ `filter-item ${ checked ? 'checked' : '' }` }
						onClick={ () => toggleFilterCallback( option.val ) }
					>
						<div className={ 'check-box' }>
							{ checked && <FontAwesomeIcon icon={ faCheck }/> }
						</div>
						<div className={ 'filter-label' }>
							{ `${ option.label } (${ bills.filter( bill => bill === option.val ).length })` }
						</div>
					</div>
				}
			)
		}
	</div>

