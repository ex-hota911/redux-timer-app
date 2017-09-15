//import { combineReducers } from 'redux'

export default function reducer(state = {}, action) {
	switch (action.type) {
		case 'START':
			return {
				...state,
				startedAt: action.startedAt
			}
		default:
			return state;
	}
}
