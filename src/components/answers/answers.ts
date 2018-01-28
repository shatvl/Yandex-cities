import Vue from 'vue'
import { mapGetters } from 'vuex'
import * as moment from 'moment'

const AnswersComponent = Vue.extend({
    computed: mapGetters({
        answers: 'answers'
    }),
    filters: {
        date: function (date: Date) {
            return moment(date).format('H:m:ss');
        }
    }
});

export default AnswersComponent;