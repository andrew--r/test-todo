import {
	ADD_TODO,
	DELETE_TODO,
	TOGGLE_TODO,
} from './constants';

export function addTodo(text) {
	return {
		type: ADD_TODO,
		payload: text,
	};
}

export function deleteTodo(id) {
	return {
		type: DELETE_TODO,
		payload: id,
	};
}

export function toggleTodo(id) {
	return {
		type: TOGGLE_TODO,
		payload: id,
	};
}
