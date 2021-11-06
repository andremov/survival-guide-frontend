
export const formatDate = (date)=> {
	return `${ (new Date( date) ).toLocaleDateString( 'es' ) }`
}

export const formatPrice = ( value ) => {
	const dollarFormat = new Intl.NumberFormat( 'en-US', { style : 'currency', currency : 'COP' } );
	return `$ ${ dollarFormat.format( value )
		.slice( 4 ) }`
}
