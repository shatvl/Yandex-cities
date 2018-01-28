import Vue from 'vue'
import App from './components/app/App.vue'
import store from './store'

declare global {
  interface Window { 
    ymaps: any;
  }
}

new Vue({
  el: '#app',
  store,
  render: h => h(App)
});

