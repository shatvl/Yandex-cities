import { Answer } from '../../store/modules/answers';
import Vue from 'vue'
import notify from '../../services/notify/notify'
import * as utils from '../../utils/utils';
import { mapGetters } from 'vuex'

const FieldComponent = Vue.extend({
    data() {
        return {
            city: '',
            emitter: utils.emitter,
            letter: '',
            computerAnswer: '',
            waiting: false
        }
    },
    watch: {
        lastLetter(val: string) {
           this.letter = val;
        }
    },
    methods: {
        addCity() {
            this.emitter.$emit('addCity', { city: this.city });
        },
        initListeners() {
            this.emitter.$on('computerAnswered', (answ: Answer) => {
                this.computerAnswer = answ.text;
                this.waiting = false;
            });
            this.emitter.$on('userAnswered', () => {
                this.waiting = true;
                this.city = '';
            });
        },
        finish() {
            this.emitter.$emit('finishGame');
            this.city = '';
            window.scrollBy(0, 300);
        }
    },
    mounted() {
        this.initListeners();
    },
    computed: {
        ...mapGetters({
            lastLetter: 'lastLetter'
        }),
        validation(): any {
            return {
                length: this.waiting || this.city.length > 2,
                letter: this.waiting || !this.letter ? true : this.letter === this.city.charAt(0)
            } 
        },
        text(): string { 
            return this.waiting ? 'Ожидайте ответа компьютера' 
                    : (!this.computerAnswer || !this.letter) ? '' : `Компьютер ответил "${this.computerAnswer}". Вспомните город на букву "${this.letter}."`
        }
    }
});

export default FieldComponent;