//import { combineReducers } from 'redux'

const DEFAULT_WORK_TIME = 25 * 60 * 1000;
const DEFAULT_BREAK_TIME = 5 * 60 * 1000;

const reducer = (
	state = {
		remaningTime: DEFAULT_WORK_TIME,
		isWorking: true,
		count: 0,
	},
	action
) => {
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
			...state,
			remaningTime: (state.isWorking) ? DEFAULT_BREAK_TIME : DEFAULT_WORK_TIME,
			isWorking: !state.isWorking,
			startedAt: null
		}
		case 'COUNT_UP':
		return {
			...state,
			count: state.count + 1
		}
		default:
		return state;
	}
}

export default reducer;
