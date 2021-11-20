import React from 'react';
import { Line } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { getMonthlies, isMonthlyLoading } from '../services/monthlySlice';
import { useListedBills } from './Hooks/useListedBills';
import { getMonthID } from '../services/uiSlice';

const parseMonthlies = (monthlies, currentMonth) => {
	const startMonth = Math.min( ...monthlies.map( item => item.month_id ) )
	const endMonth = Math.max( ...monthlies.map( item => item.month_id ) )
	let labels = [ ...new Array( Math.max( ( endMonth - startMonth ) + 1, 1 ) ).keys() ]
		.map( item => item + startMonth )

	if (labels[0] === Infinity) {
		labels[0] = currentMonth
	}

	let dueData = labels.map( label => monthlies.filter( monthly => monthly.month_id === label )
		.map( monthly => monthly.amount_due )
		.reduce( ( a, b ) => a + b, 0 ) )
	let paidData = labels.map( label => monthlies.filter( monthly => monthly.month_id === label )
		.map( monthly => monthly.amount_paid ?? 0 )
		.reduce( ( a, b ) => a + b, 0 ) )

	labels = labels.map(
		item => `${ ( ( item - 1 ) % 12 ) + 1 }/${ ( "" + ( Math.floor( (item-1) / 12 ) + 2010 ) ).substring( 2 ) }` )

	return {
		labels, datasets : [
			{
				label : 'Pagado',
				data : paidData,
				fill : true,
				backgroundColor : 'rgb(109,255,99)',
				borderColor : 'rgba(143,255,99,0.2)',
			},
			{
				label : 'Debido',
				data : dueData,
				fill : true,
				backgroundColor : 'rgb(255, 99, 132)',
				borderColor : 'rgba(255, 99, 132, 0.2)',
			},
		]
	}
}


export function LineChart( { monthlies } ) {
	const bills = useListedBills()
		.map( bill => bill._id )
	const generalMonthlies = useSelector( getMonthlies )
		.filter( item => bills.includes( item.parent ) )
	const loading = useSelector( isMonthlyLoading )
	const currentMonth = useSelector(getMonthID)
	const data = parseMonthlies( monthlies ?? generalMonthlies, currentMonth )
	const [ fullscreen, setFullscreen ] = React.useState( false )

	const options = {
		scales : {
			y : {
				beginAtZero : true
			}
		}
	};

	return (
		loading ? <div className={ 'chart-mock-up' }/> :
			<div className={ `chart-container ${ fullscreen? 'fullscreen' : '' }` } onClick={() => setFullscreen(!fullscreen)}>
				<Line data={ data } options={ options } type={ 'line' }/>
			</div>
	);
}

