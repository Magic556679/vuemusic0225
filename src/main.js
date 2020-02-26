// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import axios from 'axios';//主要Ajax套件
import VueAxios from 'vue-axios';//將他轉為Vue的套件
import Loading from 'vue-loading-overlay';//讀取loading效果套件
import 'vue-loading-overlay/dist/vue-loading.css';//讀取loading效果css套件
import 'bootstrap'; //bootstrap 必須仰賴 jQuery 、 popper才能運行

import App from './App';
import router from './router';
import './bus';
import currencyFilter from './filters/currency';
import dateFilter from './filters/date';
//vee-validate
import VeeValidate from 'vee-validate'
import zhTW from 'vee-validate/dist/locale/zh_TW'
import VueI18n from 'vue-i18n'


Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'zhTW'
})
Vue.use(VeeValidate, {
  events: 'input|blur', //這是為了讓使用者離開該欄位時觸發驗證
  i18n,
  dictionary: {
    zhTW
  }
})

Vue.filter('date', dateFilter);

Vue.config.productionTip = false
Vue.use(VueAxios, axios) // 必須要在 Vue 設定的進入點(main.js)內使用，外部插件要使用的話都需要用Vue.use
Vue.filter('currency', currencyFilter);
//Vue.use(VeeValidate);
axios.defaults.withCredentials = true;//每次發送API時，將sectionCookie 存入 Cookie內


Vue.component('Loading', Loading);//設定為全域後就不用各別載入
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});

router.beforeEach((to, from, next) => {//切換頁面觸發router.beforeEach()
  console.log('to', to, 'from', from, 'next', next);
  // ...
  if (to.meta.requiresAuth) {//判斷假如已經登入過，就可以直接貼login網址進入
    const api =`${process.env.APIPATH}/api/user/check`;//'https://vue-course-api.hexschool.io/api/magic/products';
    axios.post(api).then((response) => {
    console.log(response.data);
    if (response.data.success) {
       next();
    } else {
       next({
         path: '/login',
       });
    }
 });
  } else {
    next(); //避免被導航守衛擋下來
  }
});

//test

new Vue({
  i18n,
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
})