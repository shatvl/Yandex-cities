import store from '../../store'

const TYPES = {
    error: 'error',
    success: 'success'
}
const MESSAGES = {
     city_not_found: 'Город с таким названием не найден',
     city_is_found: 'Город с таким названием найден',
     duplicated_answer: 'Город с таким названием уже был назван'
}

const getSuccessNotification = (successText: string) => {
    return {
        title: 'Отлично!',
        message: successText,
        type: 'success'
    }
};

const getErrorNotification = (errorText: string) => {
    return {
        title: 'Ошибка!',
        message: errorText,
        type: 'warning'
    }
};

const showNotifyByType = (text: string, type: string) => {
    switch (type) {
        case TYPES.success:
            return getSuccessNotification(text);
        case TYPES.error:
            return getErrorNotification(text);
    }
}

const ACTIONS = {
    show: (text: string, type: string) => {
        store.dispatch('showNotify', showNotifyByType(text, type));
        setTimeout(function() {
            store.dispatch('hideNotify');
        }, 5000);
    },
    hide: () => {
        store.dispatch('hideNotify');
    }
};


export default {
    ACTIONS,
    TYPES,
    MESSAGES
}