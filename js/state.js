const WORK_TIME = 25
const BREAK_TIME = 5
const RELAX_TIME = 30

export const state = {
    work: WORK_TIME,
    break: BREAK_TIME,
    relax: RELAX_TIME,
    status: 'work',
    count:3,
    
    timerLeft: WORK_TIME * 60,
    timerActive: false,
    timerId: 0,
}