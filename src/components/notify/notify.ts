import notify from '../../services/notify/notify';
import Vue from 'vue'

const NotifyComponent = Vue.extend({
    props: {
        message: '',
        type: '',
        title: ''
    },
    methods: {
        hide() {
            notify.ACTIONS.hide();
        }
    }
});

export default NotifyComponent;