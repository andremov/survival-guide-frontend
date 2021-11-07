export const formatDate = ( date ) => {
	if ( !date ) {
		return undefined
	}
	const [ year, month, day ] = date.split( 'T' )[ 0 ].split( '-' )
	return `${ [ day, month, year ].join( '/' ) }`
}

const reverse = (string) => string.split("").reverse().join("")

const twoDigits = ( value ) => reverse(reverse(`0${value}`).substring(0,2))

const monthDigit = ( month ) => ((month - 1) % 12) + 1

export const formatDateValue = ( date ) => {
	if ( !date ) {
		return undefined
	}
	const [ day, month, year ] = formatDate( date )
		.split( '/' )
	return [ year, twoDigits( month ), twoDigits( day ) ].join( '-' )
}

export const formatPrice = ( value ) => {
	const dollarFormat = new Intl.NumberFormat( 'en-US', { style : 'currency', currency : 'COP' } );
	return `$ ${ dollarFormat.format( value )
		.slice( 4 ) }`
}

export const getSurroundingMonths = ( monthlies ) => {
	const currentMonth = new Date().getMonth() + 1
	return [ ...new Array( 3 ).keys() ]
		.map(
			( item, i ) => monthlies.find(
				item => {
					const m = +( item.exp_date.split( 'T' )[ 0 ].split( '-' )[ 1 ] )
					return m === monthDigit(currentMonth + ( i - 1 ))
				}
			)
		)
		.map(
			( item, i ) =>
				!item ? { exists : false, month : twoDigits(monthDigit(currentMonth + ( i - 1 ))) } : { ...item, exists : true }
		)
}
