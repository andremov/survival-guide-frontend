import React from 'react';
import { useSelector } from 'react-redux';
import { isBillPrefetching } from '../services/billSlice';
import { Bill, BillMock } from './Items/Bill';
import { useListedBills } from './Hooks/useListedBills';

export function BillList() {
	const bills = useListedBills()
	const prefetching = useSelector( isBillPrefetching )

	if ( prefetching ) {
		return <div className={ 'bill-list' }>
			{
				[ ...new Array( 4 ).keys() ].map( ( item, i ) => <BillMock key={ i }/> )
			}
		</div>
	}

	if ( bills.length === 0 ) {
		return <>
			No hay facturas.
		</>
	}

	return <div className={ 'bill-list' }>
		{
			bills.map( ( item, i ) => <Bill key={ i } billData={ item }/> )
		}
	</div>
}

