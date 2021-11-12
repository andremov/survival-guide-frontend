import axios from 'axios';

const API = axios.create( {
	baseURL : process.env.NODE_ENV === 'development' ? 'http://localhost:3030/' : 'https://andremov-survival-api.herokuapp.com/',
	timeout : 15000,
	responseType : 'json',
} );

export const ping = () => API.get( 'ping' )
	.then( () => true )
	.catch( () => false )

export const fetchMonthID = () => API.get( 'monthid' )
	.then( r => r.data.month_id )
	.catch(e => false)


//

export const fetchTasks = () => API.get( 'tasks/list' )
	.then( r => r.data.tasks )
	.catch(e => false)

export const createTask = ( task ) => API.post( 'tasks/', task )
	.then( r => r.data )

export const patchTask = ( { _id, ...task } ) => API.patch( `tasks/${ _id }`, task )
	.then( r => r.data )

export const deleteTask = ( id ) => API.delete( `tasks/${ id }` )
	.then( r => r.data )


//

export const fetchInstitutions = () => API.get( 'bills/options/institutions' )
	.then( r => r.data.options )
	.catch(e => false)

export const fetchPeople = () => API.get( 'bills/options/people' )
	.then( r => r.data.options )
	.catch(e => false)


//

export const fetchBills = () => API.get( 'bills/list' )
	.then( r => r.data.bills )
	.catch(e => false)

export const createBill = ( bill ) => API.post( 'bills/', bill )
	.then( r => r.data )

export const patchBill = ( { _id, ...bill } ) => API.patch( `bills/${ _id }`, bill )
	.then( r => r.data )

export const deleteBill = ( id ) => API.delete( `bills/${ id }` )
	.then( r => r.data )


//

export const fetchMonthlies = () => API.get( 'monthlies/list' )
	.then( r => r.data.monthlies )
	.catch(e => false)

export const createMonthly = ( monthly ) => API.post( 'monthlies/', monthly )
	.then( r => r.data )

export const patchMonthly = ( { _id, ...monthly } ) => API.patch( `monthlies/${ _id }`, monthly )
	.then( r => r.data )

export const deleteMonthly = ( id ) => API.delete( `monthlies/${ id }` )
	.then( r => r.data )
