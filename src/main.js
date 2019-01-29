// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import '@/assets/css/main.css';
import store from '@/store';
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
				this.$clear(obj[key]);
			}
		} else if (typeof (obj[key]) == 'string') {
			obj[key] = '';
		} else if (typeof (obj[key]) == 'number') {
			obj[key] = 0;
		}
	}
	return obj;
};
Vue.prototype.$format = function (obj) {
	var toStr = Object.prototype.toString;
	for (let key in obj) {
		if (typeof obj[key] == 'object' && obj[key] !== null) {
			if (toStr.call(obj[key]) == '[object Array]' && obj[key] == []) {
				delete obj[key];
			} else {
				this.$format(obj[key]);
			}
		} else if (typeof (obj[key] == 'string') && obj[key] == '') {
			delete obj[key];
		}
	}
	return obj;
};
axios.defaults.withCredentials = true;
axios.defaults.headers.common['Content-Type'] = 'application/json;charset=UTF-8';
axios.interceptors.response.use(res => {
	// switch (res.status) {
	// case 302:
	// 	this.$router.push({ path: '/login' });
	// 	break
	// case 304:
	// 	this.$router.push({ path: '/login' });
	// 	break
	// case 530:
	// 	//location.href='#/login?error_type=1'
	// 	break
	// }
	if (res.data.code != 200) {
		Vue.prototype.$message({
			message: res.data.message,
			type: 'warning'
		});
	}
	return res.data;
}, err => {
	//处理302
	if (typeof err.response === 'undefined') {
		location.href = '#/login';
	}
	return err;
})

Vue.config.productionTip = false;
Vue.prototype.$global = {
	pageSize: [10, 20, 30, 50],
	uploadUrl: '/vos/common/uploadImg',
	uploadUrl2: ' http://192.168.0.117:5480/vos/',
	serverSrc: 'http://192.168.0.117:5480/vos/',
};
/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	components: { App },
	template: '<App/>',
	render: h => h(App),
	data: {
		eventHub: new Vue()
	}
});
