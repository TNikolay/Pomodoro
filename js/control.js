import { state } from "./state.js";
import { startTimer, stopTimer } from "./timer.js";

const btnStart = document.querySelector('.control__btn_start');
const btnStop = document.querySelector('.control__btn_stop');
const navigationBtns = document.querySelectorAll('.navigation__btn');

export function initContol() {
    btnStart.addEventListener('click', () => {
        
        if (state.timerActive) {
            clearTimeout(state.timerId);
            state.timerActive = false;
            btnStart.textContent = 'Старт';
        }
        else {
            state.timerActive = true;
            btnStart.textContent = 'Пауза';
            startTimer();
        }
    });

    btnStop.addEventListener('click', stopTimer);
    
    navigationBtns.forEach(b => { 
        b.addEventListener('click', () => {
            changeActiveBtn(b.dataset.use);
            stopTimer();
        });
     });
}


export const changeActiveBtn = (dataUse) => {
    console.log('changeActiveBtn ', {dataUse});

    state.status = dataUse;
  //  state.timerLeft = state[state.status] * 60;
//    showTime(state.timerLeft    );

    navigationBtns.forEach(b => {
        b.dataset.use == dataUse ? b.classList.add('navigation__btn_active') : b.classList.remove('navigation__btn_active'); 
    });
}