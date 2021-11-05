import React from 'react';
import { fetchBills } from '../services/api';

export function useBills() {
	const [ bills, setBills ] = React.useState( [] )

	const refreshBills = () => {
		fetchBills()
			.then( data => setBills( data ) )
	}

	React.useEffect( refreshBills, [] )


	return [ bills, refreshBills ]

}
