import { changeActiveBtn } from "./control.js";
import { state } from "./state.js";

// TODO
// https://my.methed.ru/pl/teach/control/lesson/view?id=267737638&editMode=0
// 35 sec - setInteraval + coorect\sync time 

const elMinutes = document.querySelector('.time__minutes');
const elSeconds = document.querySelector('.time__seconds');
const elCountNum = document.querySelector('.count_num');
const btnStart = document.querySelector('.control__btn_start');
showTime(25 * 60);

export function startTimer() {
    
    state.timerLeft -= 1;
    if (state.timerLeft >= 0 && state.timerActive) {
       state.timerId = setTimeout(startTimer, 1000);
    }

    showTime(state.timerLeft);
    if (state.timerLeft < 0) {
        console.log('timer ended -', state.status, state.activeTodo.pomodoro);
        alarm();
        stopTimer();
        if (state.status == 'work') {
            if (++state.activeTodo.pomodoro > state.count) state.status = 'relax'; 
            else  state.status = 'break';
            elCountNum.textContent = state.activeTodo.pomodoro;
        }
        else if (state.status == 'break') state.status = 'work';
        
        state.timerLeft = state[state.status] * 60;
        state.timerActive = true;
        btnStart.textContent = 'Пауза';
        showTime(state.timerLeft);
        changeActiveBtn(state.status);
        state.timerId = setTimeout(startTimer, 1000);
    }
}


export function stopTimer() {
    clearTimeout(state.timerId);
    state.timerActive = false;
    btnStart.textContent = 'Старт';
    state.timerLeft = state[state.status] * 60;
    showTime(state.timerLeft);
}



function showTime(seconds) {
    let t = ~~(seconds / 60);
    elMinutes.textContent = t > 9 ? t : '0' + t ;
    t = seconds % 60;
    elSeconds.textContent = t > 9 ? t : '0' + t ;
}

const audio = {
    'work': new Audio('./audio/to-be-continued.mp3'),
    'break': new Audio('./audio/wave.mp3'),
    'relax': new Audio('./audio/dudu.mp3'),
}
function alarm() {
  audio[state.status].play();
  console.log('play ', state.status);
}