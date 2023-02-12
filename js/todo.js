import { state } from "./state.js";


const elTitle = document.querySelector('.title');
const elCountNum = document.querySelector('.count_num');
const elTodoList = document.querySelector('.todo__list');

export function initTodo() {

    const todoList = getTodo();
    if (!todoList.length) todoList.push({ id: 'default', pomodoro: 0, title: 'Помодоро' });
    state.activeTodo = todoList[todoList.length - 1];
    console.log('getTodo ', todoList, state);
    showTodo();
    renderTodoList(todoList);
}


function getTodo() {
    let d = JSON.parse(localStorage.getItem('pomodoro') || '[]');
    console.log('getTodo ', d);
    return d;
}


function showTodo() {
    elTitle.textContent = state.activeTodo.title;
    elCountNum.textContent = state.activeTodo.pomodoro;
}


const elLiAddTodo = document.createElement('li');
elLiAddTodo.classList.add('todo__item');

const addBtn = document.createElement('button');
addBtn.classList.add('todo__add');
addBtn.textContent = 'Добавить новую задачу';
elLiAddTodo.append(addBtn);
elLiAddTodo.addEventListener('click', () => { 
    const title = prompt('Имя?');
    createTodoListItem(addTodo(title));
});


function addTodo(title) {
    const todo = {
        id: Math.random().toString(16).substring(2,8),
        pomodoro: 0,
        title
    };
    console.log('add todo ', todo.title, todo.id);

    const todoList = getTodo();
    todoList.push(todo);

    localStorage.setItem('pomodoro', JSON.stringify(todoList));
    return todo;
}

function createTodoListItem(el) {
    const li = document.createElement('li');
    li.classList.add('todo__item');
    
    const div = document.createElement('div');
    div.classList.add('todo__item-wrapper');
    li.append(div);

    const todoBtn = document.createElement('button');
    todoBtn.classList.add('todo__btn');
    todoBtn.textContent = el.title;

    const editBtn = document.createElement('button');
    editBtn.classList.add('todo__edit');
    editBtn.areaLabel = 'Редактировать';

    const delBtn = document.createElement('button');
    delBtn.classList.add('todo__del');
    delBtn.areaLabel = 'Удалить';

    div.append(todoBtn, editBtn, delBtn);
    elTodoList.prepend(li);
}

function renderTodoList(ls) {
    elTodoList.textContent = '';
    ls.forEach(el => {
        if (el.id !== 'default') createTodoListItem(el);
    });

    elTodoList.append(elLiAddTodo);

/*<li class="todo__item">
        <div class="todo__item-wrapper">
        <button class="todo__btn">Написать Pomodoro</button>
        <button class="todo__edit" aria-label="Редактировать"></button>
        <button class="todo__del" aria-label="Удалить"></button>
        </div>
    </li> */
}