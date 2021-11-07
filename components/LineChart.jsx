import React from 'react';
import { Line } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { splitItemExpDate } from '../services/utils';
import { getMonthlies } from '../services/monthlySlice';

const parseMonthlies = m => {
	let monthlies= m.map(item => ({...item, ...splitItemExpDate(item)}))
	const startYear = Math.min(...monthlies.map(item => item.exp_year) )
	monthlies= monthlies.map(item => ({...item, monthID: item.exp_month + ((item.exp_year-startYear)*12)}))
	const startMonth = Math.min(...monthlies.map(item => item.monthID) )
	const endMonth = Math.max(...monthlies.map(item => item.monthID) )
	const labels = [ ...new Array( (endMonth-startMonth)+1 ).keys() ].map(item => item+startMonth)

	let dueData = labels.map(label => monthlies.filter(monthly => monthly.exp_month === label).map(monthly => monthly.amount_due).reduce((a,b) => a + b, 0))
	let paidData = labels.map(label => monthlies.filter(monthly => monthly.exp_month === label).map(monthly => monthly.amount_paid ?? 0).reduce((a,b) => a + b, 0))

	return {
		labels, datasets: [
			{
				label: 'Pagado',
				data: paidData,
				fill: true,
				backgroundColor: 'rgb(109,255,99)',
				borderColor: 'rgba(143,255,99,0.2)',
			},
			{
				label: 'Debido',
				data: dueData,
				fill: true,
				backgroundColor: 'rgb(255, 99, 132)',
				borderColor: 'rgba(255, 99, 132, 0.2)',
			},
		]
	}
}


export function LineChart({monthlies}) {
	const generalMonthlies = useSelector(getMonthlies)
	const data = parseMonthlies(monthlies ?? generalMonthlies)

	const options = {
		scales: {
			y: {
				beginAtZero: true
			}
		}
	};

	return (
		<Line data={data} options={options}  type={'line'}/>
	);
}

