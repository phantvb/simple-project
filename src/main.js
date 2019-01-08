// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import '@/assets/css/main.css';
import router from './router';
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


Vue.use(ElementUI);
Vue.prototype.$ajax = axios;
Vue.prototype.$clear = function (obj) {
	var toStr = Object.prototype.toString;
	for (let key in obj) {
		if (typeof obj[key] == 'object' && obj[key] !== null) {
			if (toStr.call(obj[key]) == '[object Array]') {
				obj[key] = [];
			} else {
				this.clear(obj[key]);
			}
		} else if (typeof (obj[key] == 'number')) {
			obj[key] = 0;
		} else if (typeof (obj[key] == 'string')) {
			obj[key] = '';
		}
	}
	return obj;
};
axios.defaults.withCredentials = true;
axios.defaults.headers.common['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.baseURL = '/vos';
//axios.defaults.baseURL = 'http://47.94.168.117:7070';
axios.interceptors.response.use(res => {
	switch (res.status) {
	case 401:
		//this.$router.push({ path: '/login'})
		//location.href='#/login'
		break
	case 403:
		//this.$router.push({ path: '/login'})
		//location.href='#/login'
		break
	case 530:
		//alert(res.data.message);
		//this.$router.push({ path: '/login'})
		//location.href='#/login?error_type=1'
		break
	}
	return res.data;
})

Vue.config.productionTip = false;
Vue.prototype.$global = {
	pageSize: [10, 20, 30, 50]
}

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	components: { App },
	template: '<App/>',
    render: h => h(App),
    data: {
        eventHub: new Vue()
    }
});
