import { state } from "./state.js";
import { stopTimer } from "./timer.js";

// TODO логику вообще вылизать бы надо если реально использовать :)
// после  окончания ворка, помодоро увеличивается - сохранять надо... и актив таск

const elTitle = document.querySelector('.title');
const elCountNum = document.querySelector('.count_num');
const elTodoList = document.querySelector('.todo__list');

const elLiAddTodo = document.createElement('li');

export function initTodo() {

    elLiAddTodo.classList.add('todo__item');
    const addBtn = document.createElement('button');
    addBtn.classList.add('todo__add');
    addBtn.textContent = 'Добавить новую задачу';
    elLiAddTodo.append(addBtn);
    elLiAddTodo.addEventListener('click', addTodoClick);


    const todoList = getTodoList();
    state.activeTodo = todoList[todoList.length - 1];
    //console.log('getTodo ', todoList, state);
    showTodo();
    renderTodoList(todoList);
}

function saveTodoList(todoList) { localStorage.setItem('pomodoro', JSON.stringify(todoList)); }
function fixIfEmpty(todoList) { if (!todoList.length) todoList.push({ id: 'default', pomodoro: 0, title: 'Помодоро' }); }
function getTodoList() {
    const todoList = JSON.parse(localStorage.getItem('pomodoro') || '[]');
    fixIfEmpty(todoList);
    //console.log('getTodoList ', todoList);
    return todoList;
}


function showTodo() {
    elTitle.textContent = state.activeTodo.title;
    elCountNum.textContent = state.activeTodo.pomodoro;
}


function addTodoClick() {
    const title = prompt('Имя?');
    if (title) createTodoListItem(addTodo(title));
}

function addTodo(title) {
    const todo = { id: Math.random().toString(16).substring(2,8), pomodoro: 0, title };
    //console.log('add todo ', todo.title, todo.id);
    const todoList = getTodoList();
    todoList.push(todo);
    saveTodoList(todoList);
    return todo;
}

function createTodoListItem(todo) {
    const li = document.createElement('li');
    li.classList.add('todo__item');
    
    const div = document.createElement('div');
    div.className = 'todo__item-wrapper';
    li.append(div);

    const todoBtn = document.createElement('button');
    todoBtn.className  = 'todo__btn';
    todoBtn.textContent = todo.title;
    todoBtn.addEventListener('click', () => { onTodoClick(todo); })

    const editBtn = document.createElement('button');
    editBtn.className = 'todo__edit';
    editBtn.areaLabel = 'Редактировать';
    editBtn.addEventListener('click', () => { onEditClick(todo, li); })

    const delBtn = document.createElement('button');
    delBtn.className = 'todo__del';
    delBtn.areaLabel = 'Удалить';
    delBtn.addEventListener('click', () => { onDeleteClick(todo, li); })

    div.append(todoBtn, editBtn, delBtn);
    elTodoList.prepend(li);
}

function renderTodoList(ls) {
    elTodoList.textContent = '';
    ls.forEach(el => { if (el.id !== 'default') createTodoListItem(el); });
    elTodoList.append(elLiAddTodo);
}

function onTodoClick(todo){
    //console.log(todo);
    if (state.activeTodo.id == todo.id) return;
    state.activeTodo = todo;
    state.status = 'work';
    stopTimer();
    showTodo();
}

function onEditClick(todo, li){
    const title = prompt('Имя?');
    if (!title) return;
    todo.title = title;
    li.querySelector('.todo__btn').textContent = title;
    showTodo();

    let todoList = getTodoList()
    let t = todoList.find(el => el.id == todo.id);
    t.title = todo.title;
    t.pomodoro = todo.pomodoro;

    saveTodoList(todoList);
}


function onDeleteClick(todo, li){
    let todoList = getTodoList()
    todoList = todoList.filter(el => el.id != todo.id);
    li.remove();
    if (todo.id == state.activeTodo.id) {
        state.activeTodo = todoList[todoList.length - 1]
        showTodo();
    }
    saveTodoList(todoList);
}