// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Vuex from 'vuex'
import VueLazyload from 'vue-lazyload'
import infiniteScroll from  'vue-infinite-scroll'
import {currency} from './util/currency'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import Cookies from 'js-cookie'

import './assets/css/base.css'
import './assets/css/checkout.css'
import './assets/css/product.css'

Vue.use(infiniteScroll);
Vue.use(Vuex);
Vue.use(Antd)
Vue.use(VueLazyload, {
   loading: 'static/loading-svg/loading-bars.svg',
  try: 3 // default 1
})

Vue.filter("currency",currency);
Vue.config.productionTip = false;

const store = new Vuex.Store({
  state: {
    cartCount:0,
    // age: "",
    // birth: "",
    // phone: "",
    // remark: "",
    // sex: "",
    // headUrl: "",
    // userId: "",
    userName: "",
    nickName: "",
    // orderCount:0
  },
  mutations: {
    //更新用户信息
    updateUserInfo(state, userName) {
      state.userName = userName;
      state.nickName = Cookies.get('nickName');;
    },
    updateCartCount(state,cartCount){
      state.cartCount += cartCount;
    },
    updateNickName(state,nickName){
      state.nickName = nickName;
    },
    // updateOrderCount(state,orderCount){//多余
    //   state.orderCount += orderCount;
    // }
  }
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  mounted(){
    this.checkLogin();
    this.getCartCount();
    // this.initUserInfo()
    // this.getOrderCount();
  },
  methods:{
    checkLogin(){
      axios.get("/api/users/checkLogin").then(res=> {
        var res = res.data;
        if (res.status == "0") {
          this.$store.commit("updateUserInfo", res.result);
        }else{
          if(this.$route.path!="/goods"){
            this.$router.push("/goods");
          }
        }
      });
    },
    getCartCount(){
      axios.get("/api/users/getCartCount").then(res=>{
        var res = res.data;
        if(res.status=="0"){
          this.$store.commit("updateCartCount",res.result);
        }
      });
    },
    initUserInfo() {
      axios.get("/api/users/findUserInfo").then(response => {
        console.log(response);
        this.userInfo = response.data.result;
        this.birth = this.userInfo.birth;
        this.age = this.userInfo.age;
        this.phone = this.userInfo.phone;
        this.sex = this.userInfo.sex;
        this.remark = this.userInfo.remark;
        this.headUrl = this.userInfo.headUrl;
        this.userId = this.userInfo.userId;
        this.userName = this.userInfo.userName;
        this.nickName = this.userInfo.nickName;
        console.log(this.userInfo);
      });
    },
    // getOrderCount(){
    //   axios.get("/api/users/getOrderCount").then(res=>{
    //     var res = res.data;
    //     console.log(res)
    //     if(res.status=="0"){
    //       this.$store.commit("updateOrderCount",res.result);
    //     }
    //   });
    // }
  },
  template: '<App/>',
  //render: h => h(App),
  components: { App }
});//.$mount('#app')
