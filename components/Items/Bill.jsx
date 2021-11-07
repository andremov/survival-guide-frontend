import React from 'react';
import { faInfo } from '@fortawesome/free-solid-svg-icons';
import { Button } from '../Buttons';
import { useDispatch, useSelector } from 'react-redux';
import { setModal } from '../../services/uiSlice';
import { Monthly, MonthlyBlank, MonthlyMock } from './Monthly';
import { getSurroundingMonths } from '../../services/utils';
import { getMonthlies } from '../../services/monthlySlice';
import { setSelectedBill } from '../../services/billSlice';

export function Bill( { billData } ) {
	const dispatch = useDispatch()
	const monthlies = useSelector( getMonthlies ).filter(item => item.parent === billData._id)

	const openBill = () => {
		dispatch( setSelectedBill( billData._id ) )
		dispatch( setModal( 'info-bill' ) )
	}

	return (
		<div className={ 'bill-item' }>
			<div className={'bill-data'}>
				<div className={ 'bill-label' }>
					{ `${ billData.name } - ${ billData.person_name } - ${ billData.institution }` }
				</div>
				<Button
					icon={ faInfo }
					className={ 'icon-button' }
					onClick={ openBill }
					color={'transp'}
				/>
			</div>
			<div className={'monthly-bill-data'}>
				{
					getSurroundingMonths(monthlies).map(
						(item,i) => item.exists?
							<Monthly key={ i } monthlyData={item}/> : <MonthlyBlank parent={billData._id} month={item.month} key={ i }/>
					)
				}
			</div>
		</div>
	);
}

export function BillMock() {
	return (
		<div className={ 'bill-item mock-up' }>
			<div className={'bill-data'}>
				<div className={ 'bill-label' }/>
			</div>
			<div className={'monthly-bill-data'}>
				{ [ ...new Array( 3 ).keys() ].map( ( item, i ) => <MonthlyMock key={ i }/> ) }
			</div>
		</div>
	);
}
