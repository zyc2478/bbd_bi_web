import Vue from 'vue';
import iView from 'iview';
import router from './router';
import App from './app.vue';
import 'iview/dist/styles/iview.css';
import axios from './axios';
import VueAxios from 'vue-axios';
import store from './store/store';
//import VueResource from 'vue-resource'

/*Vue.use(VueResouce)*/

Vue.use(VueAxios,axios)
//Vue.use(VueResource)

Vue.use(iView)

/* Vue.prototype.$http=axios */

new Vue({
	el: '#app',
	router: router,
	store: store,
	render: h => h(App)
})