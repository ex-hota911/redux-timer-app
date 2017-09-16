//import { combineReducers } from 'redux'

const DEFAULT_TIME = 10 * 1000;

export default function reducer(state = { remaningTime: DEFAULT_TIME }, action) {
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
		case 'RESET':
		return {
			remaningTime: DEFAULT_TIME,
			startedAt: null
		}
		default:
		return state;
	}
}
