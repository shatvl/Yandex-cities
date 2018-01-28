import notify from '../../services/notify/notify'
import Vue from 'vue'
import Field from '../field/Field.vue'
import Ymap from '../ymap/Ymap.vue'
import Notify from '../notify/Notify.vue'
import Answers from '../answers/Answers.vue'
import Bot from '../bot/Bot.vue'
import Report from '../report/Report.vue'
import { mapGetters } from 'vuex'
import * as utils from '../../utils/utils'

const AppComponent = Vue.extend({
  components: {
    Field, Ymap, Notify, Answers, Bot, Report
  },
  data () {
    return {
      showNotify: false,
      emitter: utils.emitter,
      showReport: false
    }
  },
  watch: {
    show(val: boolean) {
       this.showNotify = val;
    }
  },
  methods: {
    initListeners() {
       this.emitter.$on('finishGame', () => {
         this.showReport = true;
       });
       this.emitter.$on('tryAgain', () => {
         this.showReport = false;
       });
    }
  },
  computed: mapGetters({
     notificationOptions: 'options',
     show: 'show'
  }),
  mounted() {
      this.initListeners();
  }
});

export default AppComponent;