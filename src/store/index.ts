import Vue from 'vue'
import Vuex from 'vuex'
import notifyModule from './modules/notify'
import answerModule from './modules/answers'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        notify: notifyModule,
        answer: answerModule
    }
})