import notify from '../../services/notify/notify'
import { cities } from '../../assets/cities/cities'
import { Answer } from '../../store/modules/answers'
import answers from '../../services/answer/answer'
import Vue from 'vue'
import { mapGetters } from 'vuex'
import * as utils from '../../utils/utils';
import SyncLoader from 'vue-spinner/src/SyncLoader.vue'
import { sample } from 'lodash'

const BotComponent = Vue.extend({
    data() {
        return {
            emitter: utils.emitter,
            text: '',
            iteration: 0
        }
    },
    methods: {
        initListeners() {
            this.emitter.$on('userAnswered', (answer: Answer) => {
                this.text = (!answer.text || !this.lastLetter) ? '' : `Вы ответили "${answer.text}". Компьютер ищет город на букву "${this.lastLetter}".`;
                this.findCity();                    
            });
            this.emitter.$on('findCityByComputerAgain', () => {
                //user win if number of iteration more than 50
                if (this.iteration > 50) {
                    notify.ACTIONS.show(notify.MESSAGES.you_win, notify.TYPES.success);
                    this.emitter.$emit('finishGame');
                    return;
                }
                this.findCity();
                this.iteration++;
            });
            this.emitter.$on('computerAnswered', (answer: Answer) => {
                this.text = '';
                this.iteration = 0;
            })
        },
        findCity() {
            if (this.lastLetter) {
                let randomCity = sample(cities[this.lastLetter]);
                this.emitter.$emit('addCity', {city: randomCity, user: false});
            }
        }
    },
    mounted() {
        this.initListeners();
    },
    components: {
        SyncLoader
    },
    computed: mapGetters({
            lastLetter: 'lastLetter'
    })
});

export default BotComponent;