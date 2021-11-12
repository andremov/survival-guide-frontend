import React from 'react';

export default function Select( { placeholder, onChange, name, options = [], ...props } ) {
	const [ filterText, setFilterText ] = React.useState( '' )
	const [ showOptions, setShowOptions ] = React.useState( false )

	const handleOption = ( item ) => {
		onChange( name, item.val )
		setFilterText( item.label )
		setShowOptions( false )
	}

	const handleChange = e => {
		setFilterText( e.target.value )
		setShowOptions( true )
	}

	return (
		<div
			className={ 'input-component' }
			onFocus={ () => setShowOptions( true ) }
			onBlur={ () => setTimeout( () => setShowOptions( false ), 100 ) }
		>
			{
				!!placeholder && <div className={ 'input-label' + ( !!( props.value || filterText ) ? ' has-text' : '' ) }>
					{ placeholder }
				</div>
			}
			<input
				onChange={ handleChange }
				value={ filterText }
			/>

			{ options.filter( item => item.label.includes( filterText ) ).length > 0 &&
			<div className={ `dropdown ${ showOptions ? 'visible' : '' }` }
			     { ...props }
			     onChange={ e => onChange( name, e.target.value ) }
			>
				{ options.filter( item => item.label.includes( filterText ) )
					.map(
						( item, i ) => <div
							className={ 'dropdown-option' }
							key={ i }
							onClick={ () => handleOption( item ) }
						>
							{ item.label }
						</div>
					) }
			</div>
			}
		</div>
	);
}

