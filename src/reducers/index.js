//import { combineReducers } from 'redux'

export default function reducer(state = { remaningTime: 3 * 60 * 1000 }, action) {
	switch (action.type) {
		case 'START':
			return {
				...state,
				startedAt: action.startedAt,
				remaningTime: state.remaningTime,
			}
		case 'STOP':
			return {
				...state,
				remaningTime: state.remaningTime - (new Date().getTime() - state.startedAt),
				startedAt: null
			}
		default:
			return state;
	}
}
