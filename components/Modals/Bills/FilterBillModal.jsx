import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ModalTemplate } from '../ModalTemplate';
import { getInstitutions, getPeople } from '../../../services/optionSlice';
import { clearFilters, getFilters, setFilters } from '../../../services/billSlice';
import { faBackspace } from '@fortawesome/free-solid-svg-icons';
import { Checkbox } from '../../Input';
import { useCurrentMonthBills } from '../../Hooks/useCurrentMonthBills';

export default function FilterBillModal() {
	const institutions = useSelector( getInstitutions )
	const people = useSelector( getPeople )
	const bills = useCurrentMonthBills()
	const filters = useSelector( getFilters )
	const dispatch = useDispatch()

	const onClearFilters = () => dispatch( clearFilters() )
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
		<FilterSection
			title={ 'Estado' }
			options={ [{label: 'Pagado', val: 'PAID'}, {label: 'Pendiente', val: 'PENDING'}, {label: 'Sin Reportar', val: 'UNREPORTED'}, {label: 'Atrasado', val: 'OVERDUE'}] }
			bills={ bills.map( item => item.monthly.status ) }
			toggleFilterCallback={ value => onToggleFilter( 'monthly_status', value ) }
			activeFilters={ filters.monthly_status ?? [] }
		/>
	</ModalTemplate>
}

const FilterSection = ( { title, options = [], bills = [], toggleFilterCallback, activeFilters } ) =>
	<div className={ 'filter-section' }>
		<h3>
			{ title }
		</h3>
		<div className={'filter-item-list'}>
		{
			options.map(
				( option, i ) => {
					const checked = !!activeFilters.find( item => item === option.val )

					return <div
						key={ i }
						className={ 'filter-item' }
						onClick={ () => toggleFilterCallback( option.val ) }
					>
						<Checkbox
							isDone={checked}
							label={`${ option.label } (${ bills.filter( bill => bill === option.val ).length })`}
						/>
					</div>
				}
			)
		}
		</div>
	</div>

