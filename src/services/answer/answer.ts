import { Answer } from '../../store/modules/answers';
import store from '../../store'

const ACTIONS = {
    add: (answer: Answer) => {
        store.dispatch('addAnswer', answer);
    },
    removeAnswers: () => {
        store.dispatch('removeAnswers');
    },
    setLastLetter: (cityName: string) => {
        let i = 1,
            lastLetter = '';
        do {
            lastLetter = cityName.charAt(cityName.length - i);
            i++;  
        } while (['ь', 'ъ', 'й', 'ы'].indexOf(lastLetter) !== -1)
    
        store.dispatch('setLastLetter', lastLetter.toUpperCase());
    }
};

export default {
    ACTIONS
}