import React from 'react';
import { faInfo } from '@fortawesome/free-solid-svg-icons';
import { Button } from '../Buttons';
import { useDispatch, useSelector } from 'react-redux';
import { setModal } from '../../services/uiSlice';
import { Monthly, MonthlyBlank, MonthlyMock } from './Monthly';
import { getMonthlies, setSelectedBill } from '../../services/billSlice';

export function Bill( { billData } ) {
	const dispatch = useDispatch()
	const monthlies = useSelector( getMonthlies )

	const openBill = () => {
		dispatch( setSelectedBill( billData._id ) )
		dispatch( setModal( 'bill-info' ) )
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
					monthlies.filter(item => item.parent === billData._id).map( ( item, i ) => <Monthly key={ i } monthlyData={item}/> )
				}
				{ [ ...new Array( 3-monthlies.length ).keys() ].map( ( item, i ) => <MonthlyBlank key={ i }/> ) }
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