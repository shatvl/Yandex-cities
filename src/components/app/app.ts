import notify from '../../services/notify/notify';
import Vue from 'vue'
import Field from '../field/Field.vue'
import Ymap from '../ymap/Ymap.vue'
import Notify from '../notify/Notify.vue'
import Answers from '../answers/Answers.vue'
import Bot from '../bot/Bot.vue'
import { mapGetters } from 'vuex'

const AppComponent = Vue.extend({
  components: {
    Field, Ymap, Notify, Answers, Bot
  },
  data () {
    return {
      showNotify: false
    }
  },
  watch: {
    show(val: boolean) {
       this.showNotify = val;
    }
  },
  computed: mapGetters({
     notificationOptions: 'options',
     show: 'show'
  })
});

export default AppComponent;