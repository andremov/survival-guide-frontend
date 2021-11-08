import { createSlice } from '@reduxjs/toolkit'
import { fetchInstitutions, fetchPeople } from './api';

const initialState = {
	institutions : [],
	people : [],
	prefetching : true,
	loading : true,
}

export const optionSlice = createSlice( {
	name : 'options',
	initialState,
	reducers : {
		optionsReceived : ( state, action ) => {
			state.institutions = action.payload.institutions
			state.people = action.payload.people
			state.prefetching = false
			state.loading = false
		},
		optionsLoading : ( state ) => {
			if ( !state.loading ) {
				state.loading = true
			}
		},
	},
} )

export const {
	optionsLoading,
	optionsReceived
} = optionSlice.actions

export const refreshOptions = async ( dispatch ) => {
	dispatch( optionsLoading() )
	let institutions = await fetchInstitutions()
	let people = await fetchPeople()

	if ( !institutions || !people ) {
		setTimeout( () => dispatch( refreshOptions ), 100 )
	} else {
		institutions = institutions.map( item => ( { label : item, val : item } ) )
		people = people.map( item => ( { label : item, val : item } ) )

		dispatch( optionsReceived( { institutions, people } ) )
	}
}

export const getInstitutions = ( state ) => state.options.institutions
export const getPeople = ( state ) => state.options.people
export const isOptionPrefetching = ( state ) => state.options.prefetching
export const isOptionLoading = ( state ) => state.options.loading

export default optionSlice.reducer
