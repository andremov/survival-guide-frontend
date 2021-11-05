import axios from 'axios';

const API = axios.create( {
	baseURL : process.env.NODE_ENV === 'development' ? 'http://localhost:3030/' : 'https://andremov-survival-api.herokuapp.com/',
	timeout : 15000,
	responseType : 'json',
} );

export const ping = () => API.get( 'ping' )
	.then( r => r.data );

export const fetchTasks = () => API.get( 'tasks/list' )
	.then( r => r.data.tasks );

export const createTask = (task) => API.post( 'tasks/', task )
	.then( r => r.data );

export const patchTask = ( { _id, ...task }) => API.patch( `tasks/${_id}`, task )
	.then( r => r.data );

export const fetchBills = () => API.get( 'bills/list' )
	.then( r => r.data.bills );

export const fetchMonthlies = () => API.get( 'monthlies/list' )
	.then( r => r.data.monthlies );
