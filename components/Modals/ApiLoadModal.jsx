import React from 'react';
import { LoadingModal } from './LoadingModal';
import { ping } from '../../services/api';
import { useDispatch, useSelector } from 'react-redux';
import { isOnline, lastRequestDate, setOnline, updateLastRequestDate } from '../../services/apiLoadSlice';
import { Toast } from '../Toasts/Toast';
import { RequestingContents } from '../RequestingContents';
import { SuccessContents } from '../SuccessContents';

export function ApiLoadModal( { precached } ) {
	const dispatch = useDispatch()
	const online = useSelector( isOnline )
	const updateDate = useSelector( lastRequestDate )

	React.useEffect( () => {

		const min15 = 15 * 1000 * 60;

		const checkDate = () => {
			const timeDiff = ( updateDate - Date.now() ) + min15
			console.log(timeDiff)
			if ( timeDiff < 0 ) {
				dispatch( setOnline( false ) )
			} else {
				setTimeout( checkDate, timeDiff )
			}
		}

		const doPing = async () => {
			const payload = await ping()

			dispatch( updateLastRequestDate() )
			dispatch( setOnline( payload ) )

			if ( payload ) {
				setTimeout( checkDate, min15 )
			} else {
				setTimeout( doPing, 100 )
			}
		}

		if ( !online ) {
			setTimeout( doPing, 100 )
		}
	}, [ online ] )

	if ( !precached ) {
		return (
			<LoadingModal/>
		);
	}

	return <Toast fadeOut={online}>
		{
			online && <SuccessContents/>
		}
		{
			!online && <RequestingContents text={'Revisando...'}/>
		}
	</Toast>
}

