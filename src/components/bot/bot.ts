import { cities } from '../../assets/cities/cities';
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
            text: ''
        }
    },
    methods: {
        initListeners() {
            this.emitter.$on('userAnswered', (answer: Answer) => {
                this.text = (!answer.text || !this.lastLetter) ? '' : `Вы ответили "${answer.text}". Компьютер ищет город на букву "${this.lastLetter}".`;
                setTimeout(() => {
                    this.findCity();                    
                }, 2300);
            });
            this.emitter.$on('findCityByComputerAgain', () => {
                this.findCity();
            });
            this.emitter.$on('computerAnswered', (answer: Answer) => {
                this.text = '';
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