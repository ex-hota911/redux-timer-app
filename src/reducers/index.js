//import { combineReducers } from 'redux'

const MIN_IN_MILLIS = 60 * 1000;

const reducer = (
	state = {
		timer: {
			remainingTime: 25 * MIN_IN_MILLIS,
			isWorking: true,
			count: 0,
		},
		setting: {
			workTime: 25,
			breakTime: 5,
		},
		form: null,
	},
	action
) => {
	switch (action.type) {
		case 'START': {
			if (state.timer.startedAt) return state;
			let remainingTime = state.timer.remainingTime;
			let isWorking = state.timer.isWorking;
			if (state.timer.remainingTime === 0) {
				isWorking = !state.timer.isWorking;
				remainingTime = (isWorking)
					? state.setting.workTime * MIN_IN_MILLIS
					: state.setting.breakTime * MIN_IN_MILLIS
			}
			return {
				...state,
				timer: {
					...state.timer,
					startedAt: action.startedAt,
					isWorking,
					remainingTime,
				},
			}
		}
		case 'STOP':
			if (!state.timer.startedAt) return state;
			return {
				...state,
				timer: {
					...state.timer,
					remainingTime: state.timer.remainingTime - (new Date().getTime() - state.timer.startedAt),
					startedAt: null
				}
			}
		case 'FINISH': {
			return {
				...state,
				timer: {
					...state.timer,
					remainingTime: 0,
					startedAt: null,
					isWorking: state.timer.isWorking,
				},
			}
		}
		case 'SET_COUNT':
			return {
				...state,
				timer: {
					...state.timer,
					count: action.count,
				}
			}
		case 'EDIT':
			return {
				...state,
				form: {
					...state.setting,
				}
			}
		case 'SAVE':
			if (!form) return;
			var workTime = Number.parseInt(state.form.workTime, 10);
			var breakTime = Number.parseInt(state.form.breakTime, 10);
			return {
				...state,
				timer: {
					...state.timer,
					startedAt: null,
					isWorking: true,
					remainingTime: workTime * MIN_IN_MILLIS,
				},
				setting: {
					...state.setting,
					workTime,
					breakTime,
				},
				form: null,
			}
		case 'CANCEL':
			return {
				...state,
				form: null,
			}
		case 'UPDATE_FORM':
			let newState = {
				...state,
			}
			newState.form[action.key] = action.value
			return newState;
		default:
			return state;
	}
}

export default reducer;
