//import { combineReducers } from 'redux'

const MIN_IN_MILLIS = 60 * 1000;

const reducer = (
	state = {
		remaningTime: 25 * MIN_IN_MILLIS,
		isWorking: true,
		count: 0,
		setting: {
			isEditing: false,
			workTime: 25,
			breakTime: 5,
		},
		form: {
			workTime: '25',
			breakTime: '5',
		}
	},
	action
) => {
	switch (action.type) {
		case 'START':
			if (state.startedAt) return state;
			return {
				...state,
				startedAt: action.startedAt,
				remaningTime: state.remaningTime,
			}
		case 'STOP':
			if (!state.startedAt) return state;
			return {
				...state,
				remaningTime: state.remaningTime - (new Date().getTime() - state.startedAt),
				startedAt: null
			}
		case 'RESET':
			const isWorking = !state.isWorking;
			return {
				...state,
				remaningTime: (isWorking)
				? state.setting.workTime * MIN_IN_MILLIS
				: state.setting.breakTime * MIN_IN_MILLIS,
				startedAt: null,
				isWorking,
			}
		case 'COUNT_UP':
			return {
				...state,
				count: state.count + 1
			}
		case 'EDIT':
			return {
				...state,
				setting: {
					...state.setting,
					isEditing: true
				}
			}
		case 'SAVE':
			const workTime = Number.parseInt(state.form.workTime, 10);
			return {
				...state,
				startedAt: null,
				isWorking: true,
				remaningTime: workTime * MIN_IN_MILLIS,
				setting: {
					...state.setting,
					workTime: workTime,
					breakTime: Number.parseInt(state.form.breakTime, 10),
					isEditing: false,
				}
			}
		case 'CANCEL':
			return {
				...state,
				form: {
					...state.form,
					workTime: '' + state.setting.workTime,
					breakTime: '' + state.setting.breakTime,
				},
				setting: {
					...state.setting,
					isEditing: false,
				}
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
