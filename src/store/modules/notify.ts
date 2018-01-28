const SHOW_NOTIFY = 'SHOW_NOTIFY';
const HIDE_NOTIFY = 'HIDE_NOTIFY';

const state: State = {
    show: false,
    options: {}
};

const mutations = {
    [HIDE_NOTIFY] (state: State) {
        state.show = false;
    },

    [SHOW_NOTIFY] (state: State, options: any) {
        state.show = true;
        state.options = options;
    }
};

const getters = {
    show: (state: State) => {
        return state.show;
    },

    options: (state: State) => {
        return state.options;
    }
};

const actions = {
    showNotify: ({state, commit, rootState}: any, options: any) => {
        commit(SHOW_NOTIFY, options);
    },
    hideNotify: ({state, commit, rootState}: any) => {
        commit(HIDE_NOTIFY);
    }
};

export default {
    state,
    mutations,
    getters,
    actions
}

interface State {
    show: boolean;
    options: object;
}