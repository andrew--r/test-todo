import {
	ADD_TODO,
	DELETE_TODO,
	TOGGLE_TODO,
} from './constants';

let lastTodoId = 0;

export function todoReducer(state = [], action) {
	switch (action.type) {
		case ADD_TODO: {
			return state.concat([{
				id: lastTodoId++,
				completed: false,
				isBeingEdited: false,
				text: action.payload,
			}]);
		}

		case DELETE_TODO: {
			return state.filter(item => item.id !== action.payload);
		}

		case TOGGLE_TODO: {
			return state
			.filter(item => item.id !== action.payload)
			.concat(
				state
					.filter(item => item.id === action.payload)
					.map(item => Object.assign(item, {
						completed: !item.completed,
					}))
			);
		}

		default: {
			return state;
		}
	}
}
