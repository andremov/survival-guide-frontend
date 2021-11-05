import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBills, isBillPrefetching, refreshBills } from '../services/billSlice';
import { Bill, BillMock } from './Bill';

export function BillList() {
	const bills = useSelector( getBills )
	const prefetching = useSelector( isBillPrefetching )
	const dispatch = useDispatch()

	React.useEffect( () => dispatch( refreshBills ), [] )

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

