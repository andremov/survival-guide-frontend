export const formatDate = ( date ) => {
	if ( !date ) {
		return undefined
	}
	const [ year, month, day ] = date.split( 'T' )[ 0 ].split( '-' )
	return `${ [ day, month, year ].join( '/' ) }`
}

const reverse = ( string ) => string.split( "" )
	.reverse()
	.join( "" )

const twoDigits = ( value ) => reverse( reverse( `0${ value }` )
	.substring( 0, 2 ) )

export const formatDateValue = ( { date, monthsToAdd = 0 } ) => {
	console.log(date)
	if ( !date ) {
		return undefined
	}
	let [ day, month, year ] = formatDate( date )
		.split( '/' )
	month = parseInt(month) + monthsToAdd
	year = parseInt(year) + Math.floor((month-1)/12)
	month = ((month-1)%12)+1
	return [ year, twoDigits( month ), twoDigits( day ) ].join( '-' )
}

export const formatPrice = ( value ) => {
	const dollarFormat = new Intl.NumberFormat( 'en-US', { style : 'currency', currency : 'COP' } );
	return `$ ${ dollarFormat.format( value )
		.slice( 4 ) }`
}

export const getSurroundingMonths = ( monthlies, monthID ) => {
	return [ monthID - 1, monthID, monthID + 1 ]
		.map( month_id => monthlies
			.find( monthly => monthly.month_id === month_id ) ?? month_id
		)
		.map( item =>
			typeof item === 'number' ?
				{ exists : false, month : ( ( item - 1 ) % 12 ) + 1 } :
				{ ...item, exists : true }
		)
}
