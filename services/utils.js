
export const formatDate = (date) => {
	const [year, month,day] = date.split('T')[0].split('-')
	return `${ [day,month,year].join('/') }`
}

const twoDigits = (value) => `${value < 10? `0${value}` : value}`

export const formatDateValue = (date)=> {
	const [day, month, year] =  formatDate(date).split('/')
	return [year, twoDigits(month), twoDigits(day)].join('-')
}

export const formatPrice = ( value ) => {
	const dollarFormat = new Intl.NumberFormat( 'en-US', { style : 'currency', currency : 'COP' } );
	return `$ ${ dollarFormat.format( value )
		.slice( 4 ) }`
}
