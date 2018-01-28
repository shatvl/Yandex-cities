import Vue from 'vue'
import { mapGetters } from 'vuex'
import { Answer, ANSWER_TYPES } from '../../store/modules/answers'
import { groupBy } from 'lodash'
import * as moment from 'moment';
import * as utils from '../../utils/utils';

const ReportComponent = Vue.extend({
    data() {
        return {
            groupedAnswers: {},
            emitter: utils.emitter
        }
    },
    methods: {
        tryAgain() {
            this.emitter.$emit('tryAgain');
        }
    },
    computed: mapGetters ({
        answers: 'answers'
    }),
    filters: {
        date: function (date: Date) {
            return moment(date).format('H:m:ss');
        }
    },
    mounted() {
        this.groupedAnswers = groupBy(this.answers, 'type');
    }
});

export default ReportComponent;