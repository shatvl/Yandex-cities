const ADD_ANSWER = 'ADD_ANSWER';
const SET_LASTLETTER = 'SET_LASTLETTER';

interface State {
    answers: Array<Answer>;
    lastLetter: string;
};

export const ANSWER_TYPES = {
    computer: 101,
    user: 102
};

export class Answer {
    type: number;
    text: string;
    meta: string;
    createdAt: Date;
};

const state: State = {
     //full answer with code, country, date
     answers: [],
     lastLetter: ''
};

const mutations = {
    [ADD_ANSWER] (state: State, answer: Answer) {
        state.answers.unshift(answer);
    },
    [SET_LASTLETTER] (state: State, letter: string) {
        state.lastLetter = letter;
    }
};

const getters = {
    answers: (state: State) => {
        return state.answers;
    },
    lastLetter: (state: State) => {
        return state.lastLetter;
    }
};

const actions = {
    addAnswer: ({state, commit, rootState}: any, answer: Answer) => {
        commit(ADD_ANSWER, answer);
    },
    setLastLetter: ({state, commit, rootState}: any, letter: string) => {
        commit(SET_LASTLETTER, letter);
    }
};

export default {
    state,
    mutations,
    getters,
    actions
}