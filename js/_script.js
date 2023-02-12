import { initContol } from "./control.js";
import { state } from "./state.js";


initPomodoro();

function initPomodoro() {
    initContol();

    state.activeTodo = {
        id: 'default',
        pomodoro: 1,
        title: 'Помодоро'
    }
}