import {createStore} from 'redux';
import {todoReducer} from './reducers';
import {
	addTodo,
	deleteTodo,
	toggleTodo,
} from './actions';

import '../styles/reset.css';
import '../styles/main.css';

const store = createStore(todoReducer);
const appRoot = document.querySelector('#root');
const listEl = appRoot.querySelector('.todo_app-list');
const controlsEl = appRoot.querySelector('.todo_app-controls');
const addFieldEl = controlsEl.querySelector('.todo_app-add_field');

function sortTodos(a, b) {
	return a.id - b.id;
}

function render() {
	console.log('store.getState()', store.getState());

	const items = (store.getState() || [])
		.sort(sortTodos)
		.map(item => `
			<li class="todo_app-item" data-todo-id="${item.id.toString()}">
				<input
					type="checkbox"
					class="todo_app-toggle_item"
					${item.completed && 'checked="checked"'}
				/>
				<input
					type="text"
					class="todo_app-item_text"
					disabled="${item.isBeingEdited.toString()}"
					value="${item.text}"
				/>
				<button class="todo_app-save_item">✓</button>
				<button class="todo_app-delete_item">x</button>
			</li>
		`);

	listEl.innerHTML = items.join('');
}

render();
store.subscribe(render);

controlsEl.addEventListener('submit', event => {
	event.preventDefault();

	const text = addFieldEl.value;
	if (!text || !text.trim()) return;

	addFieldEl.value = '';
	store.dispatch(addTodo(text));
});

listEl.addEventListener('click', event => {
	const {target} = event;
	if (target.classList.contains('todo_app-delete_item')) {
		const todoId = parseInt(target.parentNode.dataset.todoId, 10);
		store.dispatch(deleteTodo(todoId));
	}

	if (target.classList.contains('todo_app-toggle_item')) {
		const todoId = parseInt(target.parentNode.dataset.todoId, 10);
		store.dispatch(toggleTodo(todoId));
	}
});
